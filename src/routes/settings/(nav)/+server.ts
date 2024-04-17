import { collections } from "$lib/server/database";
import { z } from "zod";
import { authCondition } from "$lib/server/auth";
import { DEFAULT_SETTINGS } from "$lib/types/Settings";

export async function POST({ request, locals }) {
	const body = await request.json();

	const { ethicsModalAccepted, ...settings } = z
		.object({
			shareConversationsWithModelAuthors: z
				.boolean()
				.default(DEFAULT_SETTINGS.shareConversationsWithModelAuthors),
			hideEmojiOnSidebar: z.boolean().default(DEFAULT_SETTINGS.hideEmojiOnSidebar),
			ethicsModalAccepted: z.boolean().optional(),
			activeModel: z.string().default(DEFAULT_SETTINGS.activeModel),
			customPrompts: z.record(z.string()).default({}),
			greeting: z.record(z.string()).default({}),
			userInfo: z.object({
				user_name: z.string().optional(),
				user_gender: z.string().optional(),
				user_orientation: z.string().optional(),
				user_country: z.string().optional(),
				user_birthday: z.string().optional(),
				user_mood: z.string().optional(),
				user_interest: z.string().optional(),
				user_highlights: z.string().optional(),
				gift_item: z.string().optional(),
			}),
			characters: z
				.record(
					z.string(),
					z.object({
						char_name: z.string().optional(),
						char_birthday: z.string().optional(),
						location: z.string().optional(),
						ethnicity: z.string().optional(),
						hair_style: z.string().optional(),
						hair_color: z.string().optional(),
						eye_color: z.string().optional(),
						breast_size: z.string().optional(),
						body_type: z.string().optional(),
						butt_size: z.string().optional(),
						age: z.string().optional(),
						gender: z.string().optional(),
						occupation: z.string().optional(),
						hobby_1: z.string().optional(),
						hobby_2: z.string().optional(),
						personality_name: z.string().optional(),
						personality_description: z.string().optional(),
					})
				)
				.default(DEFAULT_SETTINGS.characters),
		})
		.parse(body);

	await collections.settings.updateOne(
		authCondition(locals),
		{
			$set: {
				...settings,
				...(ethicsModalAccepted && { ethicsModalAcceptedAt: new Date() }),
				updatedAt: new Date(),
			},
			$setOnInsert: {
				createdAt: new Date(),
			},
		},
		{
			upsert: true,
		}
	);
	// return ok response
	return new Response();
}
