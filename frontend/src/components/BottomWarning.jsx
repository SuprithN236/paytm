import React from "react";
import { Link } from "react-router-dom";

function BottomWarning({ label, linkto, to }) {
  return (
    <div className="flex items-center text-sm justify-center gap-1 mt-1 mb-4">
      <p>{label}</p>
      <Link to={to} className="text-blue-700 underline cursor-pointer">
        {linkto}
      </Link>
    </div>
  );
}

export default BottomWarning;
