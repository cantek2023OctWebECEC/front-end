import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showTrip } from "../apis/tripApi";
import { MapWrapper } from "../components/mapWrapper";
import { AttractionList } from "../components/AttractionList";
import { ScheduleOrganizer } from "../components/ScheduleOrganizer";
import { AttractionDetails } from "../components/AttractionDetails";

export const TripPage = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	useEffect(() => {
		if (!id) {
			navigate("/error");
		}
	}, [id]);
	const { data } = useQuery({
		//@ts-ignore
		queryKey: ["showTrip", id as string],
		queryFn: async ({ queryKey }: { queryKey: string[] }) =>
			(await showTrip(queryKey[1])).data,
		enabled: !!id,
	});
	return (
		<div className="flex gap-2 p-2 min-h-100vh">
			{data ? (
				<>
					<AttractionList trip={data}></AttractionList>
					<div className="flex flex-col gap-2">
						<MapWrapper trip={data}></MapWrapper>
						<ScheduleOrganizer trip={data}></ScheduleOrganizer>
					</div>
					<div className="flex flex-col gap-2 min-w-[200px]">
						<AttractionDetails></AttractionDetails>
						<div>
							<button
								onClick={() => {
									navigate(`/todo/${id}`);
								}}
							>
								Todo
							</button>
							<button
								onClick={() => {
									navigate(`/comment/${id}`);
								}}
							>
								Comments
							</button>
						</div>
					</div>
				</>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
};
