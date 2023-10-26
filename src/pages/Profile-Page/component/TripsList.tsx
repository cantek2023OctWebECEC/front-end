// import { PaginatedItems } from "./TripsPaginatedItems";

export const TripsList = () => {
	return (
		<>
			<div className="m-10">
				<div className="flex items-center place-content-between w-100">
					<div className="text-bold text-ellipsis overflow-hidden ... text-3xl mb-10">
						Trips history
					</div>

					{/* <div className="relative w-full lg:max-w-sm">
						<select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600">
							<option>ReactJS Dropdown</option>
							<option>Laravel 9 with React</option>
							<option>React with Tailwind CSS</option>
							<option>React With Headless UI</option>
						</select>
					</div> */}
				</div>

				{/* <PaginatedItems itemsPerPage={4} /> */}
			</div>
		</>
	);
};

//name start date
//todo
//trip attractions
