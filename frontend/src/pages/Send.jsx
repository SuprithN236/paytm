import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Heading from "../components/Heading";
import { HiCheckCircle } from "react-icons/hi";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function Send() {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [transferResponse, setTransferResponse] = useState("");

  return (
    <>
      <div className="bg-blue-950 h-screen">
        <Navbar />
        <div className="mt-[100px] flex px-[30px] justify-center gap-[200px]">
          <div className="w-[300px] bg-white px-[30px] py-[20px] rounded-2xl">
            <Heading label="Send Money to" />
            <div className="flex items-center mt-16 gap-2">
              <p className="py-1 px-3 bg-green-600 text-white rounded-full">
                {searchParams.get("name")[0]}
              </p>
              <p className="font-bold">{searchParams.get("name")}</p>
            </div>
            <p className="mt-10 text-sm">Amount in Rupees</p>
            <input
              type="text"
              placeholder="₹ 0"
              className="w-full border rounded-xl py-1 px-2 mt-2"
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />
            <button
              className="bg-green-600 w-full mt-5 rounded-2xl py-1 text-white"
              onClick={() => {
                axios
                  .post(
                    "http://localhost:3000/api/v1/account/transfer",
                    {
                      to: searchParams.get("id"),
                      amount: amount,
                    },
                    {
                      headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                          "token"
                        )}`,
                      },
                    }
                  )
                  .then((response) => setTransferResponse(response.data.msg));
              }}
            >
              Initiate Transfer
            </button>
          </div>
          {transferResponse ? (
            <div className="bg-white rounded-3xl">
              <div className="h-[55%] flex flex-col items-center justify-center bg-green-200 m-2 w-[300px] rounded-3xl gap-3">
                <div className="flex items-center gap-1">
                  <p className="text-3xl font-bold">₹{amount}</p>
                  <HiCheckCircle className="text-4xl text-green-700" />
                </div>
                <p className="text-xl font-bold">Paid successfully</p>
              </div>
              <div>
                <p className="text-[15px] text-center mt-8 font-bold">
                  To {searchParams.get("name")}
                </p>
                <p className="text-[12px] text-center mt-2">
                  {new Date().toDateString()}
                </p>
                <p className="text-[12px] text-center mt-1">
                  UPI Ref No.123456789
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default Send;
