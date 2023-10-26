// import { useQuery } from "@tanstack/react-query";
// import { TravelMap } from "../components/travelMap";
import {MemberController} from "../components/MemberController";

export const HomePage = () => {
	//used for select trip, create trip, enter trip, delete trip
	// const { data } = useQuery({
	// 	queryKey: [],
	// 	queryFn: [],
	// });
	return <>
		<div >
			<MemberController/>
		</div>
	</>;
};
