import { useState, useEffect } from "react";
// import fakeTaskData from "../../public/FakeTododata.json"; // Import the JSON data
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { showTrip } from "../apis/tripApi";
import { sortBy } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "../redux/rootReducer";
import { createComment, listComment } from "../apis/commentApi";
//import {useForm} from 'react-hook-form'

export const AddCommentList = () => {
	const { userinfo, loggedin } = useSelector(
		(state: RootState) => state.Auth
	);
	const qc = useQueryClient();

	const navigate = useNavigate();
	const { id } = useParams();
	useEffect(() => {
		if (!id) {
			navigate("/error");
		}
		if (!loggedin) {
			navigate("/");
		}
	}, [id, loggedin]);
	const { data: trip } = useQuery({
		//@ts-ignore
		queryKey: ["showTrip", id as string],
		queryFn: async ({ queryKey }: { queryKey: string[] }) =>
			(await showTrip(queryKey[1])).data,
		enabled: !!id,
	});

	const { data: comments } = useQuery({
		//@ts-ignore
		queryKey: ["listComment", trip.id as string],
		queryFn: async ({ queryKey }: { queryKey: string[] }) => {
			const result = sortBy(
				(await listComment({ tripId: queryKey[1] })).data,
				"createdAt"
			);
			console.log(result);
			return result;
		},
		enabled: !!trip?.id,
	});

	const [newComment, setNewComment] = useState<string>("");

	const addComment = async () => {
		try {
			if (newComment.trim() !== "") {
				const newTaskItem = {
					content: newComment,
					userId: userinfo!.id, // Assign the selected member
					tripId: trip?.id,
				};
				// console.log("New Task Status:", newTaskItem.status);
				// console.log("Selected Member:", newTaskItem.assignedTo);
				// Add the new task to the JSON data
				// fakeTaskData.tasks.push(newTaskItem);

				// setTasks([...tasks, newTaskItem]);
				await createComment(newTaskItem);
				setNewComment("");
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			qc.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "showTrip" ||
					query.queryKey[0] === "listComment",
			});
		}
	};

	return (
		<div className="min-w-full p-4 mx-auto mb-4">
			<div className="flex mb-4 space-x-2">
				<input
					type="text"
					value={newComment}
					onChange={(e) => setNewComment(e.target.value)}
					className="w-full p-2 border"
					placeholder="Leave a comment"
				/>
				<button
					onClick={addComment}
					className="p-2 text-white bg-blue-500 rounded"
				>
					Add
				</button>
			</div>
			<ul className="min-w-full">
				{comments?.map((comment, index) => (
					<li
						key={index}
						className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-2 bg-white shadow-lg hover:bg-300 mt-5 px-5 py-5 w-full `}
					>
						<div className="w-full">
							<div className="mb-2">
								<span className="mr-4">{comment.content}</span>
							</div>
							<div className="w-full my-3 border-b border-gray-200"></div>
							<div className="flex flex-col items-start justify-between mb-2 md:flex-row md:items-center">
								<span className="text-sm text-gray-500">
									Published by:  {comment.user.username}
								</span>
								<div className="flex items-center justify-center w-8 h-8 text-sm text-white bg-blue-500 rounded-full bg-400">
									{comment.user.username
										.substring(0, 2)
										.toUpperCase()}
								</div>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};

export default AddCommentList;
