import { AxiosResponse } from "axios";
import { authHttp } from "./apiConfig";
import { User } from "../utils/types/User";

export const getCurrentUser = (
	email: string,
	password: string
): Promise<AxiosResponse<User>> => {
	return authHttp.get("/user", {
		headers: {
			Authorization: `Basic ${btoa(`${email}:${password}`)}`,
		},
	});
};
