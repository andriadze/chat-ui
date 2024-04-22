import type { Character } from "$lib/types/Character";
import type { UserInfo } from "$lib/types/UserInfo";

export function buildSystemMessage(systemMessage: string, character: Character, user: UserInfo) {
	if (!systemMessage) {
		return "";
	}

	return systemMessage
		.replaceAll("//char_name//", character.char_name || "")
		.replaceAll("//char_birthday//", character.char_birthday || "")
		.replaceAll("//location//", character.location || "")
		.replaceAll("//ethnicity//", character.ethnicity || "")
		.replaceAll("//hair_style//", character.hair_style || "")
		.replaceAll("//hair_color//", character.hair_color || "")
		.replaceAll("//eye_color//", character.eye_color || "")
		.replaceAll("//breast_size//", character.breast_size || "")
		.replaceAll("//body_type//", character.body_type || "")
		.replaceAll("//butt_size//", character.butt_size || "")
		.replaceAll("//age//", character.age || "")
		.replaceAll("//gender//", character.gender || "")
		.replaceAll("//occupation//", character.occupation || "")
		.replaceAll("//hobby_1//", character.hobby_1 || "")
		.replaceAll("//hobby_2//", character.hobby_2 || "")
		.replaceAll("//personality_name//", character.personality_name || "")
		.replaceAll("//personality_description//", character.personality_description || "")
		.replaceAll("//user_name//", user.user_name || "")
		.replaceAll("//user_gender//", user.user_gender || "")
		.replaceAll("//user_orientation//", user.user_orientation || "")
		.replaceAll("//user_country//", user.user_country || "")
		.replaceAll("//user_interest//", user.user_interest || "")
		.replaceAll("//user_highlights//", user.user_highlights || "")
		.replaceAll("//gift_item//", user.gift_item || "");
}
