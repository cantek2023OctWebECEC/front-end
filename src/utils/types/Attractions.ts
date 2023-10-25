import { Trip } from "./Trips";

export interface Attraction {
	id: string;
	name: string;
	postal_code: string;
	description: string | null;
	location: GeoJSON.Point;
	address_full: string | null;
	category: string | null;
	email: string | null;
	phone: string | null;
	website: string | null;
	trips: Trip[];
	order?: number;
}
