import {Link} from "react-router-dom"
import { useSearchParams } from "react-router-dom"

const TodoListNavBar = () => {

  const [searchParams] = useSearchParams()
  const todosData = searchParams.get("todos")

  return (
    <div className="w-full top-10">
    <nav className="top-0 flex flex-col items-center min-h-screen">
        <h2>Todo List</h2>
        <Link className={todosData === null?"active":""}to="/">All</Link>
        <Link className={todosData === "active"?"active":""}to="/?todos=active">Processing</Link>
        <Link className={todosData === "completed"?"active":""}to="/?todos=completed">Completed</Link>
       
    </nav>
    </div>
  )
}

export default TodoListNavBar