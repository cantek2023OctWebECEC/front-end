import { MapContainer } from "react-leaflet/MapContainer";
import { TileLayer } from "react-leaflet/TileLayer";
// import { useMap } from 'react-leaflet/hooks'
import { Marker } from "react-leaflet/Marker";
import { Popup } from "react-leaflet/Popup";
import { twMerge } from "tailwind-merge";
import "leaflet/dist/leaflet.css";
import React from "react";

export interface ITravelMapProps extends React.HTMLProps<HTMLDivElement> {}

export const TravelMap = (props: ITravelMapProps) => {
	return (
		<MapContainer
			className={twMerge("w-96 h-96", props.className)}
			center={[51.505, -0.09]}
			zoom={13}
			scrollWheelZoom={false}
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={[51.505, -0.09]}>
				<Popup>
					A pretty CSS3 popup. <br /> Easily customizable.
				</Popup>
			</Marker>
		</MapContainer>
	);
};
