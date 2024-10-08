import React, { useState } from "react";
import { Handle } from "reactflow";

const LLMEngineNode = ({ data }) => {
  const [modelName, setModelName] = useState("gpt-3.5");
  const [apiBase, setApiBase] = useState("https://api.openai.com");
  const [apiKey, setApiKey] = useState("");
  const [maxTokens, setMaxTokens] = useState(2000);
  const [temperature, setTemperature] = useState(0.5);

  // Store configuration in data for workflow
  data.modelName = modelName;
  data.apiBase = apiBase;
  data.apiKey = apiKey;
  data.maxTokens = maxTokens;
  data.temperature = temperature;

  return (
    <div className="bg-white border-2 border-gray-300 p-4 rounded-lg shadow-md text-left w-64">
      <h3 className="font-bold text-lg mb-4">LLM Engine Node</h3>

      <label className="block mb-2 text-sm font-semibold">Model Name:</label>
      <select
        value={modelName}
        onChange={(e) => setModelName(e.target.value)}
        className="w-full p-2 border rounded-lg mb-3"
      >
        <option value="gpt-3.5">GPT-3.5</option>
        <option value="gpt-4">GPT-4</option>
      </select>

      <label className="block mb-2 text-sm font-semibold">
        OpenAI API Base:
      </label>
      <input
        type="text"
        value={apiBase}
        onChange={(e) => setApiBase(e.target.value)}
        className="w-full p-2 border rounded-lg mb-3"
      />

      <label className="block mb-2 text-sm font-semibold">OpenAI Key:</label>
      <input
        type="password"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        className="w-full p-2 border rounded-lg mb-3"
      />

      <label className="block mb-2 text-sm font-semibold">Max Tokens:</label>
      <input
        type="number"
        value={maxTokens}
        onChange={(e) => setMaxTokens(Number(e.target.value))}
        className="w-full p-2 border rounded-lg mb-3"
      />

      <label className="block mb-2 text-sm font-semibold">Temperature:</label>
      <input
        type="number"
        value={temperature}
        onChange={(e) => setTemperature(Number(e.target.value))}
        className="w-full p-2 border rounded-lg mb-3"
      />

      {/* Handles */}
      <Handle type="target" position="left" />
      <Handle type="source" position="right" />
    </div>
  );
};

export default LLMEngineNode;
