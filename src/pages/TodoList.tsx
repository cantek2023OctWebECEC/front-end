import React, { useState } from 'react';
import { TodoListNavBar } from "../components/TodoListNavBar";
import {AddTodoList} from "../components/AddTodoList";

export const TodoList = () => {
	const [selectedFilter, setSelectedFilter] = useState<string>('all');

	return (
		<div>
			<main>
				<TodoListNavBar
					setSelectedFilter={setSelectedFilter}
				/>
				<AddTodoList selectedFilter={selectedFilter} />
			</main>
        </div>
	);
};