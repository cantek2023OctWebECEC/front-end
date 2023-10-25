import { Action, EreduxActionsType } from "../types";
import { Reducer } from "redux";
import _ from "lodash";
import { User } from "../../utils/types/User";
export interface IAuthReducer {
	email: string | null;
	loggedin: boolean;
	userinfo: User | null;
	token: string | null;
}
const initialState: IAuthReducer = {
	email: null,
	loggedin: false,
	token: null,
	userinfo: null,
};

export const AuthReducer: Reducer<IAuthReducer, Action> = (
	state: IAuthReducer = initialState,
	action: Action
) => {
	switch (action?.type) {
		case EreduxActionsType.LOGIN_SUCCESS: {
			return {
				email: action.payload.email,
				userinfo: action.payload.userinfo,
				token: action.payload.token,
				loggedin: true,
			};
		}
		case EreduxActionsType.LOGIN_FAIL:
		case EreduxActionsType.LOGOUT:
		case EreduxActionsType.RESET_AUTH: {
			return _.cloneDeep(initialState);
		}
		default:
			return state;
	}
};
