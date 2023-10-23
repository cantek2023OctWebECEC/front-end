import {Link} from "react-router-dom"
import { useSearchParams } from "react-router-dom"

export const TodoListNavBar = () => {

  const [searchParams] = useSearchParams()
  const todosData = searchParams.get("todos")

  return (
    <div className=" bg-grey-50 flex flex-col justify-center mt-2">
        <div className='max-w-ad w-full mx-auto'>
            <div className="max-w-ad w-3/5 mx-auto">
                <div className='text-3xl font-bold mt-2 text-left text-500'>
                    <h2>To-do List</h2>
                </div>
                <div></div>
            <nav className="w-55rem flex justify-between items-center border-b border-gray-300 mt-6 text-500 ">
                <div className="hover:text-600"><Link className={todosData === null?"active":""}to="/" >All</Link></div>
                <div className="hover:text-600"><Link className={todosData === "active"?"active":""}to="/?todos=active">Processing</Link></div>
                <div className="hover:text-600"><Link className={todosData === "completed"?"active":""}to="/?todos=completed">Completed</Link></div>
            </nav>
         </div>
        </div>
    </div>
  )
}
