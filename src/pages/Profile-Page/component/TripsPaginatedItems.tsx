import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { Dummy } from "../assets/DummyData";

// let tripsList = Dummy.trips;
// interface DummyTripList {
// 	tripName: string;
// 	startDate: string;
// 	trip_attractions: string[];
// 	todo: { title: string; description: string };
// }
// function Items({ currentItems }: { currentItems: DummyTripList[] }) {
// 	return (
// 		<>
// 			{currentItems &&
// 				currentItems.map((data, i) => (
// 					<div
// 						key={i}
// 						className="mb-2 p-3 border-dashed border-2 border-indigo-600 ..."
// 					>
// 						<div className="text-ellipsis overflow-hidden ...">
// 							Trip: {data.tripName}
// 						</div>
// 						<div className="pt-2 text-ellipsis overflow-hidden ...">
// 							Start date: {data.startDate}
// 						</div>

// 						<div className="pt-2 text-ellipsis overflow-hidden ...">
// 							Trip attractions: &nbsp;
// 							{data.trip_attractions.map((attraction, j) => (
// 								<span key={j}>
// 									{attraction}
// 									{j !== data.trip_attractions.length - 1
// 										? ", "
// 										: ""}
// 								</span>
// 							))}
// 						</div>
// 					</div>
// 				))}
// 		</>
// 	);
// }

export function PaginatedItems({ itemsPerPage}:{itemsPerPage: number}) {
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

// 	// Simulate fetching items from another resources.
// 	// (This could be items from props; or items loaded in a local state
// 	// from an API endpoint with useEffect and useState)
// 	const endOffset = itemOffset + itemsPerPage;
// 	console.log(`Loading items from ${itemOffset} to ${endOffset}`);
// 	const currentItems = tripsList.slice(itemOffset, endOffset);
// 	const pageCount = Math.ceil(tripsList.length / itemsPerPage);

// 	// Invoke when user click to request another page.
// 	const handlePageClick = (event: any) => {
// 		const newOffset = (event.selected * itemsPerPage) % tripsList.length;
// 		console.log(
// 			`User requested page number ${event.selected}, which is offset ${newOffset}`
// 		);
// 		setItemOffset(newOffset);
// 	};

// 	return (
// 		<>
// 			<Items currentItems={currentItems} />
// 			<ReactPaginate
// 				breakLabel="..."
// 				nextLabel="next >"
// 				onPageChange={handlePageClick}
// 				pageRangeDisplayed={5}
// 				pageCount={pageCount}
// 				previousLabel="< previous"
// 				renderOnZeroPageCount={null}
// 				className="flex items-center justify-center p-2 space-x-4"
// 			/>
// 		</>
// 	);
// }
