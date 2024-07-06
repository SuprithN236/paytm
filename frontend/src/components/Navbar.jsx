import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="w-full flex items-center justify-between bg-white py-3 px-10 border shadow-lg sticky top-0">
      <div>
        <Link to={`/dashboard?id=${localStorage.getItem("id")}`}>
          <img
            src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logo.svg"
            alt="paytm logo"
          />
        </Link>
      </div>
      <div className="flex items-center gap-3 bg-blue-950 text-white pl-5 rounded-full">
        <p className="text-lg">Hello</p>
        <img
          src="https://pwebassets.paytm.com/commonwebassets/paytmweb/header/images/logoutImg.svg"
          alt="person"
          width="40px"
          height="auto"
          className="border-blue-950 border-2 rounded-full"
        />
      </div>
    </div>
  );
}

export default Navbar;
