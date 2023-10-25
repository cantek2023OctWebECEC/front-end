import { User } from "./User";
import { Trip } from "./Trips";

export interface Comment {
	id: string;

	content: string;

	createdAt: Date;

	updatedAt: Date | null;

	user: User;

	trip: Trip;
}
