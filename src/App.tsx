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
import { Profile } from './pages/Profile-Page/ProfilePage';
function App() {

  return (
    <BrowserRouter>
      <Routes>      
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<TodoList />} />
        <Route path="/profile/*" element={<Profile/>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
