"use client";

import { useState, useEffect, useRef } from "react";
import {
  Wifi,
  Volume2,
  Battery,
  Settings,
  Power,
  User,
  LogOut,
} from "lucide-react";
import { useWindows } from "../contexts/WindowContext";
import SettingsApp from "./apps/SettingsApp";

export default function TopBar({ currentTime, onShutdown, onLock }) {
  const [showPowerMenu, setShowPowerMenu] = useState(false);
  const { openWindow } = useWindows();
  const powerMenuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!showPowerMenu) return;
    function handleClick(event) {
      if (
        powerMenuRef.current &&
        !powerMenuRef.current.contains(event.target)
      ) {
        setShowPowerMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [showPowerMenu]);

  const formatTime = (date) => {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="absolute top-0 left-0 right-0 h-8 bg-black/90 backdrop-blur-md text-white text-sm flex items-center justify-between px-4 z-50 border-b border-white/10">
      <div className="flex items-center space-x-4">
        <button className="hover:bg-white/10 px-3 py-1 rounded transition-colors">
          Activities
        </button>
        <button className="hover:bg-white/10 px-2 py-1 rounded transition-colors">
          Applications
        </button>
      </div>

      <div className="flex items-center space-x-2 font-medium">
        <span>{formatDate(currentTime)}</span>
        <span>{formatTime(currentTime)}</span>
      </div>

      <div className="flex items-center space-x-1 relative">
        <div className="flex items-center space-x-1 px-2 py-1 rounded hover:bg-white/10 transition-colors">
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>

        {/* Settings button in top bar */}
        <button
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="Settings"
          onClick={() => openWindow("settings", "Settings", <SettingsApp />)}
        >
          <Settings className="w-4 h-4" />
        </button>

        <div className="relative">
          <button
            onClick={() => setShowPowerMenu(!showPowerMenu)}
            className="p-1 hover:bg-white/10 rounded transition-colors"
          >
            <User className="w-4 h-4" />
          </button>

          {showPowerMenu && (
            <div
              ref={powerMenuRef}
              className="absolute right-0 top-8 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 min-w-48 z-50 animate-slideIn"
            >
              <div className="px-4 py-2 border-b border-gray-600">
                <div className="font-medium">Shivam Saxena</div>
                <div className="text-xs text-gray-400">
                  24ee01074@iitbbs.ac.in
                </div>
              </div>

              {/* Settings in power menu */}
              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center space-x-2"
                onClick={() => {
                  openWindow("settings", "Settings", <SettingsApp />);
                  setShowPowerMenu(false);
                }}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>

              <button
                className="w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors flex items-center space-x-2"
                onClick={onLock}
              >
                <LogOut className="w-4 h-4" />
                <span>Lock Screen</span>
              </button>

              <div className="border-t border-gray-600 mt-2 pt-2">
                <button
                  onClick={onShutdown}
                  className="w-full px-4 py-2 text-left hover:bg-red-600 transition-colors flex items-center space-x-2 text-red-400 hover:text-white"
                >
                  <Power className="w-4 h-4" />
                  <span>Shut Down</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
