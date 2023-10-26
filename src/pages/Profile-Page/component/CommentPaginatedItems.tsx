import {  useState } from "react";
// import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/rootReducer";
import { IAuthReducer } from "../../../redux/reducers/authReducer";
import {Comment} from "../../../utils/types/Comments";

function Items({ currentItems }: { currentItems: Comment[] }) {
	return (
	  <>
		{currentItems && currentItems.map((data, i) => (
		  <div key={i} className="mb-2 p-3 border-dashed border-2 border-indigo-600 ...">
			<div className="text-ellipsis overflow-hidden ...">
			  Trip: {data.createdAt.toLocaleString()} 
			</div>
			<div className="pt-2 text-ellipsis overflow-hidden ...">
			  Comment: {data.content || 'No comment'}
			</div>
		  </div>
		))}
	  </>
	);
  }

export function CommentPaginatedItems({ itemsPerPage }: { itemsPerPage: number }) {
	const info:IAuthReducer = useSelector((state: RootState) => state.Auth);
	let commentList = info.userinfo?.comments ?? []as Comment[];
  const [itemOffset, setItemOffset] = useState(0);

  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = commentList?.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(commentList.length / itemsPerPage);

  const handlePageClick = (event: any) => {
    const newOffset = (event.selected * itemsPerPage) % commentList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      {currentItems ?
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
            className="flex  items-center space-x-4 justify-center p-2"
          />
        </> : <>No comment</>}
    </>
  );
}
