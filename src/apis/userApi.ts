import { AxiosResponse } from "axios";
import { authHttp, http } from "./apiConfig";
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

export const getUserById = (id: string): Promise<AxiosResponse<User>> => {
	return http.get(`/user/${id}`);
};

export const getUserByEmail = (email: string): Promise<AxiosResponse<User>> => {
	return http.post(`/user/get-user-email`, {
		email,
	});
};
export const getAllUser = (): Promise<AxiosResponse<User[]>> => {
	return http.get(`/user/list`);
};
export const updateUser = (
	id: string,
	user: Partial<User>
): Promise<AxiosResponse<User>> => {
	return http.put(`/user/${id}`, {
		...user,
	});
};
export const deleteUser = (id: string) => {
	return http.delete(`/user/${id}`);
};
