"use client"

import { useState } from "react"
import { Play, Save, FolderOpen, File, Settings } from "lucide-react"

export default function CodeEditorApp() {
  const [activeFile, setActiveFile] = useState("App.jsx")
  const [code, setCode] = useState(`// Welcome to Portfolio Code Editor
import React from 'react';

function App() {
  const greetUser = (name) => {
    console.log(\`Hello, \${name}! Welcome to my portfolio.\`);
    
    const skills = ['React', 'Vite', 'JavaScript', 'Node.js'];
    
    skills.forEach(skill => {
      console.log(\`I'm proficient in \${skill}\`);
    });
  };

  // Call the function
  greetUser('Visitor');

  // Example of modern React
  const portfolio = {
    name: 'Vivek Patel',
    role: 'Full Stack Developer',
    experience: '5+ years',
    
    getIntroduction() {
      return \`Hi! I'm \${this.name}, a \${this.role} with \${this.experience} of experience.\`;
    }
  };

  return (
    <div className="App">
      <h1>{portfolio.getIntroduction()}</h1>
    </div>
  );
}

export default App;`)

  const files = [
    { name: "App.jsx", type: "javascript" },
    { name: "main.jsx", type: "javascript" },
    { name: "index.css", type: "css" },
    { name: "vite.config.js", type: "javascript" },
  ]

  return (
    <div className="h-full flex bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-4 border-b border-gray-700">
          <h3 className="text-sm font-semibold text-gray-300">EXPLORER</h3>
        </div>
        <div className="p-2">
          {files.map((file) => (
            <div
              key={file.name}
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer hover:bg-gray-700 ${
                activeFile === file.name ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveFile(file.name)}
            >
              <File className="w-4 h-4 text-blue-400" />
              <span className="text-sm">{file.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1 bg-green-600 hover:bg-green-700 rounded text-sm">
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button className="p-1 hover:bg-gray-700 rounded">
              <FolderOpen className="w-4 h-4" />
            </button>
            <button className="p-1 hover:bg-gray-700 rounded">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex bg-gray-800 border-b border-gray-700">
          <div className="flex items-center px-4 py-2 bg-gray-900 border-r border-gray-700">
            <File className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-sm">{activeFile}</span>
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 relative">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none"
            style={{ fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace' }}
            spellCheck={false}
          />

          {/* Line Numbers */}
          <div className="absolute left-0 top-0 p-4 text-gray-500 text-sm font-mono pointer-events-none">
            {code.split("\n").map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-4 py-1 bg-blue-600 text-white text-xs">
          <div className="flex items-center space-x-4">
            <span>JavaScript</span>
            <span>UTF-8</span>
            <span>LF</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Ln {code.split("\n").length}, Col 1</span>
            <span>Spaces: 2</span>
          </div>
        </div>
      </div>
    </div>
  )
}
