// this card is used for routing trip
import { twMerge } from "tailwind-merge";
import { Trip } from "../utils/types/Trips";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export interface ITripCardProps extends React.HTMLProps<HTMLDivElement> {
	trip: Trip;
}
export const TripCard = ({ trip, className }: ITripCardProps) => {
	const navigate = useNavigate();
	console.log(trip);
	return (
		<div
			className={twMerge(
				"p-5 bg-white shadow-lg hover:opacity-5 flex flex-col cursor-pointer",
				className
			)}
			onClick={() => navigate(`/trip/${trip.id}`)}
		>
			<p>{trip.name}</p>
			<p>{dayjs(trip.startDate).toISOString()}</p>
		</div>
	);
};
