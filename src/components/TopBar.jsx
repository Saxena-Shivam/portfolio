import { useState, useRef, useEffect } from "react";
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
  const [showStatusMenu, setShowStatusMenu] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(76); // Example: start at 76%
  const { openWindow } = useWindows();
  const powerMenuRef = useRef(null);
  const statusMenuRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClick(event) {
      if (
        powerMenuRef.current &&
        !powerMenuRef.current.contains(event.target)
      ) {
        setShowPowerMenu(false);
      }
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target)
      ) {
        setShowStatusMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Simulate battery charging
  useEffect(() => {
    const interval = setInterval(() => {
      setBatteryLevel((prev) => (prev < 100 ? prev + 1 : 100));
    }, 2000); // Increase every 2 seconds
    return () => clearInterval(interval);
  }, []);

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
    <div className="fixed top-0 left-0 right-0 h-10 sm:h-8 bg-black/90 backdrop-blur-md text-white text-xs sm:text-sm flex items-center justify-between px-2 sm:px-4 z-50 border-b border-white/10">
      {/* Left: Activities/Applications */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        <button className="hover:bg-white/10 px-2 sm:px-3 py-1 rounded transition-colors text-xs sm:text-sm">
          Activities
        </button>
        <button className="hover:bg-white/10 px-2 py-1 rounded transition-colors text-xs sm:text-sm">
          Applications
        </button>
      </div>

      {/* Center: Date/Time (hide date on xs) */}
      <div className="flex items-center space-x-1 font-medium">
        <span className="hidden xs:inline">{formatDate(currentTime)}</span>
        <span>{formatTime(currentTime)}</span>
      </div>

      {/* Right: Status, Settings, User */}
      <div className="flex items-center space-x-1 relative">
        {/* Status Section */}
        <div
          className="flex items-center space-x-1 px-1 sm:px-2 py-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
          onClick={() => setShowStatusMenu((v) => !v)}
          ref={statusMenuRef}
        >
          <Wifi className="w-4 h-4" />
          <Volume2 className="w-4 h-4" />
          <Battery className="w-4 h-4" />
        </div>

        {/* Status Dropdown */}
        {showStatusMenu && (
          <div
            className="absolute right-16 top-10 sm:top-8 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 min-w-44 sm:min-w-56 z-50 animate-slideIn"
            ref={statusMenuRef}
          >
            <div className="px-4 py-2 border-b border-gray-600 flex items-center space-x-2">
              <Wifi className="w-4 h-4" />
              <span>Wi-Fi: Connected</span>
            </div>
            <div className="px-4 py-2 border-b border-gray-600 flex items-center space-x-2">
              <Volume2 className="w-4 h-4" />
              <span>Volume: 80%</span>
            </div>
            <div className="px-4 py-2 flex items-center space-x-2">
              <Battery className="w-4 h-4" />
              <span>
                Battery: {batteryLevel}%{" "}
                {batteryLevel < 100 ? "(Charging...)" : "(Full)"}
              </span>
            </div>
          </div>
        )}

        {/* Settings button */}
        <button
          className="p-1 hover:bg-white/10 rounded transition-colors"
          title="Settings"
          onClick={() => openWindow("settings", "Settings", <SettingsApp />)}
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User/Power menu */}
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
              className="absolute right-0 top-10 sm:top-8 bg-gray-800 border border-gray-600 rounded-lg shadow-xl py-2 min-w-40 sm:min-w-48 z-50 animate-slideIn"
            >
              <div className="px-4 py-2 border-b border-gray-600">
                <div className="font-medium">Shivam Saxena</div>
                <div className="text-xs text-gray-400">
                  24ee01074@iitbbs.ac.in
                </div>
              </div>
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
