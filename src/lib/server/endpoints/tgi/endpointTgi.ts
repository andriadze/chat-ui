import { HF_ACCESS_TOKEN, HF_TOKEN } from "$env/static/private";
import { buildPrompt } from "$lib/buildPrompt";
import { textGeneration } from "@huggingface/inference";
import type { Endpoint } from "../endpoints";
import { z } from "zod";

export const endpointTgiParametersSchema = z.object({
	weight: z.number().int().positive().default(1),
	model: z.any(),
	type: z.literal("tgi"),
	url: z.string().url(),
	accessToken: z.string().default(HF_TOKEN ?? HF_ACCESS_TOKEN),
	authorization: z.string().optional(),
});

export function endpointTgi(input: z.input<typeof endpointTgiParametersSchema>): Endpoint {
	const { url, accessToken, model } = endpointTgiParametersSchema.parse(input);

	return async ({ messages, preprompt, continueMessage, parameters }) => {
		const prompt = await buildPrompt({
			messages,
			preprompt,
			model,
			continueMessage,
		});

		// return textGeneration(
		// 	{
		// 		parameters: { ...model.parameters, return_full_text: false },
		// 		model: url,
		// 		inputs: prompt,
		// 		accessToken,
		// 	},
		// 	{
		// 		use_cache: false,
		// 		fetch: async (endpointUrl, info) => {
		// 			if (info && authorization && !accessToken) {
		// 				// Set authorization header if it is defined and HF_TOKEN is empty
		// 				info.headers = {
		// 					...info.headers,
		// 					Authorization: authorization,
		// 				};
		// 			}
		// 			return fetch(endpointUrl, info);
		// 		},
		// 	}
		// );

		return textGeneration(
			{
				parameters: {
					...model.parameters,
					return_full_text: false,
					...(parameters ? parameters : {}),
				},
				model: url,
				inputs: prompt,
				accessToken,
			}
			// {
			// 	use_cache: false,
			// 	fetch: async (endpointUrl, info) => {
			// 		if (info && authorization && !accessToken) {
			// 			// Set authorization header if it is defined and HF_TOKEN is empty
			// 			info.headers = {
			// 				...info.headers,
			// 				Authorization: authorization,
			// 			};
			// 		}
			// 		return fetch(endpointUrl, info);
			// 	},
			// }
		);
	};
}

export default endpointTgi;
