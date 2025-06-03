"use client";

import { useState, useEffect, useRef } from "react";
import {
  Monitor,
  Volume2,
  Wifi,
  Battery,
  User,
  Shield,
  Palette,
  Cpu,
  Menu,
  X,
} from "lucide-react";
import { useDesktop } from "../../contexts/DesktopContext";

export default function SettingsApp() {
  const [activeSection, setActiveSection] = useState("display");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  const [settings, setSettings] = useState({
    brightness: 100,
    volume: 80,
    theme: "dark",
    language: "en",
    timezone: "PST",
    notifications: true,
    autoUpdate: true,
  });

  const { wallpaper, setWallpaper } = useDesktop();
  const wallpaperImages = Array.from(
    { length: 10 },
    (_, i) => `/image/wallpaper${i + 1}.avif`
  );

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

  // Brightness effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.filter = `brightness(${settings.brightness}%)`;
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.filter = "";
      }
    };
  }, [settings.brightness]);

  // Close sidebar on outside click (mobile only)
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const handleClick = (e) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target) &&
        !e.target.closest(".mobile-menu-button")
      ) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <div className="h-full bg-white flex flex-col md:flex-row relative">
      {/* Mobile Menu Button */}
      <div className="md:hidden p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">Settings</h2>
        <button
          onClick={() => setIsMobileMenuOpen((v) => !v)}
          className="mobile-menu-button p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open settings menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed md:static inset-y-0 left-0 z-40 w-64 bg-gray-50 border-r border-gray-200 p-4 transform transition-transform duration-300 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:h-full flex-shrink-0 overflow-y-auto`}
        style={{ maxHeight: "100vh" }}
      >
        <div className="flex justify-between items-center mb-4 md:mb-4">
          <h2 className="text-lg font-semibold text-gray-800 hidden md:block">
            Settings
          </h2>
          {/* Close button for mobile sidebar */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                activeSection === section.id
                  ? "bg-blue-100 text-blue-700"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <section.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm md:text-base">{section.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto pt-16 md:pt-6">
        {/* Current Section Header for Mobile */}
        <div className="md:hidden mb-6 flex items-center space-x-2 text-gray-700">
          {sections
            .filter((s) => s.id === activeSection)
            .map((section) => (
              <div key={section.id} className="flex items-center space-x-2">
                <section.icon className="w-5 h-5" />
                <h3 className="text-lg font-semibold">{section.name}</h3>
              </div>
            ))}
        </div>

        {/* Display Section */}
        {activeSection === "display" && (
          <div>
            <h3 className="hidden md:block text-xl font-semibold text-gray-800 mb-6">
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
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base">
                  <option>1920 x 1080 (Recommended)</option>
                  <option>1680 x 1050</option>
                  <option>1440 x 900</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Orientation
                </label>
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center text-sm md:text-base">
                    <input
                      type="radio"
                      name="orientation"
                      defaultChecked
                      className="mr-2"
                    />
                    Landscape
                  </label>
                  <label className="flex items-center text-sm md:text-base">
                    <input type="radio" name="orientation" className="mr-2" />
                    Portrait
                  </label>
                </div>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-2">Advanced</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Night light</li>
                  <li>Color calibration</li>
                  <li>Multiple displays</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Sound Section */}
        {activeSection === "sound" && (
          <div>
            <h3 className="hidden md:block text-xl font-semibold text-gray-800 mb-6">
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
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base">
                  <option>Built-in Speakers</option>
                  <option>Bluetooth Headphones</option>
                  <option>USB Headset</option>
                </select>
              </div>
              <div>
                <label className="flex items-center text-sm md:text-base">
                  <input type="checkbox" defaultChecked className="mr-2" />
                  <span>Enable system sounds</span>
                </label>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-2">Advanced</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>App volume and device preferences</li>
                  <li>Input device selection</li>
                  <li>Sound enhancements</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Network Section */}
        {activeSection === "network" && (
          <div>
            <h3 className="hidden md:block text-xl font-semibold text-gray-800 mb-6">
              Network Settings
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Wi-Fi
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base">
                  <option>Home Wi-Fi</option>
                  <option>Office Network</option>
                  <option>Mobile Hotspot</option>
                </select>
              </div>
              <div>
                <label className="flex items-center text-sm md:text-base">
                  <input type="checkbox" checked className="mr-2" readOnly />
                  <span>Connect automatically</span>
                </label>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-2">Advanced</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Proxy settings</li>
                  <li>Network reset</li>
                  <li>Data usage</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Power Section */}
        {activeSection === "power" && (
          <div>
            <h3 className="hidden md:block text-xl font-semibold text-gray-800 mb-6">
              Power Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" id="batterySaver" />
                <label
                  htmlFor="batterySaver"
                  className="text-sm md:text-base text-gray-700"
                >
                  Enable battery saver
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sleep After
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base">
                  <option>15 minutes</option>
                  <option>30 minutes</option>
                  <option>Never</option>
                </select>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-2">Advanced</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Battery usage</li>
                  <li>Power plans</li>
                  <li>Startup settings</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Accounts Section */}
        {activeSection === "accounts" && (
          <div>
            <h3 className="hidden md:block text-xl font-semibold text-gray-800 mb-6">
              Accounts Settings
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value="User"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base"
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value="user@example.com"
                  className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base"
                  readOnly
                />
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-2">Advanced</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Sign-in options</li>
                  <li>Family & other users</li>
                  <li>Sync settings</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Section */}
        {activeSection === "privacy" && (
          <div>
            <h3 className="hidden md:block text-xl font-semibold text-gray-800 mb-6">
              Privacy Settings
            </h3>
            <div className="space-y-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) =>
                    updateSetting("notifications", e.target.checked)
                  }
                  className="mr-2"
                  id="notifications"
                />
                <label
                  htmlFor="notifications"
                  className="text-sm md:text-base text-gray-700"
                >
                  Allow notifications
                </label>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  App Permissions
                </label>
                <select className="w-full p-2 border border-gray-300 rounded-lg text-sm md:text-base">
                  <option>Standard</option>
                  <option>Restricted</option>
                  <option>Custom</option>
                </select>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-2">Advanced</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>Location access</li>
                  <li>Camera & microphone</li>
                  <li>Diagnostics & feedback</li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Personalization Section */}
        {activeSection === "personalization" && (
          <div>
            <h3 className="hidden md:block text-xl font-semibold text-gray-800 mb-6">
              Personalization
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {["light", "dark", "auto"].map((theme) => (
                    <button
                      key={theme}
                      onClick={() => updateSetting("theme", theme)}
                      className={`p-3 border-2 rounded-lg text-center capitalize transition-colors text-sm ${
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
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {wallpaperImages.map((img, idx) => (
                    <button
                      key={img}
                      onClick={() => setWallpaper(img)}
                      className={`aspect-video border-2 rounded-lg overflow-hidden transition-colors ${
                        wallpaper === img
                          ? "border-blue-500 ring-2 ring-blue-300"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      style={{ padding: 0 }}
                    >
                      <img
                        src={img}
                        alt={`Wallpaper ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* System Section */}
        {activeSection === "system" && (
          <div>
            <h3 className="hidden md:block text-xl font-semibold text-gray-800 mb-6">
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
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={settings.autoUpdate}
                  onChange={(e) =>
                    updateSetting("autoUpdate", e.target.checked)
                  }
                  className="mr-2"
                  id="autoUpdate"
                />
                <label
                  htmlFor="autoUpdate"
                  className="text-sm md:text-base text-gray-700"
                >
                  Automatically install updates
                </label>
              </div>
              <div className="mt-8">
                <h4 className="font-medium text-gray-800 mb-2">Advanced</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                  <li>About</li>
                  <li>System restore</li>
                  <li>Performance monitor</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
