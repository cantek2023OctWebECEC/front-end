import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { TodoList } from './pages/TodoList';

function App() {

  return (
    <>
    {/*Header */}
    <nav className="bg-300 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-xl font-bold text-500">Travl Planning App</div>
          <ul className="flex space-x-4">
            <li>
              <a href="#" className="text-500 hover:underline">Schedule</a>
            </li>
            <li>
              <a href="#" className="text-500 hover:underline">Member</a>
            </li>
            <li>
              <a href="#" className="text-500 hover:underline ">Todo List</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <BrowserRouter>
      <Routes>      
        <Route path="/" element={<TodoList />} />
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
     {/*Footer */}
    <footer className="bg-gray-200 text-center w-full absolute bottom-0">
      <div className="bg-300 w-full mx-auto text-500">
        &copy; {new Date().getFullYear()} Cantek Group
      </div>
    </footer>
    </>
  );
}

export default App
