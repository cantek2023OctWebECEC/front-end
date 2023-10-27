import { useState } from "react";
import { Trip } from "../utils/types/Trips";
import dayjs from "dayjs";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	TextField,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { updateTrip } from "../apis/tripApi";
// import { DatePicker } from "@mui/x-date-pickers";

// should only be able to add own trip
export interface IUpdateTripFormProps {
	trip: Trip;
}
export const UpdateTripForm = ({ trip }: IUpdateTripFormProps) => {
	const qc = useQueryClient();
	const [open, setOpen] = useState(false);
	// for simple form use usestate
	const [name, setName] = useState(trip.name);
	const [startDate, setStartDate] = useState(
		dayjs(trip.startDate).format("YYYY-MM-DD")
	);
	const reset = () => {
		setName(trip.name);
		setStartDate(dayjs(trip.startDate).format("YYYY-MM-DD"));
	};
	const handleSubmit = async () => {
		try {
			await updateTrip(trip.id, name, dayjs(startDate).toDate());
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			qc.invalidateQueries({
				predicate: (query) => query.queryKey[0] === "showTrip",
			});
		}
	};
	return (
		<>
			<Button onClick={() => setOpen(true)}>Edit Trip</Button>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>Update Trip</DialogTitle>
				<DialogContent>
					<div className="my-2">
					<form>
						<TextField
							label="name"
							value={name}
							onChange={(e) => {
								setName(e.target.value);
							}}
						></TextField>
						<input
							// label="startDate"
							className="ml-4"
							value={startDate}
							type="date"
							onChange={(event) =>
								setStartDate(
									event.target.value ??
										dayjs().format("YYYY-MM-DD")
								)
							}
						/>
						<DialogActions>
							<div className="bg-200 rounded-lg p-2">
							<Button
								type="button"
								onClick={() => {
									handleSubmit();
									setOpen(false);
								}}
							>
								Submit
							</Button>
							</div>
							<div className="p-0 flex justify-end items-start absolute top-3 right-3 rounded rounded-3xl bg-slate-200">
							<Button 
							
								type="button"
								onClick={() => {
									reset();
									setOpen(false);
								}}
							>
								X
							</Button>
							</div>
						</DialogActions>
					</form>
					</div>
				</DialogContent>
			</Dialog>
		</>
	);
};
