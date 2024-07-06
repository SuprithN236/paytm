import React from "react";

function InputBox({ id, placeholder, onchange }) {
  return (
    <div className="w-full flex flex-col gap-1 mb-2">
      <label htmlFor={id} className="font-semibold">
        {id}
      </label>
      <input
        type="text"
        placeholder={placeholder}
        className="border rounded-md px-2 py-1"
        onChange={onchange}
      />
    </div>
  );
}

export default InputBox;
