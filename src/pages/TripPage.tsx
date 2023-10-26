import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showTrip } from "../apis/tripApi";
import { MapWrapper } from "../components/mapWrapper";
import { AttractionList } from "../components/AttractionList";
import { ScheduleOrganizer } from "../components/ScheduleOrganizer";
import { AttractionDetails } from "../components/AttractionDetails";
import { Button } from "@mui/material";
import { UpdateTripForm } from "../components/UpdateTripForm";
import { MemberController } from "../components/MemberController";

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
						<div className="flex flex-col gap-2 ">
							<Button
								onClick={() => {
									navigate(`/todo/${id}`);
								}}
							>
								Todo
							</Button>
							<Button
								onClick={() => {
									navigate(`/comment/${id}`);
								}}
							>
								Comments
							</Button>
							<UpdateTripForm trip={data} />
							<MemberController trip={data} />
						</div>
					</div>
				</>
			) : (
				<div>loading...</div>
			)}
		</div>
	);
};
