import { useQuery } from "@tanstack/react-query";
import { listAttraction } from "../apis/attractionApi";
import { AttractionListItem } from "./AttractionListItem";
import { Trip } from "../utils/types/Trips";
import { useMemo, useState } from "react";

export interface IAttractionListProps extends React.HTMLProps<HTMLDivElement> {
	trip: Trip;
}
export const AttractionList = ({ trip }: IAttractionListProps) => {
	const { data } = useQuery({
		queryKey: ["attractionList"],
		queryFn: async () => (await listAttraction()).data,
	});
	const [filter, setFilter] = useState("");
	const availableAttr = useMemo(() => {
		return data?.filter(
			(e) => !trip.attractions.find((f) => f.id === e.id)
		);
	}, [data, trip]);
	return (
		<div className="flex flex-col items-center max-w-sm">
			<input className="border border-gray-300 w-full"
				placeholder="filter"
				value={filter}
				onChange={(e) => setFilter(e.target.value)}
			></input>
			<div className="flex flex-col max-h-[100vh] gap-4 p-4 overflow-auto min-w-[200px]">
				{availableAttr ? (
					availableAttr
						.filter((e) =>
							filter !== "" ? e.name.includes(filter) : true
						)
						.map((e, i) => {
							return (
								<AttractionListItem
									key={`attractionListItem-${i}`}
									tripid={trip.id}
									attraction={e}
									newOrder={trip.attractions.length + 1}
								></AttractionListItem>
							);
						})
				) : (
					<p>loading...</p>
				)}
			</div>
		</div>
	);
};
