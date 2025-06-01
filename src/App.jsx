"use client";

import { useState, useEffect } from "react";
import Desktop from "./components/Desktop.jsx";
import BootScreen from "./components/BootScreen.jsx";
import ShutdownScreen from "./components/ShutdownScreen.jsx";
import PowerOffScreen from "./components/PowerOffScreen.jsx";

function App() {
  const [systemState, setSystemState] = useState("booting");
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Use 'f' key to enter fullscreen
      if (e.key === "f" || e.key === "F") {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
          elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  // Booting effect
  useEffect(() => {
    if (systemState === "booting") {
      const timer = setTimeout(() => {
        setSystemState("running");
      }, 3000);
      return () => clearTimeout(timer);
    }
    if (systemState === "shutting-down") {
      const timer = setTimeout(() => {
        setSystemState("poweroff");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [systemState]);

  const handleShutdown = () => {
    setSystemState("shutting-down");
  };

  const handlePowerOn = () => {
    setSystemState("booting");
  };

  const handleLock = () => {
    setSystemState("locked");
  };

  if (systemState === "booting") {
    return <BootScreen onComplete={() => setSystemState("running")} />;
  }
  if (systemState === "poweroff" || systemState === "locked") {
    return <PowerOffScreen onPowerOff={handlePowerOn} />;
  }
  if (systemState === "shutting-down") {
    return <ShutdownScreen />;
  }

  return <Desktop onShutdown={handleShutdown} onLock={handleLock} />;
}

export default App;
