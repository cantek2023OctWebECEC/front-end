import { AxiosResponse } from "axios";
import { Todo } from "../utils/types/TodoList";
import { http } from "./apiConfig";

export const createTodo = (payload: Partial<Todo>) => {
	return http.post(`/todo`, { ...payload });
};
export const listTodo = (opt: {
	userId?: string;
	tripId?: string;
}): Promise<AxiosResponse<Todo[]>> => {
	return http.post("/todo/list", {}, { params: opt });
};
export const updateTodo = (id: string, payload: Partial<Todo>) => {
	return http.put(`/todo/${id}`, { ...payload });
};
export const deleteTodo = (id: string) => {
	return http.delete(`/todo/${id}`);
};
