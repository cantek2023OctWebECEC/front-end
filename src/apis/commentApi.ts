import { Comment } from "../utils/types/Comments";
import { http } from "./apiConfig";

export const createComment = (payload: Partial<Comment>) => {
	return http.post(`/Comment`, { ...payload });
};
export const listComment = (opt: { userId?: string; tripId?: string }) => {
	return http.get("/Comment", { params: opt });
};
export const updateComment = (id: string, payload: Partial<Comment>) => {
	return http.put(`/Comment/${id}`, { ...payload });
};
export const deleteComment = (id: string) => {
	return http.delete(`/Comment/${id}`);
};
