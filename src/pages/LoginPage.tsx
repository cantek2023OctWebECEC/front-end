import React from 'react'
import {useForm} from 'react-hook-form'

interface FormData{
    email:string,
    password:string,
    remember:boolean
}

export const LoginPage:React.FC = () => {
    const {register, handleSubmit} = useForm<FormData>();

    const onSubmit = handleSubmit((formData) => {
        console.log(formData.email, formData.password, formData.remember);
    });

	return (
		<div className="min-h-screen bg-grey-50 flex flex-col justify-center">
            <div className='max-w-ad w-full mx-auto'>
                <div className="max-w-ad w-3/5 mx-auto">
                    <div className='text-3xl font-bold text-gray-900 mt-2 text-center'>
                        Login
                    </div>

                    <div className='max-w-ad w-full mx-auto mt-4 bg-white p-8 border border-grey-300'>
                        <form action="" className='space-y-6' onSubmit={onSubmit}>
                            <div>
                                <label  className='text-sm font-blod text-gray-600 block'>Email</label>
                                <input type="text" {...register('email')}   name="email"  className='w-full p-2 border border-gray-300 rounded mt-1'/>
                            </div>
                            <div>
                                <label  className='text-sm font-blod text-gray-600 block'>Password</label>
                                <input type="password" {...register('password')}  name="password"   className='w-full p-2 border border-gray-300 rounded mt-1'/>
                            </div>
                            <div>
                                <input type="checkbox" {...register('remember')} name="remember" className='h-4 w-4 text-blue-300 rounded'/>
                                <label  className='ml-2 text-sm text-gray-600'>Remeber me</label>
                            </div>
                            <div>
                                <a href="" className="font-medium text-dm text-blue-500">Forgot Password</a>
                            </div>
                            <div>
                                <button className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 rounded-md text-white text-sm">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
		</div>
	);
};
