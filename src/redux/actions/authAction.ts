import { User } from "../../utils/types/User";
import { EreduxActionsType } from "../types";

export function Login(email: string, password: string) {
	return {
		type: EreduxActionsType.LOGIN,
		payload: {
			email,
			password,
		},
	};
}
export function LoginSuccess(email: string, userinfo: User, token: string) {
	return {
		type: EreduxActionsType.LOGIN_SUCCESS,
		payload: {
			email,
			userinfo,
			token,
		},
	};
}
export function LoginFail() {
	return { type: EreduxActionsType.LOGIN_FAIL };
}
export function Logout() {
	return { type: EreduxActionsType.LOGOUT };
}
