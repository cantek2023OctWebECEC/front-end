// this component is a dnd container component that will control the order of trip by drag and drop
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import { Trip } from "../utils/types/Trips";
import { sortBy } from "lodash";
import { ScheduleOrganizerItem } from "./ScheduleOrganizerItem";
import { updateAttraction } from "../apis/tripApi";
import { useQueryClient } from "@tanstack/react-query";

export interface IScheduleOrganizerProps {
	trip: Trip;
}
export const ScheduleOrganizer = ({ trip }: IScheduleOrganizerProps) => {
	const qc = useQueryClient();
	const onDragEnd = async (result: DropResult) => {
		try {
			console.log(result);
			const attractionid = result.draggableId;
			const order = result.destination?.index ?? 0 + 1;
			await updateAttraction(trip.id, attractionid, order);
		} catch (err) {
			alert(err);
		} finally {
			qc.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "showTrip",
			});
		}
	};
	return (
		<div className="flex">
			<DragDropContext onDragEnd={(result) => onDragEnd(result)}>
				<Droppable droppableId="scheduleOrganizer">
					{(provided, snapshot) => {
						return (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								className={`w-full h-[500px] p-2 rounded shadow-xl overflow-y-auto ${
									snapshot.isDraggingOver
										? "bg-slate-600"
										: "bg-gray-600"
								}`}
							>
								{sortBy(trip.attractions, "order").map(
									(item, index) => {
										return (
											<ScheduleOrganizerItem
												key={item.id}
												item={item}
												tripid={trip.id}
												index={index}
											></ScheduleOrganizerItem>
										);
									}
								)}
								{provided.placeholder}
							</div>
						);
					}}
				</Droppable>
			</DragDropContext>
		</div>
	);
};
