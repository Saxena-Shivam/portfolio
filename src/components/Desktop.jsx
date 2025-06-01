"use client";

import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import DesktopIcons from "./DesktopIcons";
import WindowManager from "./WindowManager";
import { WindowProvider } from "../contexts/WindowContext";
import { DesktopProvider } from "../contexts/DesktopContext";

export default function Desktop({ onShutdown, onLock }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DesktopProvider>
      <WindowProvider>
        <div className="h-screen w-screen overflow-hidden relative select-none">
          {/* Desktop Background */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`,
            }}
          />

          {/* Desktop Overlay */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Top Bar */}
          <TopBar
            currentTime={currentTime}
            onShutdown={onShutdown}
            onLock={onLock}
          />

          {/* Sidebar */}
          <Sidebar />

          {/* Desktop Icons */}
          <DesktopIcons />

          {/* Window Manager */}
          <WindowManager />
        </div>
      </WindowProvider>
    </DesktopProvider>
  );
}
