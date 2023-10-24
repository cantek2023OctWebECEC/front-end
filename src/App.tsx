import './App.css'
import {  BrowserRouter,  Route,  Routes,} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotFoundPage } from './pages/NotFoundPage';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { TodoList } from './pages/TodoList';

const queryClient = new QueryClient();
function App() {

  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Routes>      
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/" element={<HomePage />} />
        <Route path="/" element={<TodoList />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
