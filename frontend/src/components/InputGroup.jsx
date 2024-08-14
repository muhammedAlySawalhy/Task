// src/components/InputGroup.js
import React from "react";

const InputGroup = ({ label, placeholder, id, onChange, name }) => {
  return (
    <div className="flex flex-row space-x-2 m-2">
      <label htmlFor={id} className="w-1/4 text-gray-600">
        {label}
      </label>
      <input
        type="text"
        id={id}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        onChange={onChange}
        name={name}
      />
    </div>
  );
};

export default InputGroup;
