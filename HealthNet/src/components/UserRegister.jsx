import React from 'react'
import Input from './Input.jsx'
import Button from './Button.jsx'
import { useForm } from "react-hook-form";
import { RegisterUser } from '../../appwrite/lib/user.controller.js';
function UserRegister() {
    const [error, setError] = useState("");
    // const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
 // const navigate = useNavigate();

    const create = async(data) => {
        console.log(data);
  setError("");
        try {
          const UserData = await RegisterUser(data);
          console.log(UserData);
          // if user regsiter navigate to login page
          
          
          
        } catch (error) {
          setError(error.message);
        }
    }


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
              label="userName: "
              placeholder="Enter your user name"
              {...register("userName", {
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
  )
}

export default UserRegister
