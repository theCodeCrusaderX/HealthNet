import React, { useState } from "react";
import {createDoctor} from "../../appwrite/lib/doctor.controller.js";
import { Link, useNavigate } from "react-router-dom";
// import { login } from "../store/authSlice";
import Button from "./Button.jsx";
import Input from "./Input.jsx";
// import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";

function DoctorRegister() {
  // const navigate = useNavigate();
  const [error, setError] = useState("");
  // const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    const {fName, lName, email, experience,  specialist, instituteName, phoneNo, address, avatar,password} = data

    // give a valid log 
    console.log(experience);
    console.log("\n",data);
    
    
    setError("");
    try {
      const response = await createDoctor({
        fName,
        lName,
        email,
        experience,
        specialist,
        instituteName,
        phoneNo,
        address,
        avatar,
        password,
      });      

      console.log("response :: ",response);
      
      
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <h2 className="text-center text-2xl font-bold leading-tight">
          Register to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            log In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="First Name: "
              placeholder="Enter your first name"
              {...register("fName", {
                required: true,
              })}
            />
            <Input
              label="last Name: "
              placeholder="Enter your last name"
              {...register("lName", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <Input
              label="Experience: "
              type="text"
              placeholder="Enter your years of experience"
              {...register("experience", {
                required: true,
              })}
            />
            <Input
              label="Specialist: "
              type="text"
              placeholder="Your's specialist"
              {...register("specialist", {
                required: true,
              })}
            />
            <Input
              label="Institute Name: "
              type="text"
              placeholder="Institute Name"
              {...register("instituteName", {
                required: true,
              })}
            />
            <Input
              label="Phone No.: "
              type="text"
              placeholder="Phone no."
              {...register("phoneNo", {
                required: true,
              })}
            />
            <Input
              label="Enter your Address: "
              type="text"
              placeholder="Address"
              {...register("address", {
                required: true,
              })}
            />
            <Input
              label="Enter your Avatar: "
              type="text"
              placeholder="Avatar"
              {...register("avatar", {
                required: true,
              })}
            />
            <Input
              label="Password: "
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: true,
              })}
            />
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DoctorRegister;
