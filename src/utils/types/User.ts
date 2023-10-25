import { Trip } from "./Trips";
import { Todo } from "./TodoList";
import { Comment } from "./Comments";
export interface User {
	id: string;
	username: string;
	email: string;
	password: string;
	todos: Todo[];
	lastLogin: Date;
	createdAt: Date;
	updatedAt: Date;
	hostedTrip: Trip[];
	jointTrip: Trip[];
	comments: Comment[];
}
