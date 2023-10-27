import React, { useState, useRef, useMemo } from "react";
// import memberData from "../../public/FakeUserdata.json"; // Adjust the path to your JSON file
import { Trip } from "../utils/types/Trips";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllUser, getUserByEmail } from "../apis/userApi";
import { associateParticipant, dissociateParticipant } from "../apis/tripApi";
import { Dialog } from "@mui/material";
export interface IMemberControllerProps {
	trip: Trip;
}
export const MemberController = ({ trip }: IMemberControllerProps) => {
	const { data: userList } = useQuery({
		queryKey: ["userlist"],
		queryFn: async () => {
			return (await getAllUser()).data;
		},
	});
	const qc = useQueryClient();

	const [searchInput, setSearchInput] = useState("");
	const [newMemberEmail, setNewMemberEmail] = useState("");
	const [isOpen, setIsOpen] = useState(false);
	const addedMembers = useMemo(() => {
		return trip.participants;
	}, [trip]);

	// const [suggestedEmails, setSuggestedEmails] = useState<string[]>([]);
	const suggestedEmails = useMemo(() => {
		const addableList = (userList ?? [])
			?.filter((e) => e.id !== trip.organizer.id)
			.filter((e) => !trip.participants.find((f) => f.id === e.id))
			?.map((e) => e.email);
		if (searchInput === "") {
			return addableList ?? [];
		} else {
			return (addableList ?? []).filter((e) => e.includes(searchInput));
		}
	}, [trip, userList, searchInput]);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const listRef = useRef<HTMLUListElement | null>(null);

	// useEffect(() => {
	// 	const handleOutsideClick = (e: MouseEvent) => {
	// 		if (
	// 			inputRef.current &&
	// 			listRef.current &&
	// 			!inputRef.current.contains(e.target as Node) &&
	// 			!listRef.current.contains(e.target as Node)
	// 		) {
	// 		}
	// 	};

	// 	window.addEventListener("click", handleOutsideClick);

	// 	return () => {
	// 		window.removeEventListener("click", handleOutsideClick);
	// 	};
	// }, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		if (value.trim() !== "") {
			setSearchInput(value);
		}
		setNewMemberEmail(value);
	};

	const handleSuggestedEmailClick = async (email: string) => {
		try {
			if (email.trim() !== "") {
				const user = (await getUserByEmail(email)).data;
				if (user?.id) {
					await associateParticipant(trip.id, user.id);
				}
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			qc.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "showTrip" ||
					query.queryKey[0] === "userlist",
			});
		}
	};

	const removeMember = async (email: string) => {
		try {
			// if (email.trim() !== "") {
			const user = (await getUserByEmail(email)).data;
			if (user?.id) {
				await dissociateParticipant(trip.id, user.id);
			}
			// }
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			qc.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "showTrip" ||
					query.queryKey[0] === "userlist",
			});
		}
	};

	const openDialog = () => {
		setIsOpen(true);
	};

	const closeDialog = () => {
		setIsOpen(false);
	};

	return (
		<div>
			<button
				onClick={openDialog}
				className="px-4 py-2 text-white bg-blue-500 rounded-lg"
			>
				Edit Members
			</button>

			{/* {isOpen && (
				// <div className="fixed inset-0 z-50 flex items-center justify-center w-full">
				// 	<div className="rounded-lg shadow-md relative w-3/4 h-3/4 bg-[color:white] overflow-y-auto scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-300">
				// 		<div className="mx-auto max-w-lx"> */}
			<Dialog open={isOpen} onClose={() => setIsOpen(false)}>
				<nav className="flex items-center justify-between mx-1 border-b border-gray-300 w-96 text-500">
					<div>Add Members</div>
					<div>
						<button
							onClick={closeDialog}
							className="px-4 py-2 mt-2 text-right text-white bg-red-500 rounded rounded-3xl bg-slate-200"
						>
							X
						</button>
					</div>
				</nav>
				<nav className="p-2  my-2 w-full ">
					<div>
						<input
							type="text"
							placeholder="Search by email or Add a new member by email"
							value={newMemberEmail} // Use newMemberEmail as the value
							onChange={handleInputChange} // Use handleInputChange to update both fields
							className=" px-3 py-2 border rounded-lg w-full"
							ref={(el) => (inputRef.current = el)}
						/>
					</div>
					{/* <div>
									<button
										onClick={addMember}
										className="p-2 text-red-500 rounded bg-200 "
									>
										Add
									</button>
								</div> */}
				</nav>
				<div className="z-50 mx-1 my-1">
					{suggestedEmails.length > 0 && ( // Show the list of suggestions
						<ul
							className="left-0 right-0 p-2 border border-gray-300 rounded-lg top-10"
							ref={(el) => (listRef.current = el)}
						>
							{suggestedEmails.map((email) => (
								<li
									key={email}
									onClick={() =>
										handleSuggestedEmailClick(email)
									}
									className="cursor-pointer hover:bg-gray-100"
								>
									{email}
								</li>
							))}
						</ul>
					)}
					<div className="mx-1 my-1 w-55rem">
						<div className="my-1.5">Member</div>
						<div>
							{addedMembers.length > 0 && (
								<div className="mt-4 text-500">
									<ul>
										{addedMembers.map((member, index) => (
											<li
												key={index}
												className="flex items-center justify-between"
											>
												<div>
													<table>
														<tr className="p-2">
															<td>
																<div className="flex items-center justify-center w-8 h-8 ml-3 text-sm text-white bg-blue-500 rounded-full bg-400">
																	{member.username
																		.substring(
																			0,
																			2
																		)
																		.toUpperCase()}
																</div>
															</td>
															<td>
																<table>
																	<tr>
																		<td className="pl-3.5">
																			{
																				member.username
																			}
																		</td>
																	</tr>
																	<tr>
																		<td className="pl-3.5">
																			{
																				member.email
																			}
																		</td>
																	</tr>
																</table>
															</td>
														</tr>
													</table>
												</div>
												<div>
													<button
														className="p-2 text-gray-500 rounded bg-200 "
														onClick={() =>
															removeMember(
																member.email
															)
														}
													>
														Remove
													</button>
												</div>
											</li>
										))}
									</ul>
								</div>
							)}
						</div>
					</div>
				</div>
				{/* // 		</div>
				// 	</div>
				// </div> */}
			</Dialog>
		</div>
	);
};
