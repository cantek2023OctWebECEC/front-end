import { TodoListNavBar } from "../components/TodoListNavBar";
import {AddTodoList} from "../components/AddTodoList";

export const TodoList = () => {
	return (
		<div>
			<main>
				<TodoListNavBar/>
				<AddTodoList/>
			</main>
        </div>
	);
};