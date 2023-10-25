import { User } from "./User";
import { Todo } from "./TodoList";
import { Attraction } from "./Attractions";
export interface Trip {
	id: string;
	organizer: User;
	name: string;
	startDate: Date;
	createdAt: Date;
	updatedAt: Date | null;
	attractions: Attraction[];
	todos: Todo[];
	comments: Comment[];
	participants: User[];
}
