import React, { useState } from "react";
import Heading from "../components/Heading";
import SubHeading from "../components/SubHeading";
import InputBox from "../components/InputBox";
import BottomWarning from "../components/BottomWarning";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center h-screen bg-[#adb5bd] min-w-[284px]">
      <div className="max-w-[320px] w-full border rounded-lg px-4 bg-white ">
        <Heading label="Sign in" />
        <SubHeading info="Enter your information to sign in" />
        <InputBox
          id="Email"
          placeholder="suprithn236@gmail.com"
          onchange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <InputBox
          id="Password"
          placeholder="****"
          onchange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div>
          <button
            className="bg-black text-white py-1 px-3 rounded-lg w-full mt-4 hover:bg-blue-700 cursor-pointer"
            onClick={async () => {
              const response = await axios.post(
                "http://localhost:3000/api/v1/user/signin",
                {
                  username,
                  password,
                }
              );
              console.log(response.data);
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("id", response.data.id);
              navigate(`/dashboard/?id=${response.data.id}`);
            }}
          >
            Sign in
          </button>
        </div>
        <BottomWarning
          label="Don't have an account?"
          linkto="Signup"
          to="/signup"
        />
      </div>
    </div>
  );
}

export default Signin;
