import { defaultModel } from "$lib/server/models";
import type { Assistant } from "./Assistant";
import type { Character } from "./Character";
import type { Timestamps } from "./Timestamps";
import type { User } from "./User";
import type { UserInfo } from "./UserInfo";

export interface Settings extends Timestamps {
	userId?: User["_id"];
	sessionId?: string;

	/**
	 * Note: Only conversations with this settings explicitly set to true should be shared.
	 *
	 * This setting is explicitly set to true when users accept the ethics modal.
	 * */
	shareConversationsWithModelAuthors: boolean;
	ethicsModalAcceptedAt: Date | null;
	activeModel: string;
	hideEmojiOnSidebar?: boolean;

	// model name and system prompts
	customPrompts?: Record<string, string>;
	greeting?: Record<string, string>;
	characters?: Record<string, Partial<Character>>;
	userInfo?: UserInfo;
	assistants?: Assistant["_id"][];
}

// TODO: move this to a constant file along with other constants
export const DEFAULT_SETTINGS = {
	shareConversationsWithModelAuthors: true,
	activeModel: defaultModel.id,
	hideEmojiOnSidebar: false,
	customPrompts: {},
	greeting: {},
	userInfo: {
		user_name: "Guest",
		user_gender: "male",
		user_orientation: "straight",
		user_country: "nearby country",
		user_birthday: "unknown",
		user_mood: "Horny",
		user_interest: "sex",
		user_highlights: "unknown",
		gift_item: "Chocolate Box",
	},
	characters: {
		default: {
			char_name: "Charlotte Young",
			char_birthday: "14th February",
			location: "New York, NY",
			ethnicity: "caucasian",
			hair_style: "curly hair",
			hair_color: "brunette",
			eye_color: "brown",
			breast_size: "medium",
			body_type: "slim",
			butt_size: "medium",
			age: "23",
			gender: "female",
			occupation: "singer",
			hobby_1: "hiking",
			hobby_2: "parties",
			personality_name: "Regular",
			personality_description: "",
		},
	},
	assistants: [],
};
