import { AxiosResponse } from "axios";
import { OpenRouteServiceDirectionResponse } from "../utils/types/DirectionResponse";
import { http } from "./apiConfig";
export enum ERouteProfile {
	DRIVING_CAR = "driving-car",
	DRIVING_HGV = "driving-hgv",
	CYCLING_REGULAR = "cycling-regular",
	CYCLING_ROAD = "cycling-road",
	CYCLING_MOUNTAIN = "cycling-mountain",
	CYCLING_ELECTRIC = "cycling-electric",
	FOOT_WALKING = "foot-walking",
	FOOT_HIKING = "foot-hiking",
	WHEEL_CHAIR = "wheel-chair",
}
export const getRoute = (
	profile: ERouteProfile = ERouteProfile.DRIVING_CAR,
	from: GeoJSON.Point,
	to: GeoJSON.Point
): Promise<AxiosResponse<OpenRouteServiceDirectionResponse>> => {
	return http.post(`/route/search/${profile}`, {
		from,
		to,
	});
};
