import { useQueryClient } from "@tanstack/react-query";
import { associateAttraction } from "../apis/tripApi";
import { Attraction } from "../utils/types/Attractions";
import { useSharedAttraction } from "../utils/hooks/useAttractions";

import React,{useState} from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { AttractionDetails } from "../components/AttractionDetails";


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
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () =>{
		setOpen(false);
		setAttr(undefined);
	}
	

	return (
		<div className="flex justify-between shadow-lg flex-col md:flex-row items-start md:items-end px-2 py-2">
			<div className="mr-2">
				<table>
					<tbody className="text-sm">
						<tr>
							<td className="pr-2">Location: </td>
							<td>{attraction.name}</td>
						</tr>
						<tr>
							<td className="pr-2">Address: </td>
							<td>{attraction.address_full}</td>
						</tr>
						<tr>
							<td className="pr-2">Category: </td>
							<td>{attraction.category}</td>
						</tr>
						<tr>
							<td className="pr-2">Email: </td>
							<td>{attraction.email}</td>
						</tr>
						<tr>
							<td className="pr-2">Phone: </td>
							<td>{attraction.phone}</td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<div className="text-right flex justify-between flex-col">
			<button className="mt-2 bg-400 rounded-3xl p-2 mb-4" 
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

				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>Details</DialogTitle>
					<DialogActions>
					<AttractionDetails handleClose={handleClose}></AttractionDetails>
				</DialogActions>
				</Dialog>

				<button className="bg-200 rounded-lg p-2" 
					onClick={() => {
						handleOpen();
						setAttr(attraction);
					}}
				>
					show
				</button>
				
			</div>
		</div>
	);
};
