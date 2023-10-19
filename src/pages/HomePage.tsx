import { TravelMap } from "../components/travelMap";
export const HomePage = () => {
	return (
		<div className="min-h-100vh">
			<TravelMap
				locationArray={[
					{
						type: "Point",
						coordinates: [-79.4140876, 43.7664638],
					},
					{
						type: "Point",
						coordinates: [-79.4594262, 43.7301766],
					},
					{
						type: "Point",
						coordinates: [-79.5705925, 43.6789222],
					},
				]}
				enrichmentArray={[<p>haha</p>, undefined, <p>hehe</p>]}
			></TravelMap>
		</div>
	);
};
