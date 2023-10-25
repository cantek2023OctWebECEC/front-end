import { useSearchParams, useNavigate  } from "react-router-dom"

interface TodoListNavBarProps {
    setSelectedFilter: (filter: string) => void;
  }

export const TodoListNavBar = ({ setSelectedFilter }:TodoListNavBarProps) => {

  const [searchParams] = useSearchParams()
  const todosData = searchParams.get("todos")
  const navigate = useNavigate();
  
  const updateFilter = (filterValue:string) => {
    setSelectedFilter(filterValue); 
    searchParams.set("todos", filterValue);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return (
    <div className=" bg-grey-50 flex flex-col justify-center mt-2">
        <div className='max-w-ad w-full mx-auto'>
            <div className="max-w-ad w-3/5 mx-auto">
                <div className='text-3xl font-bold mt-2 text-left text-500'>
                    <h2>To-do List</h2>
                </div>
                <div></div>
            <nav className="w-55rem flex justify-between items-center border-b border-gray-300 mt-6 text-500 ">
                <div className="hover:text-600">
                    <button className={todosData === null ? "active" : ""} onClick={() => updateFilter("all")}>All</button>
                </div>
                <div className="hover:text-600">
                    <button className={todosData === "active" ? "active" : ""} onClick={() => updateFilter("active")}>Processing</button>
                </div>
                <div className="hover:text-600">
                    <button className={todosData === "completed" ? "active" : ""} onClick={() => updateFilter("completed")}>Completed</button>
                </div>
            </nav>
         </div>
        </div>
    </div>
  )
}
