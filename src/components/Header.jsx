import React from 'react';

const Header = ({ onDeploy, onRun }) => {
  return (
    <div className="w-full h-16 bg-gray-800 text-white flex items-center justify-between px-8 fixed top-0">
      <h1 className="text-xl font-bold">OpenAGI</h1>
      <div className="flex gap-4">
        <button 
          className="px-4 py-2 bg-green-500 text-white rounded"
          onClick={onDeploy}
        >
          Deploy
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded"
          onClick={onRun}
        >
          Run
        </button>
      </div>
    </div>
  );
};

export default Header;
