import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Login } from "../redux/actions/authAction";
import { useNavigate } from 'react-router-dom';

interface FormData {
    email: string;
    password: string;
    remember: boolean;
}

export const LoginPage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<FormData>();

    const onSubmit = handleSubmit((formData: FormData) => {
        dispatch(Login(formData.email, formData.password));
        navigate('/');
    });

    return (
        <div className="flex flex-col justify-center bg-grey-50">
            <div className="w-full mx-auto mt-6 max-w-ad">
                <div className="w-3/5 mx-auto max-w-ad">
                    <div className="mt-2 text-3xl font-bold text-center text-gray-900">
                        Login
                    </div>
                    <div className="w-full p-8 px-5 py-5 mx-auto mt-4 mt-5 bg-white shadow-lg max-w-ad w-ful">
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
                                    href="/resetpassword"
                                    className="font-medium text-blue-500 text-dm"
                                >
                                    Forgot Password
                                </a>
                            </div>
                            <div className='grid place-items-center'>
                                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
                                <a href="/signup" className="w-full py-2 px-4 text-sm text-center text-blue-500">Sign Up</a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
