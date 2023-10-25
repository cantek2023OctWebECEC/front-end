import { TravelMap } from "../components/travelMap";
import {MemberController} from "../components/MemberController";


export const HomePage = () => {
	return (
		<>
		<div className="min-h-100vh z-0">
			<TravelMap></TravelMap>
			
		</div>
		<div >
			<MemberController/>
		</div>
		</>
	);
};
