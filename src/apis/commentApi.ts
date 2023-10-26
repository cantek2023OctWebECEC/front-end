import { AxiosResponse } from "axios";
import { Comment } from "../utils/types/Comments";
import { http } from "./apiConfig";

export const createComment = (payload: Partial<Comment>) => {
	return http.post(`/comment`, { ...payload });
};
export const listComment = (opt: {
	userId?: string;
	tripId?: string;
}): Promise<AxiosResponse<Comment[]>> => {
	return http.post("/comment/list", {}, { params: opt });
};
export const updateComment = (id: string, payload: Partial<Comment>) => {
	return http.put(`/comment/${id}`, { ...payload });
};
export const deleteComment = (id: string) => {
	return http.delete(`/comment/${id}`);
};
