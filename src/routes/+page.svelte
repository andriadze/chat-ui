<script lang="ts">
	import { goto } from "$app/navigation";
	import { base } from "$app/paths";
	import { PUBLIC_APP_NAME } from "$env/static/public";
	import ChatWindow from "$lib/components/chat/ChatWindow.svelte";
	import { ERROR_MESSAGES, error } from "$lib/stores/errors";
	import { pendingMessage } from "$lib/stores/pendingMessage";
	import { useSettingsStore } from "$lib/stores/settings.js";
	import { buildSystemMessage } from "$lib/utils/buildSystemMessage.js";
	import { findCurrentModel } from "$lib/utils/models";

	export let data;
	let loading = false;
	let files: File[] = [];

	const settings = useSettingsStore();

	async function createConversation(message: string) {
		try {
			loading = true;

			// check if $settings.activeModel is a valid model
			// else check if it's an assistant, and use that model
			// else use the first model

			const validModels = data.models.map((model) => model.id);

			let model;
			if (validModels.includes($settings.activeModel)) {
				model = $settings.activeModel;
			} else {
				if (validModels.includes(data.assistant?.modelId)) {
					model = data.assistant?.modelId;
				} else {
					model = data.models[0].id;
				}
			}

			const res = await fetch(`${base}/conversation`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					model,
					parameters: $settings.modelParameters[$settings.activeModel],
					greeting: buildSystemMessage(
						$settings.scenarios[$settings.activeScenario].greeting,
						$settings.scenarios[$settings.activeScenario].character,
						$settings.scenarios[$settings.activeScenario].userInfo
					),
					preprompt: buildSystemMessage(
						$settings.scenarios[$settings.activeScenario].customPrompts,
						$settings.scenarios[$settings.activeScenario].character,
						$settings.scenarios[$settings.activeScenario].userInfo
					),
					assistantId: data.assistant?._id,
				}),
			});

			if (!res.ok) {
				const errorMessage = (await res.json()).message || ERROR_MESSAGES.default;
				error.set(errorMessage);
				console.error("Error while creating conversation: ", errorMessage);
				return;
			}

			const { conversationId } = await res.json();

			// Ugly hack to use a store as temp storage, feel free to improve ^^
			pendingMessage.set({
				content: message,
				files,
			});

			// invalidateAll to update list of conversations
			await goto(`${base}/conversation/${conversationId}`, { invalidateAll: true });
		} catch (err) {
			error.set((err as Error).message || ERROR_MESSAGES.default);
			console.error(err);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>{PUBLIC_APP_NAME}</title>
</svelte:head>

<ChatWindow
	on:message={(ev) => createConversation(ev.detail)}
	{loading}
	assistant={data.assistant}
	currentModel={findCurrentModel([...data.models, ...data.oldModels], $settings.activeModel)}
	models={data.models}
	bind:files
/>
