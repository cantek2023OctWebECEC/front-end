import { call, put, takeEvery } from "redux-saga/effects";
import { EreduxActionsType, Action } from "../types";
import { login } from "../../apis/authApi";
import { getCurrentUser } from "../../apis/userApi";
import { LoginFail, LoginSuccess } from "../actions/authAction";
import { User } from "../../utils/types/User";
import { AxiosResponse } from "axios";
export function* loginWorker(action: Action) {
	try {
		const result: AxiosResponse<boolean> = yield call(
			login,
			action.payload.email,
			action.payload.password
		);
		if (!result.data) {
			throw new Error("login fail");
		}
		const info: AxiosResponse<User> = yield call(
			getCurrentUser,
			action.payload.email,
			action.payload.password
		);
		yield put(
			LoginSuccess(
				action.payload.email,
				info.data,
				btoa(`${action.payload.email}:${action.payload.password}`)
			)
		);
	} catch (err) {
		yield put(LoginFail());
	}
}
export function* authSaga() {
	yield takeEvery(EreduxActionsType.LOGIN, loginWorker);
}
