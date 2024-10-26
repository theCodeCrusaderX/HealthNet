import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import {Provider} from "react-redux"
import  store  from "./store/store.js";


import DoctorRegister from "./components/DoctorRegister";
import DoctorLogin from "./components/DoctorLogin.jsx";
import UserRegister from "./components/UserRegister.jsx";
import UserLogin from "./components/Userlogin.jsx";
import Post from "./components/Post.jsx";
import Home from "./components/Home.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<Home />} />
      <Route path="/doc-register" element={<DoctorRegister />} />
      <Route path="/doc-login" element={<DoctorLogin />} />
      <Route path="/user-register" element={<UserRegister />} />
      <Route path="/user-login" element={<UserLogin />} />
      <Route
        path="/post"
        element={
          <ProtectedRoute>
            <Post />
          </ProtectedRoute>
        }
      />
    </Route>
  )
);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store = {store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
