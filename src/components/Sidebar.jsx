import React from "react";

const Sidebar = () => {
  return (
    <div className="w-1/5  bg-white p-4 h-screen border-r border-gray-200 shadow-md object-contain">
      <h2 className="font-bold text-lg mb-8 mt-16">Components</h2>

      {/* Input Node */}
      <div
        className="p-3 mb-4 bg-blue-100 hover:bg-blue-200 rounded-lg cursor-pointer transition"
        onDragStart={(event) =>
          event.dataTransfer.setData("application/reactflow", "inputNode")
        }
        draggable
      >
        Input Node
      </div>

      {/* LLM Engine Node */}
      <div
        className="p-3 mb-4 bg-green-100 hover:bg-green-200 rounded-lg cursor-pointer transition"
        onDragStart={(event) =>
          event.dataTransfer.setData("application/reactflow", "llmEngineNode")
        }
        draggable
      >
        LLM Engine Node
      </div>

      {/* Output Node */}
      <div
        className="p-3 bg-yellow-100 hover:bg-yellow-200 rounded-lg cursor-pointer transition"
        onDragStart={(event) =>
          event.dataTransfer.setData("application/reactflow", "outputNode")
        }
        draggable
      >
        Output Node
      </div>
    </div>
  );
};

export default Sidebar;
