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
    console.log(data)
    try {
      setError(null);
      
      const { email, password } = data;
      const userData = await loginUser(userName, email, password);
     // if(userData){
       // dispatch(login(email,password))
     // }
      
    } catch (err) {
      // Display an error message if login fails
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10">
        <h2 className="text-center text-2xl font-bold leading-tight">Login user</h2>
        <p className="mt-2 text-center text-base text-black/60">
          New user?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
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
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          <div className="mt-4">
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: 'Password is required',
              })}
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>

          <Button type="submit" className="w-full mt-4">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}

export default Userlogin;
