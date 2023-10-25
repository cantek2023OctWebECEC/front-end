export enum EreduxActionsType {
	LOGIN = "LOGIN",
	LOGIN_SUCCESS = "LOGIN_SUCCESS",
	LOGIN_FAIL = "LOGIN_FAIL",
	LOGOUT = "LOGOUT",
	RESET_AUTH = "RESET_AUTH",
}

export interface Action<T = any, P = any> {
	readonly type: T;
	readonly payload?: P;
}
