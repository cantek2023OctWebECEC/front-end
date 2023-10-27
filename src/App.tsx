import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NotFoundPage } from "./pages/NotFoundPage";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { TodoList } from "./pages/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./redux/rootReducer";
import { Logout } from "./redux/actions/authAction";
import { Profile } from "./pages/Profile-Page/ProfilePage";
import { TripPage } from "./pages/TripPage";
import { SignupPage } from "./pages/SignupPage";
import { ResetPasswordPage } from "./pages/ResetPasswordPage";
import AddCommentList from "./components/AddCommentList";
import Icon from "../public/images.png";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			cacheTime: 1000 * 60 * 5, //  5 mins
		},
	},
});
function App() {
	const { loggedin } = useSelector((state: RootState) => state.Auth);
	const dispatch = useDispatch();

	return (
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				{/*Header */}
				<div className="relative flex flex-col min-h-screen ">
					<nav className="p-4 bg-300">
						<div className="container mx-auto">
							<div className="flex items-center justify-between">

								<div className="text-xl font-bold text-500 flex justify-between items-center">
									<img src={Icon} className="w-10 h-10"></img>
									Travel Planning App
								</div>
								<ul className="flex space-x-4">
									{loggedin ? (
										<>
											<li>
												<a
													href="/"
													className="text-500 hover:underline"
												>
													Schedule
												</a>
											</li>
											<li>

												<a
													href="/profile"
													className="text-500 hover:underline "
												>
													Profile
												</a>
											</li>
										</>

									) : (<></>)}
									<li>
										{loggedin ? (
											<a
												href="/"
												onClick={() => {
													dispatch(Logout());
												}}
											>
												Logout
											</a>
										) : (
											<a
												href="/login"
												className="text-500 hover:underline "
											>
												Login
											</a>
										)}
									</li>
								</ul>
							</div>
						</div>
					</nav>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/login" element={<LoginPage />} />
						<Route path="/signup" element={<SignupPage />} />
						<Route
							path="/resetpassword"
							element={<ResetPasswordPage />}
						/>
						<Route path="/todo/:id" element={<TodoList />} />
						<Route
							path="/comment/:id"
							element={<AddCommentList />}
						/>
						<Route
							path="/trip/:id"
							element={<TripPage></TripPage>}
						></Route>
						<Route path="/profile/*" element={<Profile />} />
						<Route path="/error" element={<NotFoundPage />} />
					</Routes>
					{/*Footer */}
					<footer className="w-full text-center bg-gray-200">
						<div className="absolute bottom-0 w-full mx-auto text-center bg-300 text-500">
							&copy; {new Date().getFullYear()} Cantek Group
						</div>
					</footer>
				</div>
			</BrowserRouter>
		</QueryClientProvider>
	);
}

export default App;
