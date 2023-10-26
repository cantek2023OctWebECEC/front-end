import React, { useState, useEffect, useMemo } from "react";
// import fakeTaskData from "../../public/FakeTododata.json"; // Import the JSON data
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { showTrip } from "../apis/tripApi";
import { compact } from "lodash";
import { createTodo, deleteTodo, listTodo, updateTodo } from "../apis/todoApi";
import { Todo } from "../utils/types/TodoList";
//import {useForm} from 'react-hook-form'

interface AddTodoListProps {
	selectedFilter: string;
}

export const AddTodoList: React.FC<AddTodoListProps> = ({ selectedFilter }) => {
	const navigate = useNavigate();
	const { id } = useParams();
	const qc = useQueryClient();

	useEffect(() => {
		if (!id) {
			navigate("/error");
		}
	}, [id]);
	const { data: trip } = useQuery({
		//@ts-ignore
		queryKey: ["showTrip", id as string],
		queryFn: async ({ queryKey }: { queryKey: string[] }) =>
			(await showTrip(queryKey[1])).data,
		enabled: !!id,
	});
	const { memberList } = useMemo(() => {
		return {
			memberList: compact([
				...(trip?.participants ?? []),
				trip?.organizer,
			]),
		};
	}, [trip]);
	const { data: todos } = useQuery({
		//@ts-ignore
		queryKey: ["listTodo", trip.id as string],
		queryFn: async ({ queryKey }: { queryKey: string[] }) => {
			const result = (await listTodo({ tripId: queryKey[1] })).data;
			console.log(result);
			return result;
		},
		enabled: !!trip?.id,
	});

	const [selectedMember, setSelectedMember] = useState<string>("");

	// const [tasks, setTasks] = useState<
	// 	{
	// 		task: string;
	// 		status: "active" | "Complete" | string;
	// 		assignedTo: string;
	// 	}[]
	// >([]);
	const [newTask, setNewTask] = useState<string>("");

	//read fake data
	// useEffect(() => {
	// 	setTasks(fakeTaskData.tasks);
	// }, []);

	//end

	const addTask = async () => {
		try {
			if (newTask.trim() !== "") {
				const newTaskItem = {
					title: newTask,
					assigneeId: selectedMember, // Assign the selected member
					tripId: trip?.id,
				};
				// console.log("New Task Status:", newTaskItem.status);
				// console.log("Selected Member:", newTaskItem.assignedTo);
				// Add the new task to the JSON data
				// fakeTaskData.tasks.push(newTaskItem);

				// setTasks([...tasks, newTaskItem]);
				await createTodo(newTaskItem);
				setNewTask("");
				setSelectedMember("");
			}
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			qc.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "showTrip" ||
					query.queryKey[0] === "listTodo",
			});
		}
	};

	const removeTask = async (id: string) => {
		try {
			await deleteTodo(id);
			console.log(`Removed task: ${id}`);
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			qc.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "showTrip" ||
					query.queryKey[0] === "listTodo",
			});
		}
	};

	const toggleTaskStatus = async (id: string) => {
		try {
			const thisTask = todos?.find(
				(e) => e.id === id
			) as NonNullable<Todo>;
			await updateTodo(id, { done: !thisTask.done });
		} catch (err) {
			console.error(err);
			alert(err);
		} finally {
			qc.invalidateQueries({
				predicate: (query) =>
					query.queryKey[0] === "showTrip" ||
					query.queryKey[0] === "listTodo",
			});
		}
	};

	return (
		<div className="max-w-md p-4 mx-auto mb-4">
			<div className="flex mb-4 space-x-2">
				<input
					type="text"
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					className="w-full p-2 border"
					placeholder="Add a task"
				/>
				<select
					value={selectedMember}
					onChange={(e) => setSelectedMember(e.target.value)}
					className="p-2 border"
				>
					<option value="">Select Member</option>
					{memberList.map((e) => (
						<option value={e.id}>{e.username}</option>
					))}
					{/* Add more members as needed */}
				</select>
				<button
					onClick={addTask}
					className="p-2 text-white bg-blue-500 rounded"
				>
					Add
				</button>
			</div>
			<ul>
				{todos
					?.filter((todo) => {
						if (selectedFilter === "all") {
							return true; // Show all tasks
						} else if (selectedFilter === "active") {
							return todo.done === false; // Show only active tasks
						} else if (selectedFilter === "completed") {
							return todo.done === true; // Show only completed tasks
						}
						return true; // Default to show all tasks
					})
					.map((todo, index) => (
						<li
							key={index}
							className={`flex flex-col md:flex-row justify-between items-start md:items-center mb-2 bg-white shadow-lg hover:bg-300 mt-5 px-5 py-5 w-full ${
								todo.done ? "line-through" : ""
							}`}
						>
							<div
								className="w-2/3"
								onClick={() => {
									toggleTaskStatus(todo.id);
								}}
							>
								<div className="mb-2">
									<span className="mr-4">{todo.title}</span>
								</div>
								<div className="w-full my-3 border-b border-gray-200"></div>
								<div className="flex flex-col items-start justify-between mb-2 md:flex-row md:items-center">
									<span className="text-sm text-gray-500">
										Assigned to:{" "}
									</span>
									<div className="flex items-center justify-center w-8 h-8 text-sm text-white bg-blue-500 rounded-full bg-400">
										{todo.assignee?.username
											.substring(0, 2)
											.toUpperCase()}
									</div>
								</div>
							</div>
							<button
								onClick={() => removeTask(todo.id)}
								className={`text-red-500 ${
									todo.done
										? "bg-gray-300 text-gray-500 cursor-not-allowed"
										: ""
								}`}
								disabled={todo.done}
							>
								Remove
							</button>
						</li>
					))}
			</ul>
		</div>
	);
};

export default AddTodoList;
