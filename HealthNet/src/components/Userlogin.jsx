import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../appwrite/lib/user.controller.js';
import Input from './Input';
import Button from './Button'; 


function Userlogin() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [error, setError] = useState(null);

  const onSubmit = async (data) => {
    try {
      setError(null);
      const { email, password } = data;
       const userData = await loginUser( email, password);
      // Logic for logging in the user
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <div className="w-full max-w-md p-8 mx-auto bg-white border border-blue-100 shadow-md rounded-xl">
        <h2 className="text-3xl font-bold text-center text-blue-800"> Login as a user</h2>
        <p className="mt-2 text-base text-center text-gray-500">
          New patient?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-800 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="mt-8 text-center text-red-600">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          {/* Email Input Field */}
          <div className="relative mb-4">
           
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
             
              {...register('email', {
                required: 'Email is required',
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />
            {errors.email && <p className="text-sm text-red-600">{errors.email.message}</p>}
          </div>

          {/* Password Input Field */}
          <div className="relative mb-4">
          
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              
              {...register('password', {
                required: 'Password is required',
              })}
            />
            {errors.password && <p className="text-sm text-red-600">{errors.password.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full py-2 mt-4 text-white transition-all duration-200 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Userlogin;
