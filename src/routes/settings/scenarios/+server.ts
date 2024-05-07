import { collections } from "$lib/server/database";
import { z } from "zod";
import { authCondition } from "$lib/server/auth";
import { DEFAULT_SETTINGS } from "$lib/types/Settings";

export async function POST({ request, locals }) {
	const body = await request.json();
	console.log("Request received", body);

	// await collections.settings.updateOne(
	// 	authCondition(locals),
	// 	{
	// 		$set: {
	// 			...settings,
	// 			...(ethicsModalAccepted && { ethicsModalAcceptedAt: new Date() }),
	// 			updatedAt: new Date(),
	// 		},
	// 		$setOnInsert: {
	// 			createdAt: new Date(),
	// 		},
	// 	},
	// 	{
	// 		upsert: true,
	// 	}
	// );
	// return ok response
	return new Response();
}
