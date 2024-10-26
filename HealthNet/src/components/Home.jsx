import React from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useSelector } from "react-redux";


function Home() {

  const userData = useSelector((state) => state.auth.userData);
  console.log(userData);


  return (
    <div className="m-4">
      <Link to="/user-register">
        <Button className="mb-4">register via user</Button>
      </Link>
      <br />
      <Link to="/doc-register">
        <Button>register via doctor</Button>
      </Link>
    </div>
  );
}

export default Home;
