import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { Login } from "../redux/actions/authAction";
import { TripCard } from "../components/TripCard";
import { Button } from "@mui/material";
import { AddTripForm } from "../components/AddTripForm";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useTimeout } from 'usehooks-ts'

export const HomePage = () => {
	//used for select trip, create trip, enter trip, delete trip
	// const { data } = useQuery({
	// 	queryKey: [],
	// 	queryFn: [],
	// });
	const dispatch = useDispatch();
	const navigate = useNavigate();


	const { userinfo, token, loggedin } = useSelector(
		(state: RootState) => state.Auth
	);
	const [delay,setDelay]=useState(0);

	useTimeout(()=> {
		if (!loggedin) {
			navigate("/login");
		}
	}
	,delay);
	
	

	useEffect(() => {
		setDelay(2000);
	}, []);

	const refresh = () => {
		if (token) {
			const [email, password] = atob(token).split(":");
			dispatch(Login(email, password));
		}
	};
	
	return (
		<>
		{(!loggedin)?
		<div>
			<p>login to view trips</p>
		</div>:
			
			<div className="flex flex-col gap-2 p-2">
				<div className="flex">
					<Button
						onClick={() => {
							refresh();
						}}
					>
						refresh
					</Button>
					<AddTripForm></AddTripForm>
				</div>
				<div>
					<h2> Owned Trip</h2>
					<div className="flex gap-2 p-4 overflow-y-auto">
						{userinfo?.hostedTrip ? (
							userinfo.hostedTrip.map((e, i) => {
								return (
									<TripCard
										key={`hostedTrip-${i}`}
										trip={e}
									></TripCard>
								);
							})
						) : (
							<p>no hosted trip</p>
						)}
					</div>
				</div>
				<div>
					<h2> Participated Trip</h2>

					<div className="flex gap-2 p-4 overflow-y-auto">
						{userinfo?.hostedTrip ? (
							userinfo.jointTrip.map((e, i) => {
								return (
									<TripCard
										key={`jointTrip-${i}`}
										trip={e}
									></TripCard>
								);
							})
						) : (
							<p>no hosted trip</p>
						)}
					</div>
				</div>
			</div>
			}
		</>
	);
};
