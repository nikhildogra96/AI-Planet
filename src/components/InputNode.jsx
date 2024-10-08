import React, { useState } from "react";
import { Handle } from "reactflow";

const InputNode = ({ data }) => {
  const [input, setInput] = useState("");

  // Update input value in data to pass to LLMEngineNode
  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);
    data.input = newInput; // Pass the input value to be accessed by other nodes
  };

  return (
    <div className="bg-white border-2 border-gray-300 p-4 rounded-lg shadow-md text-left w-64">
      <h3 className="font-bold text-lg mb-4">Input Node</h3>
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter your prompt"
        className="w-full p-2 border rounded-lg mb-3"
      />
      <Handle type="source" position="right" />
    </div>
  );
};

export default InputNode;
