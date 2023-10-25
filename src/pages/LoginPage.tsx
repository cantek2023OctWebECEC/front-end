import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../redux/actions/authAction";
import { RootState } from "../redux/rootReducer";

interface FormData {
	email: string;
	password: string;
	remember: boolean;
}

export const LoginPage: React.FC = () => {
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm<FormData>();

	const onSubmit = handleSubmit((formData) => {
		dispatch(Login(formData.email, formData.password));
	});
	const info = useSelector((state: RootState) => state.Auth);

	return (
		<div className="flex flex-col justify-center bg-grey-50">
			<div className="w-full mx-auto mt-6 max-w-ad">
				<div className="w-3/5 mx-auto max-w-ad">
					<div className="mt-2 text-3xl font-bold text-center text-gray-900">
						Login
					</div>

					<div className="w-full p-8 mx-auto mt-4 bg-white border max-w-ad border-grey-300">
						<form
							action=""
							className="space-y-6"
							onSubmit={onSubmit}
						>
							<div>
								<label className="block text-sm text-gray-600 font-blod">
									Email
								</label>
								<input
									type="text"
									{...register("email")}
									name="email"
									className="w-full p-2 mt-1 border border-gray-300 rounded"
								/>
							</div>
							<div>
								<label className="block text-sm text-gray-600 font-blod">
									Password
								</label>
								<input
									type="password"
									{...register("password")}
									name="password"
									className="w-full p-2 mt-1 border border-gray-300 rounded"
								/>
							</div>
							<div>
								<input
									type="checkbox"
									{...register("remember")}
									name="remember"
									className="w-4 h-4 text-blue-300 rounded"
								/>
								<label className="ml-2 text-sm text-gray-600">
									Remeber me
								</label>
							</div>
							<div>
								<a
									href=""
									className="font-medium text-blue-500 text-dm"
								>
									Forgot Password
								</a>
							</div>
							<div>
								<button className="w-full px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700">
									Submit
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<p>{JSON.stringify(info)}</p>
		</div>
	);
};
