import { User } from "./User";
import { Trip } from "./Trips";

export interface todosData {
	id: string;
	task: string;
	category: number;
}
export interface Todo {
	id: string;
	trip: Trip;
	assignee: User;
	title: string;
	description: string | null;
	inprogress: boolean;
	done: boolean;
	createdAt: Date;
	updatedAt: Date | null;
}
