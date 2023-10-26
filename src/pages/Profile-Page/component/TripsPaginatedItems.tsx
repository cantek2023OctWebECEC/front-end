import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import { Dummy } from "../assets/DummyData";
import { RootState } from '../../../redux/rootReducer';
import { useSelector } from 'react-redux';
import { IAuthReducer } from '../../../redux/reducers/authReducer';
import { showTrip } from '../../../apis/tripApi';
import { useQuery } from '@tanstack/react-query';
import { User } from '../../../utils/types/User';
import { AxiosResponse } from 'axios';
import { Trip } from '../../../utils/types/Trips';

let tripsList = Dummy.trips;
interface DummyTripList {
    tripName:string;
    startDate:string;
    trip_attractions:string[];
    todo:{title:string,
    description:string}
}
function Items({ currentItems }:{currentItems: Trip[]}) {
  return (
    <>
      {currentItems &&
      currentItems.map((data, i) => (
					<div
						key={i}
						className="mb-2 p-3 border-dashed border-2 border-indigo-600 ..."
					>
						<div className="text-ellipsis overflow-hidden ...">
							Trip: {data.name}
						</div>
						<div className="pt-2 text-ellipsis overflow-hidden ...">
							Start date: {data.startDate.toLocaleString()}
						</div>

						<div className="pt-2 text-ellipsis overflow-hidden ...">
							Trip attractions: &nbsp;
							{data.attractions.map((attraction, j) => (
								<span key={j}>
									{attraction.name}
									{j !== data.attractions.length - 1
										? ", "
										: ""}
								</span>
							))}
						</div>
					</div>
				))}
    </>
  );
}

export function PaginatedItems({ itemsPerPage}:{itemsPerPage: number}) {
  const info:IAuthReducer = useSelector((state: RootState) => state.Auth);
  let TripAttractions = []
  const [itemOffset, setItemOffset] = useState(0);

  let TripId = info.userinfo.hostedTrip[0].id;//loop
  let TripLength = info.userinfo.hostedTrip.length

  
    const { data } = useQuery({
		//@ts-ignore
		queryKey: ["listTrip",info.userinfo ],
		queryFn: async ({ queryKey }: { queryKey:any[]}) =>{
      const userinfo:User = queryKey[1]
      const tripsToFetch=[...userinfo.hostedTrip,...userinfo.jointTrip]
      const fetchPromise = tripsToFetch.map(e=>showTrip(e.id))
      const fetchedPromise:AxiosResponse<Trip>[] = await Promise.all(fetchPromise)
      return fetchedPromise.map(e=>e.data)
    },
      enabled: !!TripId,
	});
  
  if (!data) {
    return <div>Loading...</div>; // You can display a loading message or handle this case appropriately.
  }


  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = data.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(data.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event:any) => {
    const newOffset = (event.selected * itemsPerPage) % data.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        className='flex  items-center space-x-4 justify-center p-2'
      />
    </>
  );
}