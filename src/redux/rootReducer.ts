import { AuthReducer } from "./reducers/authReducer";
import { combineReducers } from "redux";
export const rootReducer = combineReducers({
	Auth: AuthReducer,
});
export type RootState = ReturnType<typeof rootReducer>;
