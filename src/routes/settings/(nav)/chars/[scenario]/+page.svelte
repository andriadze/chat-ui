<script lang="ts">
	import { page } from "$app/stores";
	import type { BackendModel } from "$lib/server/models";

	import { useSettingsStore } from "$lib/stores/settings";

	const settings = useSettingsStore();

	$: showPersona = false;

	$: showUserInfo = false;

	$: hasCustomPreprompt =
		$settings.customPrompts[$page.params.model] !==
		$page.data.models.find((el: BackendModel) => el.id === $page.params.model)?.preprompt;

	$: model = $page.data.models.find((el: BackendModel) => el.id === $page.params.model);

	$: isActive = $settings.activeScenario === $page.params.scenario;
</script>

<div class="flex flex-col items-start">
	<div class="relative flex w-full flex-col gap-2">
		<h3>Scenario: {$page.params.scenario}</h3>
		<div class="flex w-full flex-row content-between">
			<button
				class="{isActive
					? 'bg-gray-100'
					: 'bg-black text-white'} flex items-center rounded-full px-3 py-1"
				disabled={isActive}
				name="Activate model"
				on:click|stopPropagation={() => {
					$settings.activeScenario = $page.params.scenario;
				}}
			>
				{isActive ? "Active model" : "Activate"}
			</button>
		</div>

		<div class="flex w-full flex-row content-between">
			<button
				class="text-2xl underline decoration-gray-300 hover:decoration-gray-700"
				on:click|stopPropagation={() => (showUserInfo = !showUserInfo)}
			>
				User Information
			</button>
		</div>
		{#if showUserInfo}
			<div class="flex w-full flex-col content-between">
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Name (user_name)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.user_name}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Gender (user_gender)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.user_gender}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Orientation (user_orientation)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.user_orientation}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Country (user_country)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.user_country}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">BDay (user_birthday)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.user_birthday}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Highlights (user_highlights)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.user_highlights}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Mood (user_mood)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.user_mood}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Interests (user_interest)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.user_interest}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Gifts (gift_item)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].userInfo.gift_item}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
			</div>
		{/if}

		<div class="flex w-full flex-row content-between">
			<button
				class="text-2xl underline decoration-gray-300 hover:decoration-gray-700"
				on:click|stopPropagation={() => (showPersona = !showPersona)}
			>
				Model Information
			</button>
		</div>
		{#if showPersona}
			<div class="flex w-full flex-col content-between">
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Name (char_name)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.char_name}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>

				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">BDay (char_birthday)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.char_birthday}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>

				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Location (location)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.location}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>

				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Ethnicity (ethnicity)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.ethnicity}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Hair style (hair_style)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.hair_style}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Hair color (hair_color)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.hair_color}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Eye color (eye_color)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.eye_color}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Breast size (breast_size)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.breast_size}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Body type (body_type)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.body_type}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Butt size (butt_size)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.butt_size}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Age (age)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.age}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Eye color (butt_size)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.eye_color}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Gender (gender)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.gender}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>

				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Occupation (occupation)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.occupation}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Hobby 1 (hobby_1)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.hobby_1}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Hobby 2 (hobby_2)</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.hobby_2}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">
						Personality name (personality_name)
					</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.personality_name}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
				<div class="flex w-full flex-row content-between">
					<h3 class="mb-1.5 text-lg font-semibold text-gray-800">
						Personality desc. (personality_description)
					</h3>
				</div>
				<input
					bind:value={$settings.scenarios[$page.params.scenario].character.personality_description}
					class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				/>
			</div>
		{/if}
		<div class="relative flex w-full flex-col gap-2">
			<div class="flex w-full flex-row content-between">
				<h3 class="mb-1.5 text-lg font-semibold text-gray-800">Greeting message</h3>
			</div>
			<textarea
				rows="3"
				class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				bind:value={$settings.scenarios[$page.params.scenario].greeting}
			/>

			<div class="flex w-full flex-row content-between">
				<h3 class="mb-1.5 text-lg font-semibold text-gray-800">System Prompt</h3>
				{#if hasCustomPreprompt}
					<button
						class="ml-auto underline decoration-gray-300 hover:decoration-gray-700"
						on:click|stopPropagation={() =>
							($settings.scenarios[$page.params.scenario].customPrompts = model.preprompt)}
					>
						Reset
					</button>
				{/if}
			</div>
			<textarea
				rows="10"
				class="w-full resize-none rounded-md border-2 bg-gray-100 p-2"
				bind:value={$settings.scenarios[$page.params.scenario].customPrompts}
			/>
		</div>
	</div>
</div>
