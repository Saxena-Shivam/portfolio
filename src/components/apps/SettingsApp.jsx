"use client";

import { useState } from "react";
import {
  Monitor,
  Volume2,
  Wifi,
  Battery,
  User,
  Shield,
  Palette,
  Cpu,
} from "lucide-react";

export default function SettingsApp() {
  const [activeSection, setActiveSection] = useState("display");
  const [settings, setSettings] = useState({
    brightness: 75,
    volume: 80,
    wallpaper: "default",
    theme: "dark",
    language: "en",
    timezone: "PST",
    notifications: true,
    autoUpdate: true,
  });

  const sections = [
    { id: "display", name: "Display", icon: Monitor },
    { id: "sound", name: "Sound", icon: Volume2 },
    { id: "network", name: "Network", icon: Wifi },
    { id: "power", name: "Power", icon: Battery },
    { id: "accounts", name: "Accounts", icon: User },
    { id: "privacy", name: "Privacy", icon: Shield },
    { id: "personalization", name: "Personalization", icon: Palette },
    { id: "system", name: "System", icon: Cpu },
  ];

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="h-full bg-white flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Settings</h2>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <section.icon className="w-5 h-5" />
              <span>{section.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        {activeSection === "display" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Display Settings
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brightness
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.brightness}
                  onChange={(e) =>
                    updateSetting("brightness", Number.parseInt(e.target.value))
                  }
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {settings.brightness}%
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Resolution
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>1920 x 1080 (Recommended)</option>
                  <option>1680 x 1050</option>
                  <option>1440 x 900</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orientation
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="orientation"
                      defaultChecked
                      className="mr-2"
                    />
                    Landscape
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="orientation" className="mr-2" />
                    Portrait
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "sound" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Sound Settings
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Master Volume
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.volume}
                  onChange={(e) =>
                    updateSetting("volume", Number.parseInt(e.target.value))
                  }
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {settings.volume}%
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Output Device
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg">
                  <option>Built-in Speakers</option>
                  <option>Bluetooth Headphones</option>
                  <option>USB Headset</option>
                </select>
              </div>

              <div>
                <label className="flex items-center">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span className="text-sm text-gray-700">
                    Enable system sounds
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeSection === "personalization" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              Personalization
            </h3>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {["light", "dark", "auto"].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => updateSetting("theme", theme)}
                      className={`p-4 border-2 rounded-lg text-center capitalize transition-colors ${
                        settings.theme === theme
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {theme}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wallpaper
                </label>
                <div className="grid grid-cols-4 gap-4">
                  {["default", "nature", "abstract", "minimal"].map(
                    (wallpaper) => (
                      <button
                        key={wallpaper}
                        onClick={() => updateSetting("wallpaper", wallpaper)}
                        className={`aspect-video border-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500 transition-colors ${
                          settings.wallpaper === wallpaper
                            ? "border-blue-500"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="w-full h-full flex items-center justify-center text-white text-xs capitalize">
                          {wallpaper}
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "system" && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-6">
              System Information
            </h3>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-800 mb-3">
                  Device Specifications
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">OS:</span>
                    <span>Portfolio OS v1.0.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processor:</span>
                    <span>Intel Core i7-12700K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Memory:</span>
                    <span>16 GB RAM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Storage:</span>
                    <span>512 GB SSD</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-800 mb-3">
                  Storage Usage
                </h4>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>System</span>
                      <span>45 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: "35%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Applications</span>
                      <span>28 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{ width: "22%" }}
                      ></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Documents</span>
                      <span>15 GB</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-500 h-2 rounded-full"
                        style={{ width: "12%" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoUpdate}
                    onChange={(e) =>
                      updateSetting("autoUpdate", e.target.checked)
                    }
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700">
                    Automatically install updates
                  </span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
