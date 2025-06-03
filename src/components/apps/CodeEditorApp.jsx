"use client";

import { useState, useEffect } from "react";
import {
  Play,
  Save,
  FolderOpen,
  File,
  Settings,
  Menu,
  X,
  ChevronLeft,
} from "lucide-react";

export default function CodeEditorApp() {
  const [activeFile, setActiveFile] = useState("App.jsx");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [code, setCode] = useState("");

  const files = [
    {
      name: "App.jsx",
      type: "javascript",
      content: `// Welcome to Portfolio Code Editor
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

export default App;`,
    },
    {
      name: "main.jsx",
      type: "javascript",
      content: `// Main application entry point
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// Create root and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    },
    {
      name: "index.css",
      type: "css",
      content: `/* Global styles for the portfolio */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

:root {
  --primary: #2563eb;
  --primary-dark: #1d4ed8;
  --background: #0f172a;
  --surface: #1e293b;
  --text-primary: #f1f5f9;
  --text-secondary: #cbd5e1;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: var(--background);
  color: var(--text-primary);
  line-height: 1.6;
}

.App {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(90deg, #60a5fa, #3b82f6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}`,
    },
    {
      name: "vite.config.js",
      type: "javascript",
      content: `// Vite configuration file
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: \`@import "./src/styles/variables.scss";\`
      }
    }
  }
})`,
    },
  ];

  // Set initial code based on active file
  useEffect(() => {
    const file = files.find((f) => f.name === activeFile);
    if (file) {
      setCode(file.content);
    }
  }, [activeFile]);

  // Update code when file changes
  const handleFileClick = (fileName) => {
    setActiveFile(fileName);
    if (window.innerWidth < 768) {
      setIsSidebarOpen(false);
    }
  };

  // Toggle sidebar on mobile
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isSidebarOpen && window.innerWidth < 768) {
        const sidebar = document.querySelector(".sidebar");
        if (sidebar && !sidebar.contains(e.target)) {
          setIsSidebarOpen(false);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);

  // Get current file type for syntax highlighting
  const getFileType = () => {
    const file = files.find((f) => f.name === activeFile);
    return file ? file.type : "javascript";
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex items-center justify-between p-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-1.5 mr-2 rounded-md hover:bg-gray-700 transition-colors"
          >
            {isSidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 rounded text-sm transition-colors">
              <Play className="w-4 h-4" />
              <span>Run</span>
            </button>
            <button className="flex items-center space-x-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors">
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
            <FolderOpen className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-700 rounded transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className={`sidebar fixed md:relative inset-y-0 left-0 z-30 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-300 ease-in-out h-full flex-shrink-0 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }`}
        >
          <div className="p-4 border-b border-gray-700 flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-300">EXPLORER</h3>
            <button
              onClick={toggleSidebar}
              className="md:hidden p-1 rounded hover:bg-gray-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
          <div className="p-2">
            {files.map((file) => (
              <div
                key={file.name}
                className={`flex items-center space-x-2 p-2 rounded cursor-pointer transition-colors ${
                  activeFile === file.name
                    ? "bg-gray-700 text-blue-400"
                    : "hover:bg-gray-700"
                }`}
                onClick={() => handleFileClick(file.name)}
              >
                <File className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm truncate">{file.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tab Bar */}
          <div className="flex bg-gray-800 border-b border-gray-700">
            <div className="flex items-center px-4 py-2 bg-gray-900 border-r border-gray-700">
              <File className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm truncate max-w-[200px]">
                {activeFile}
              </span>
            </div>
          </div>

          {/* Code Area */}
          <div className="flex-1 relative overflow-auto">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none absolute inset-0"
              style={{
                fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
                paddingLeft: "3.5rem",
                lineHeight: "1.5",
              }}
              spellCheck={false}
            />

            {/* Line Numbers */}
            <div
              className="absolute left-0 top-0 p-4 text-gray-500 text-sm font-mono pointer-events-none"
              style={{ lineHeight: "1.5" }}
            >
              {code.split("\n").map((_, index) => (
                <div key={index} className="text-right pr-2 min-w-[2.5rem]">
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Status Bar */}
          <div className="flex flex-wrap items-center justify-between px-4 py-1 bg-blue-600 text-white text-xs">
            <div className="flex items-center space-x-4">
              <span className="capitalize">{getFileType()}</span>
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
    </div>
  );
}
