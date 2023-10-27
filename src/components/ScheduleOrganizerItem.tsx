import { useQueryClient } from "@tanstack/react-query";
import { dissociateAttraction } from "../apis/tripApi";
import { Attraction } from "../utils/types/Attractions";
import { Draggable } from "react-beautiful-dnd";
import { useSharedAttraction } from "../utils/hooks/useAttractions";

// this is a draggable item for dnd to control the route
export interface IScheduleOrganizerItemProps {
	tripid: string;
	item: Attraction;
	index: number;
}
export const ScheduleOrganizerItem = ({
	item,
	index,
	tripid,
}: IScheduleOrganizerItemProps) => {
	const qc = useQueryClient();
	const { setAttr } = useSharedAttraction();

	return (
		<Draggable key={item.id} draggableId={item.id} index={index}>
			{(provided, snapshot) => {
				return (
					<div
						key={item.id}
						ref={provided.innerRef}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						style={{
							...provided.draggableProps.style,
						}}
						className={`pointer-none p-4 min-h-[50px] text-white rounded mt-2 shadow-lg ${
							snapshot.isDragging
								? "bg-slate-700"
								: "bg-slate-800"
						}`}
					>
						<div className="flex flex-col gap-4">
							<div className="flex items-center justify-between">
								<h3 className="text-lg font-bold max-w-[40px]">
									{item.name}
								</h3>
								<button className="bg-400 text-gray-500 rounded-lg p-2"
									onClick={() => {
										setAttr(item);
									}}
								>
									show
								</button>
								<button className="bg-400 text-gray-500 rounded-lg p-2"
									onClick={async () => {
										try {
											await dissociateAttraction(
												tripid,
												item.id
											);
										} catch (err) {
											alert(err);
										} finally {
											qc.invalidateQueries({
												predicate: (query) =>
													query.queryKey[0] ===
													"showTrip",
											});
										}
									}}
								>
									delete
								</button>
							</div>
							<div className="flex items-center justify-between">
								<p>{item.name}</p>
								<p>{item.address_full}</p>
								<p>{item.category}</p>
								<p>{item.email}</p>
								<p>{item.phone}</p>
							</div>
						</div>
					</div>
				);
			}}
		</Draggable>
	);
};
