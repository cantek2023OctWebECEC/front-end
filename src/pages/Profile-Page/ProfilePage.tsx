import React from "react";
import { ProfileNavBar } from "./component/NavBar";
// import { Header } from "../../components/Header";
import { Route, Routes } from "react-router-dom";
import { AccountDetails } from "./component/AccountDetails";
// import { Trips } from "./component/Trips";
import { Signout } from "./component/Signout";
import { AccountDetailsList } from "./component/AccountDetailsList";
import { TripsList } from "./component/TripsList";
import { Trips } from "./component/Trips";

export const Profile: React.FC = () => {
	return (
		<div>
			{/* <Header /> */}
			<div className="container flex items-center justify-center w-full m-10 mx-auto ">
				<ProfileNavBar />

				<Routes>
					<Route path="" element={<AccountDetails />} />
					<Route path="Trips" element={<Trips />} />
					<Route path="Signout" element={<Signout />} />
				</Routes>
			</div>
			<Routes>
				<Route path="" element={<AccountDetailsList />} />
				<Route path="Trips" element={<TripsList />} />
			</Routes>
		</div>
	);
};
