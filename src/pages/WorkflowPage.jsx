import React, { useState, useCallback } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
} from "reactflow";
import axios from "axios";
import "reactflow/dist/style.css";
import InputNode from "../components/InputNode";
import LLMEngineNode from "../components/LLMEngineNode";
import OutputNode from "../components/OutputNode";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import "tailwindcss/tailwind.css";

const nodeTypes = {
  inputNode: InputNode,
  llmEngineNode: LLMEngineNode,
  outputNode: OutputNode,
};

const initialNodes = [];
const initialEdges = [];

const WorkflowPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const isValidConnection = (sourceNodeType, targetNodeType) => {
    return (
      (sourceNodeType === "inputNode" && targetNodeType === "llmEngineNode") ||
      (sourceNodeType === "llmEngineNode" && targetNodeType === "outputNode")
    );
  };

  const onConnect = (params) => {
    const sourceNode = nodes.find((node) => node.id === params.source);
    const targetNode = nodes.find((node) => node.id === params.target);

    if (
      sourceNode &&
      targetNode &&
      isValidConnection(sourceNode.type, targetNode.type)
    ) {
      setEdges((eds) => addEdge(params, eds));
    } else {
      alert(
        "Invalid connection! Input can only connect to LLM Engine, and LLM Engine can only connect to Output."
      );
    }
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      const position = { x: event.clientX, y: event.clientY };

      const id = `${nodes.length + 1}`;
      const newNode = {
        id,
        type,
        position,
        data: { label: `${type} Node`, id },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [nodes]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  // Handle running the workflow
  const handleRun = async () => {
    const inputNode = nodes.find((node) => node.type === "inputNode");
    const llmEngineNode = nodes.find((node) => node.type === "llmEngineNode");
    const outputNode = nodes.find((node) => node.type === "outputNode");

    if (!inputNode || !llmEngineNode || !outputNode) {
      alert("Please connect all three nodes: Input, LLM Engine, and Output.");
      return;
    }

    const inputData = inputNode.data.input || "";
    const { apiKey, modelName, apiBase, maxTokens, temperature } =
      llmEngineNode.data;

    if (!apiKey) {
      alert("OpenAI API key is missing in LLM Engine node!");
      return;
    }

    // Make the OpenAI API request
    try {
      const response = await axios.post(
        `${apiBase}/v1/completions`,
        {
          prompt: inputData,
          model: modelName,
          max_tokens: maxTokens,
          temperature: temperature,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );

      const outputText = response.data.choices[0].text.trim();
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === outputNode.id) {
            node.data = { ...node.data, output: outputText };
          }
          return node;
        })
      );
    } catch (error) {
      console.error("Error making API request", error);
      alert("Failed to call OpenAI API. Check the API Key and connection.");
    }
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <Header onRun={handleRun} />

      {/* Sidebar and React Flow Canvas Container */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* React Flow Canvas */}
        <div
          className="flex-1 flex flex-col justify-center items-center w-1/2 mx-auto h-[92%] mt-12"
          onDrop={onDrop}
          onDragOver={onDragOver}
        >
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
};

export default WorkflowPage;
