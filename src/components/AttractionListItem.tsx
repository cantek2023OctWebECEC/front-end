import { useQueryClient } from "@tanstack/react-query";
import { associateAttraction } from "../apis/tripApi";
import { Attraction } from "../utils/types/Attractions";
import { useSharedAttraction } from "../utils/hooks/useAttractions";

export interface IAttractionListItemProps
	extends React.HTMLProps<HTMLDivElement> {
	attraction: Attraction;
	tripid: string;
	newOrder: number;
}
export const AttractionListItem = ({
	attraction,
	tripid,
	newOrder = 1,
}: IAttractionListItemProps) => {
	const qc = useQueryClient();
	const { setAttr } = useSharedAttraction();

	return (
		<div className="flex p-4 shadow-lg ">
			<div>
				<p>{attraction.name}</p>
				<p>{attraction.address_full}</p>
				<p>{attraction.category}</p>
				<p>{attraction.email}</p>
				<p>{attraction.phone}</p>
			</div>
			<div>
				<button
					onClick={() => {
						setAttr(attraction);
					}}
				>
					show
				</button>
				<button
					onClick={async () => {
						try {
							await associateAttraction(
								tripid,
								attraction.id,
								newOrder
							);
						} catch (err) {
							alert(err);
						} finally {
							qc.invalidateQueries({
								predicate: (query) =>
									query.queryKey[0] === "showTrip",
							});
						}
					}}
				>
					+
				</button>
			</div>
		</div>
	);
};
