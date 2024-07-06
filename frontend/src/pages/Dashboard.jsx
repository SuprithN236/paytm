import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Balance from "../components/Balance";
import Users from "../components/Users";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const asyncCall = async () => {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/${searchParams.get("id")}`
      );

      setEmail(response.data.msg.username);
      setName(response.data.msg.firstname);
    };
    asyncCall();
  }, []);
  return (
    <div className="bg-blue-950 pb-[50px]">
      <Navbar />
      <div className="flex items-center justify-center">
        <div className=" bg-white py-10 rounded-2xl w-5/6 mt-[100px]">
          <Balance name={name} email={email} />
          <Users />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
