import { useState } from "react";
import { useBetween } from "use-between";
import { Attraction } from "../types/Attractions";
const useAttraction = () => {
	const [attr, setAttr] = useState<Attraction | undefined>();
	return { attr, setAttr };
};
export const useSharedAttraction = () => useBetween(useAttraction);
