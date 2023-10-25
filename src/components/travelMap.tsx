import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
// import { useMap } from 'react-leaflet/hooks'
import { Popup } from "react-leaflet/Popup";
import { twMerge } from "tailwind-merge";
import "leaflet/dist/leaflet.css";
import { useQuery } from "@tanstack/react-query";
import React, { useCallback, useEffect, useRef } from "react";
import { cloneDeep, compact } from "lodash";
import { getRoute } from "../apis/routeApi";
import { colorFiller } from "../utils/helpers/mapLineColorGenerator";
import { Polyline } from "react-leaflet/Polyline";
import { LatLngExpression, Map, PathOptions } from "leaflet";
import { useGeoLocation } from "../utils/hooks/useGeoLocation";
import { Marker } from "react-leaflet";
export interface ITravelMapProps extends React.HTMLProps<HTMLDivElement> {
	locationArray: GeoJSON.Point[];
	enrichmentArray?: (JSX.Element | undefined)[]; // used for rendering detail of marker
}
export const TravelMap = (props: ITravelMapProps) => {
	const { locationArray, enrichmentArray } = props;
	const { data, isLoading } = useQuery({
		queryKey: ["mapRoute", JSON.stringify(locationArray)],
		queryFn: () => generateRoute(),
	});
	// request location array, for each pair of location generate a request, await them all
	const generateRoute = useCallback(async () => {
		if (locationArray.length <= 1) {
			return [];
		}
		const routeArray = compact(
			locationArray.map((e, i, a) => {
				if (i < a.length - 1) {
					return { from: e, to: a[i + 1] };
				}
				return undefined;
			})
		);
		const routeResponseArray = routeArray.map(
			async (e) => (await getRoute(e.from, e.to)).data
		);
		return await Promise.all(routeResponseArray);
	}, [locationArray]);

	const { location } = useGeoLocation();
	const map = useRef<Map | null>(null);
	useEffect(() => {
		console.log(isLoading);
		console.log(data);
	}, [data, isLoading]);

	//set center upon getting current location
	useEffect(() => {
		console.log(location);
		if (location) {
			map.current?.setView(
				[
					location.coords.latitude,
					location.coords.longitude,
				] as LatLngExpression,
				13
			);
		}
	}, [location]);

	const renderPolyline = () => {
		console.log("rendering Polyline");
		const coordinateList = data?.map((e) => {
			return e?.features?.flatMap((f) => {
				const coords = f.geometry.coordinates.map((g) => {
					return cloneDeep(g).reverse();
				});
				return coords;
			});
		});
		if (!coordinateList) {
			return <></>;
		}
		const colorGenerator = colorFiller(["color"]);
		return coordinateList?.map((e, i) => (
			<Polyline
				key={i}
				pathOptions={colorGenerator.next().value as PathOptions}
				// pathOptions={{ color: "lime" }}
				positions={e as LatLngExpression[]}
			></Polyline>
		));
	};
	const renderMarker = () => {
		console.log("rendering Marker");
		return locationArray.map((e, i) => {
			return (
				<Marker
					key={`marker-[${i}]`}
					position={
						cloneDeep(e.coordinates).reverse() as LatLngExpression
					}
				>
					{enrichmentArray ? (
						enrichmentArray[i] ? (
							<Popup>{enrichmentArray[i]}</Popup>
						) : (
							<></>
						)
					) : (
						<></>
					)}
				</Marker>
			);
		});
	};
	return (
		<MapContainer
			className={twMerge("w-96 h-96", props.className)}
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={false}
			ref={map}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			{data ? renderMarker() : <></>}
			{data ? renderPolyline() : <></>}
		</MapContainer>
	);
};
