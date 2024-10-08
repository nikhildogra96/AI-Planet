import React from 'react';
import { Handle } from 'reactflow';

const OutputNode = ({ data }) => {
  return (
    <div className="bg-white border-2 border-gray-300 p-4 rounded-lg shadow-md text-left w-64">
      <h3 className="font-bold text-lg mb-4">Output Node</h3>
      <div className="bg-gray-100 p-2 rounded-lg h-32">
        <p>{data.output || "Waiting for output..."}</p>
      </div>
      <Handle type="target" position="left" />
    </div>
  );
};

export default OutputNode;
