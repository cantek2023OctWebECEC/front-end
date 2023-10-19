import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import TodoListNavBar from "../components/TodoListNavBar";
//import AddTodo from '../components/AddToDo'
//import NavBar from '../components/TodoListNavBar'

export const TodoList = () => {
	return (
		<>
		<div>
			<Header></Header>
		</div>
		<div>
			<main>
				<TodoListNavBar/>
				
			</main>
        </div>
		<div>
			<Footer></Footer>
		</div>
		</>

	);
};