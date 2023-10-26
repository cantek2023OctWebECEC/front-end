import './App.css'
import {  BrowserRouter,  Route,  Routes,} from "react-router-dom";
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { TodoList } from './pages/TodoList';

function App() {

  return (
    
    <BrowserRouter>
      {/*Header */}
      <div className=' min-h-screen flex flex-col relative'>
      <nav className="bg-300 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-500">Travl Planning App</div>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-500 hover:underline">Schedule</a>
              </li>
              <li>
                <a href="/member" className="text-500 hover:underline">Member</a>
              </li>
              <li>
                <a href="/todo" className="text-500 hover:underline ">Todo List</a>
              </li>
              <li>
                <a href="/login" className="text-500 hover:underline ">Login</a>
              </li>
            </ul>
          </div>
        </div>
      </nav> 
      <Routes>      
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/todo" element={<TodoList />} />
        <Route path="/error" element={<NotFoundPage />} />
      </Routes>
       {/*Footer */}
      <footer className="bg-gray-200 text-center w-full">
        <div className="bg-300 w-full mx-auto text-500 text-center absolute bottom-0 w-full">
          &copy; {new Date().getFullYear()} Cantek Group
        </div>
      </footer>
      </div>
    </BrowserRouter>
  );
}

export default App
