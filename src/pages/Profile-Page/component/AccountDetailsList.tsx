import React from "react"; // Don't forget to import React
import { Dummy } from "../assets/DummyData";
import { CommentPaginatedItems } from "./CommentPaginatedItems";

export const AccountDetailsList = () => {
	// Access the 'comment' property from the imported 'Dummy' variable
	let commentList = Dummy.comment;

	return (
		<div className="m-10">
			<div className="text-bold text-ellipsis overflow-hidden ... text-3xl mb-10">
				Comment history
			</div>
			<CommentPaginatedItems itemsPerPage={4} />
		</div>
	);
};
