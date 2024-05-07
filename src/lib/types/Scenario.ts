import type { Character } from "./Character";
import type { UserInfo } from "./UserInfo";

export interface Scenario {
	character: Character;
	userInfo: UserInfo;
	customPrompts: string;
	greeting: string;
}
