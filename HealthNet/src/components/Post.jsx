import React from "react";
import Input from "./Input.jsx";
import Button from "./Button.jsx";
import { useForm } from "react-hook-form";
import { CreatePost } from "../../appwrite/lib/post.controller.js";
import { useState } from "react";
import { Link } from "react-router-dom";

function Post() {
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    console.log(data);
    setError("");
    try {
      const { tittle, content } = data;
      const userData = await CreatePost(tittle, content);
      console.log(userData);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-teal-100 to-blue-100 ">
      <div className="border border-black p-5">
        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-6">
            <Input
              label="Tittle"
              placeholder="Tittle"
              {...register("tittle", {
                required: true,
              })}
            />

            <textarea
              placeholder="write something..."
              type="text"
              {...register("content", {
                required: true,
              })}
            />

            <Button
              type="submit"
              className="w-full bg-teal-500 text-white py-2 rounded-lg hover:bg-teal-600 transition duration-200"
            >
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Post;
