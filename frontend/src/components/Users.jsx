import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchUsers, setSearchUsers] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/v1/user/bulk?filter=${searchUsers}`)
      .then((response) => {
        setUsers(response.data.data);
      });
  }, [searchUsers]);
  return (
    <div className="px-[100px] mt-8">
      <p className="font-medium mb-2">Send money to </p>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter name of the reciever"
          className="w-full border border-black py-1 px-3 rounded-lg"
          onChange={(e) => {
            setSearchUsers(e.target.value);
          }}
        />
      </div>
      <div>
        {users.map((user) => (
          <div
            className="flex items-center justify-between bg-[#d7e3fc] px-4 py-2 rounded-xl mb-4"
            key={user.id}
          >
            <div className="flex items-center gap-2">
              <p className="font-bold">{user.firstname}</p>
              <p className="font-bold">{user.lastname}</p>
            </div>
            <button
              className="bg-blue-700 py-1 px-4 rounded-full text-white cursor-pointer"
              onClick={() => {
                navigate("/send?id=" + user.id + "&name=" + user.firstname);
              }}
            >
              Send
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Users;
