import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { TravelMap } from "../components/travelMap";

export const HomePage = () => {
	return (
		<>
		<div>
			<Header></Header>
		</div>
		<div className="min-h-100vh">
			<TravelMap></TravelMap>
		</div>
		<div>
			<Footer></Footer>
		</div>
		</>

	);
};
