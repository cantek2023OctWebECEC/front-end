import { AxiosResponse } from "axios";
import { http } from "./apiConfig";
import { Attraction } from "../utils/types/Attractions";

export const listAttraction = (): Promise<AxiosResponse<Attraction[]>> => {
	return http.get(`/attraction`);
};
