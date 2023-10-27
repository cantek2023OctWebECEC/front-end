// import { PaginatedItems } from "./TripsPaginatedItems";

import { PaginatedItems } from "./TripsPaginatedItems";

export const TripsList = () => {
	return (
		<>
			<div className="m-10">
				<div className="flex items-center place-content-between w-100">
					<div className="text-bold text-ellipsis overflow-hidden ... text-3xl mb-10">
						Trips history
					</div>

				</div>

				<PaginatedItems itemsPerPage={4} />
			</div>
		</>
	);
};

//name start date
//todo
//trip attractions
