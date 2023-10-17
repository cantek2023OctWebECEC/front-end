import { useEffect, useState } from "react";

export const useGeoLocation = () => {
	const [location, setLocation] = useState<undefined | GeolocationPosition>();
	const getCurrentLocation = () => {
		navigator.geolocation.getCurrentPosition(
			(position) => {
				setLocation(position);
			},
			(error) => {
				console.error(error);
			}
		);
	};
	useEffect(() => {
		getCurrentLocation();
	}, []);
	return { location, getCurrentLocation };
};
