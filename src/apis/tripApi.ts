import { AxiosResponse } from "axios";
import { http } from "./apiConfig";
import { Trip } from "../utils/types/Trips";

export const createTrip = (
	organizerId: string,
	name: string,
	startDate: Date
) => {
	return http.post(`/trip`, {
		organizerId,
		name,
		startDate,
	});
};
export const listTrip = () => {
	return http.get(`/trip`);
};

export const showTrip = (tripid: string): Promise<AxiosResponse<Trip>> => {
	return http.get(`/trip/${tripid}`);
};
export const updateTrip = (tripid: string, name: string, startDate: Date) => {
	return http.put(`/trip/${tripid}`, {
		name,
		startDate,
	});
};
export const deleteTrip = (tripid: string) => {
	return http.delete(`/trip/${tripid}`);
};
export const associateParticipant = (tripId: string, userId: string) => {
	return http.post(`/trip/${tripId}/parti/${userId}`);
};
export const dissociateParticipant = (tripId: string, userId: string) => {
	return http.delete(`/trip/${tripId}/parti/${userId}`);
};
export const associateAttraction = (
	tripId: string,
	attractionId: string,
	order: number
) => {
	return http.post(`/trip/${tripId}/attr/${attractionId}`, {
		order,
	});
};
export const dissociateAttraction = (tripId: string, attractionId: string) => {
	return http.delete(`/trip/${tripId}/attr/${attractionId}`);
};
export const updateAttraction = (
	tripId: string,
	attractionId: string,
	order: number
) => {
	return http.put(`/trip/${tripId}/attr/${attractionId}`, {
		order,
	});
};
