import axios from "axios";
import React, { useEffect, useState } from "react";

function Balance({ email, name }) {
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    const asyncCall = async () => {
      const response = await axios.get(
        "http://localhost:3000/api/v1/account/balance",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log(response.data.balance);
      setBalance(response.data.balance);
    };
    asyncCall();
  }, []);
  return (
    <div className="flex items-center justify-between border-b-2 pb-10 px-[100px]">
      <div>
        <div className="flex items-center gap-3">
          <p className="text text-[#828282] w-20">Name:</p>
          <p className="font-bold">{name}</p>
        </div>
        <div className="flex items-center gap-3">
          <p className="text text-[#828282] w-20">Email ID:</p>
          <p className="font-bold">{email}</p>
        </div>
      </div>
      <div className="border-l-2 pl-8 border-[#ccc]">
        <p className="font-bold text-sm text-slate-500">TOTAL BALANCE</p>
        <p className="font-bold text-2xl">₹ {balance}</p>
      </div>
    </div>
  );
}

export default Balance;
