import { AxiosResponse } from "axios";
import { authHttp } from "./apiConfig";

export const signup = (username: string, email: string, password: string) => {
	return authHttp.post("/auth/signup", {
		username,
		email,
		password,
	});
};
export const login = (
	email: string,
	password: string
): Promise<AxiosResponse<boolean>> => {
	return authHttp.post(
		"/auth/login",
		{},
		{
			headers: {
				Authorization: `Basic ${btoa(`${email}:${password}`)}`,
			},
		}
	);
};
