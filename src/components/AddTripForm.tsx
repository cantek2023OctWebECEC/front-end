import { useState } from "react";
import dayjs from "dayjs";
import {
	Button,
	Dialog,
	DialogTitle,
	DialogActions,
	DialogContent,
	TextField,
} from "@mui/material";
import { createTrip } from "../apis/tripApi";
// import { DatePicker } from "@mui/x-date-pickers";
import { RootState } from "../redux/rootReducer";
import { useSelector, useDispatch } from "react-redux";
import { Login } from "../redux/actions/authAction";

// should only be able to add own trip

export const AddTripForm = () => {
	const dispatch = useDispatch();

	const { userinfo, token } = useSelector((state: RootState) => state.Auth);
	const [open, setOpen] = useState(false);
	// for simple form use usestate
	const [name, setName] = useState("");
	const [startDate, setStartDate] = useState(dayjs().format("YYYY-MM-DD"));
	const reset = () => {
		setName("");
		setStartDate(dayjs().format("YYYY-MM-DD"));
	};
	const handleSubmit = async () => {
		try {
			await createTrip(userinfo!.id, name, dayjs(startDate).toDate());
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			refresh();
		}
	};
	const refresh = () => {
		if (token) {
			const [email, password] = atob(token).split(":");
			dispatch(Login(email, password));
		}
	};
	return (
		<>
			<Button onClick={() => setOpen(true)}>Add Trip</Button>
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
						className="ml-4"
							type="date"
							value={startDate}
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
