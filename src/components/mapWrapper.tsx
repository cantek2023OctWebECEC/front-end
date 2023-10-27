// this component is used to query data for things this is just a dummy component

// import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Trip } from "../utils/types/Trips";
import { TravelMap } from "./travelMap";
import { OpenRouteServiceDirectionResponse } from "../utils/types/DirectionResponse";

export interface IMapWrapperProps {
	trip: Trip;
}
export const MapWrapper = ({ trip }: IMapWrapperProps) => {
	//show trip
	//show attraction
	//show comment
	const [orsResult, setOrsResult] = useState<
		OpenRouteServiceDirectionResponse[]
	>([]);
	const { segments, total } = useMemo(() => {
		const segments = orsResult.flatMap((e) =>
			e.features.map((f) => f.properties.summary)
		);
		const total = segments.reduce(
			(accum, curr) => {
				accum.distance += curr.distance;
				accum.duration += curr.duration;
				return accum;
			},
			{ distance: 0, duration: 0 }
		);

		return { segments, total };
	}, [orsResult]);

	return (
		<div className="min-h-100vh min-w-11/12">
			<TravelMap
				locationArray={trip.attractions.map((e) => e.location)}
				enrichmentArray={trip.attractions.map((e) => (
					<p>{JSON.stringify(e)}</p>
				))}
				setResultFn={(res) => setOrsResult(res)}
			></TravelMap>
			<div className="flex gap-4">
				<div>per segment: {JSON.stringify(segments)}</div>
				<div> total:{JSON.stringify(total)}</div>
			</div>
		</div>
	);
};
