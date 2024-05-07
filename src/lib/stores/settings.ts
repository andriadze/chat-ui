import { browser } from "$app/environment";
import { invalidate } from "$app/navigation";
import { base } from "$app/paths";
import type { Character } from "$lib/types/Character";
import type { ModelParameters } from "$lib/types/ModelParameters";
import type { Scenario } from "$lib/types/Scenario";
import { UrlDependency } from "$lib/types/UrlDependency";
import type { UserInfo } from "$lib/types/UserInfo";
import type { ObjectId } from "mongodb";
import { getContext, setContext } from "svelte";
import { type Writable, writable, get } from "svelte/store";

type SettingsStore = {
	shareConversationsWithModelAuthors: boolean;
	hideEmojiOnSidebar: boolean;
	ethicsModalAccepted: boolean;
	ethicsModalAcceptedAt: Date | null;
	activeModel: string;
	activeScenario: string;
	customPrompts: Record<string, string>;
	modelParameters: Record<string, ModelParameters>;
	greeting: Record<string, string>;
	scenarios: Record<string, Scenario>;
	characters: Record<string, Character>;
	userInfo: UserInfo;
	recentlySaved: boolean;
	assistants: Array<ObjectId | string>;
};

type SettingsStoreWritable = Writable<SettingsStore> & {
	instantSet: (settings: Partial<SettingsStore>) => Promise<void>;
};

export function useSettingsStore() {
	return getContext<SettingsStoreWritable>("settings");
}

export function createSettingsStore(initialValue: Omit<SettingsStore, "recentlySaved">) {
	const baseStore = writable({ ...initialValue, recentlySaved: false });

	let timeoutId: NodeJS.Timeout;

	async function setSettings(settings: Partial<SettingsStore>) {
		baseStore.update((s) => ({
			...s,
			...settings,
		}));

		clearTimeout(timeoutId);

		if (browser) {
			timeoutId = setTimeout(async () => {
				await fetch(`${base}/settings`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						...get(baseStore),
						...settings,
					}),
				});

				invalidate(UrlDependency.ConversationList);
				// set savedRecently to true for 3s
				baseStore.update((s) => ({
					...s,
					recentlySaved: true,
				}));
				setTimeout(() => {
					baseStore.update((s) => ({
						...s,
						recentlySaved: false,
					}));
				}, 3000);
				invalidate(UrlDependency.ConversationList);
			}, 300);
			// debounce server calls by 300ms
		}
	}
	async function instantSet(settings: Partial<SettingsStore>) {
		baseStore.update((s) => ({
			...s,
			...settings,
		}));

		if (browser) {
			await fetch(`${base}/settings`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					...get(baseStore),
					...settings,
				}),
			});
			invalidate(UrlDependency.ConversationList);
		}
	}

	const newStore = {
		subscribe: baseStore.subscribe,
		set: setSettings,
		instantSet,
		update: (fn: (s: SettingsStore) => SettingsStore) => {
			setSettings(fn(get(baseStore)));
		},
	} satisfies SettingsStoreWritable;

	setContext("settings", newStore);

	return newStore;
}
