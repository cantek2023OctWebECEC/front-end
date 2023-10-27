/* eslint-disable no-mixed-spaces-and-tabs */
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
			<div className="flex gap-4 max-w-11/12">
				<table>
					<tbody>
						<tr>
							<td>
								<table className="min-w-full border border-collapse divide-y divide-gray-200">
									<tbody className="bg-white divide-y divide-gray-200">
										<tr className="col-span-3">
											<td className="col-span-3 p-2">
												per segment:{" "}
											</td>
										</tr>
										{segments.map((segment, index) => (
											<tr key={index}>
												<td className="col-span-2">
													Segment {index + 1}
												</td>
												<td className="p-2">
													Distance:{" "}
													{(
														segment.distance / 1000
													).toFixed(2)}{" "}
													km
												</td>
												<td className="p-2">
													Duration:{" "}
													{`${(
														segment.duration / 60
													).toFixed(2)} mins`}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</td>
							<td>
								<table>
									<tbody>
										<tr>
											<td>
												<table className="min-w-full border border-collapse divide-y divide-gray-200">
													<tbody className="bg-white divide-y divide-gray-200">
														<tr>
															<td className="p-2">
																Total distance:{" "}
															</td>
															<td className="p-2">
																Total duration:{" "}
															</td>
														</tr>
														<tr>
															<td className="p-2">
																{total && total
																	? JSON.stringify(
																			`${(
																				total.distance /
																				1000
																			).toFixed(
																				2
																			)} km`
																	  ).replace(
																			/"/g,
																			""
																	  )
																	: "N/A"}
															</td>
															<td className="p-2">
																{total && total
																	? JSON.stringify(
																			`${(
																				total.duration /
																				60
																			).toFixed(
																				2
																			)} mins`
																	  ).replace(
																			/"/g,
																			""
																	  )
																	: "N/A"}
															</td>
														</tr>
													</tbody>
												</table>
											</td>
										</tr>
									</tbody>
								</table>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	);
};
