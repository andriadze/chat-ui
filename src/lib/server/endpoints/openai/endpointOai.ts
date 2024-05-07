import { z } from "zod";
import { openAICompletionToTextGenerationStream } from "./openAICompletionToTextGenerationStream";
import { openAIChatToTextGenerationStream } from "./openAIChatToTextGenerationStream";
import { buildPrompt } from "$lib/buildPrompt";
import { OPENAI_API_KEY } from "$env/static/private";
import type { Endpoint } from "../endpoints";

export const endpointOAIParametersSchema = z.object({
	weight: z.number().int().positive().default(1),
	model: z.any(),
	type: z.literal("openai"),
	baseURL: z.string().url().default("https://api.openai.com/v1"),
	apiKey: z.string().default(OPENAI_API_KEY ?? "sk-"),
	completion: z
		.union([z.literal("completions"), z.literal("chat_completions")])
		.default("chat_completions"),
	defaultHeaders: z.record(z.string()).optional(),
	defaultQuery: z.record(z.string()).optional(),
});

export async function endpointOai(
	input: z.input<typeof endpointOAIParametersSchema>
): Promise<Endpoint> {
	return async ({ messages, preprompt }) => {
		let messagesOpenAI = messages.map((message) => ({
			role: message.from,
			content: message.content,
		}));

		if (messagesOpenAI?.[0]?.role !== "system") {
			messagesOpenAI = [{ role: "system", content: "" }, ...messagesOpenAI];
		}

		if (messagesOpenAI?.[0]) {
			messagesOpenAI[0].content = preprompt ?? "";
		}

		const rawResponse = await fetch("https://test.llm2.popai.agency/v1/chat/completions", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				model: "investbrainsorg/popai-adult-13b",
				messages: messagesOpenAI,
				frequency_penalty: 1.1,
				stop: ["\n", "#"],
			}),
		});
		const content = await rawResponse.json();
		console.log(content?.["choices"]?.[0]?.["message"]);

		return {
			generated_text: content?.["choices"]?.[0]?.["message"]?.content,
		};

		// return openAIChatToTextGenerationStream(
		// 	await openai.chat.completions.create({
		// 		// model: model.id ?? model.name,
		// 		// model: "/repository",
		// 		model: "investbrainsorg/popai-adult-13b",
		// 		messages: messagesOpenAI,
		// 		frequency_penalty: 1.1,
		// 		stop: ["\n", "#"],
		// 	})
		// );
	};

	// const { baseURL, apiKey, completion, model, defaultHeaders, defaultQuery } =
	// 	endpointOAIParametersSchema.parse(input);
	// let OpenAI;
	// try {
	// 	OpenAI = (await import("openai")).OpenAI;
	// } catch (e) {
	// 	throw new Error("Failed to import OpenAI", { cause: e });
	// }

	// const openai = new OpenAI({
	// 	apiKey: "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",
	// 	baseURL: "https://test.llm2.popai.agency/v1/chat/completions",
	// 	defaultHeaders,
	// 	defaultQuery,
	// });

	// if (completion === "completions") {
	// 	console.log("COMPLETIONS");
	// 	return async ({ messages, preprompt, continueMessage }) => {
	// 		const prompt = await buildPrompt({
	// 			messages,
	// 			continueMessage,
	// 			preprompt,
	// 			model,
	// 		});

	// 		return openAICompletionToTextGenerationStream(
	// 			await openai.completions.create({
	// 				// model: model.id ?? model.name,
	// 				model: "/repository",
	// 				prompt,
	// 				stream: true,
	// 				max_tokens: model.parameters?.max_new_tokens,
	// 				stop: model.parameters?.stop,
	// 				temperature: model.parameters?.temperature,
	// 				top_p: model.parameters?.top_p,
	// 				frequency_penalty: model.parameters?.repetition_penalty,
	// 			})
	// 		);
	// 	};
	// } else if (completion === "chat_completions") {
	// 	console.log("chat completions");
	// 	return async ({ messages, preprompt }) => {
	// 		let messagesOpenAI = messages.map((message) => ({
	// 			role: message.from,
	// 			content: message.content,
	// 		}));

	// 		if (messagesOpenAI?.[0]?.role !== "system") {
	// 			messagesOpenAI = [{ role: "system", content: "" }, ...messagesOpenAI];
	// 		}

	// 		if (messagesOpenAI?.[0]) {
	// 			messagesOpenAI[0].content = preprompt ?? "";
	// 		}

	// 		const rawResponse = await fetch("https://test.llm2.popai.agency/v1/chat/completions", {
	// 			method: "POST",
	// 			headers: {
	// 				Accept: "application/json",
	// 				"Content-Type": "application/json",
	// 			},
	// 			body: JSON.stringify({
	// 				model: "investbrainsorg/popai-adult-13b",
	// 				messages: messagesOpenAI,
	// 				frequency_penalty: 1.1,
	// 				stop: ["\n", "#"],
	// 			}),
	// 		});
	// 		const content = await rawResponse.json();
	// 		console.log(content?.["choices"]?.[0]?.["message"]);

	// 		return content?.["choices"]?.[0]?.["message"];

	// 		// return openAIChatToTextGenerationStream(
	// 		// 	await openai.chat.completions.create({
	// 		// 		// model: model.id ?? model.name,
	// 		// 		// model: "/repository",
	// 		// 		model: "investbrainsorg/popai-adult-13b",
	// 		// 		messages: messagesOpenAI,
	// 		// 		frequency_penalty: 1.1,
	// 		// 		stop: ["\n", "#"],
	// 		// 	})
	// 		// );
	// 	};
	// } else {
	// 	throw new Error("Invalid completion type");
	// }
}
