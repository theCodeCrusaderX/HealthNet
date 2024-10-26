import React from 'react';
import Input from './Input.jsx';
import Button from './Button.jsx';
import { useForm } from 'react-hook-form';
import { RegisterUser } from '../../appwrite/lib/user.controller.js';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function UserRegister() {
  const [error, setError] = useState('');
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    console.log(data);
    setError('');
    try {
      const { userName, email, password } = data;
      const userData = await RegisterUser(userName, email, password);
      console.log(userData);
      // Handle navigation after successful registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100">
      <div className="mx-auto w-full max-w-lg bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-center text-3xl font-bold text-teal-600 mb-4">Create Your Account</h2>
        <p className="text-center text-lg text-gray-600 mb-8">
          Already have an account?&nbsp;
          <Link
            to="/user-login"
            className="font-semibold text-blue-500 transition duration-200 hover:underline"
          >
            Log In
          </Link>
        </p>
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-6">
            <Input
              label="Username"
              placeholder="Enter your user name"
              {...register('userName', {
                required: true,
              })}
            />

            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register('email', {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    'Email address must be a valid address',
                },
              })}
            />

            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register('password', {
                required: true,
              })}
            />

            <Button type="submit" className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserRegister;
