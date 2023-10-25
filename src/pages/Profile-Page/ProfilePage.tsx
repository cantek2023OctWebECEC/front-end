import React from "react";
import { ProfileNavBar } from "./component/NavBar";
import { Header } from "../../components/Header";
import { Route, Routes } from "react-router-dom";
import { AccountDetails } from "./component/AccountDetails";
import { Trips } from "./component/Trips";
import { Signout } from "./component/Signout";
import {AccountDetailsList} from "./component/AccountDetailsList";
import {TripsList} from "./component/TripsList";

export const Profile: React.FC = () => {
	return (
		<div>
			<Header />
			<div className="container m-10 w-full mx-auto flex justify-center items-center ">
				<ProfileNavBar />
				
				<Routes>
					<Route
						path=""
						element={<AccountDetails />}
					/>
					<Route path="Trips" element={<Trips />} />
					<Route path="Signout" element={<Signout />} />
				</Routes>
			</div>
			<Routes>
					<Route
						path=""
						element={<AccountDetailsList />}
					/>
					<Route path="Trips" element={<TripsList />} />
					
				</Routes>
		</div>
	);
};
