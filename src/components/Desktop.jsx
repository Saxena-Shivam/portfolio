"use client";

import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import Sidebar from "./Sidebar";
import DesktopIcons from "./DesktopIcons";
import WindowManager from "./WindowManager";
import { WindowProvider, useWindows } from "../contexts/WindowContext";
import { DesktopProvider, useDesktop } from "../contexts/DesktopContext";
import CodeEditorApp from "./apps/CodeEditorApp";
import SpotifyApp from "./apps/SpotifyApp";
import SettingsApp from "./apps/SettingsApp";
import CalculatorApp from "./apps/CalculatorApp";
import FileManagerApp from "./apps/FileManagerApp";
import TerminalApp from "./apps/TerminalApp";
import MailApp from "./apps/MailApp";
import CameraApp from "./apps/CameraApp";
import TextEditorApp from "./apps/TextEditorApp";
import ImageViewerApp from "./apps/ImageViewerApp";
import CalendarApp from "./apps/CalendarApp";
import GitHubApp from "./apps/GitHubApp";
import AboutApp from "./apps/AboutApp";
import ChromeApp from "./apps/ChromeApp";

// Desktop background
function DesktopBackground() {
  const { wallpaper } = useDesktop();
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${wallpaper})` }}
    />
  );
}

// All Apps Overlay (GNOME style)
function AllAppsOverlay({ show, onClose, onOpenApp, apps }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex flex-col items-center justify-center">
      <div className="bg-white/10 rounded-xl p-4 sm:p-8 shadow-2xl max-w-4xl w-full">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <span className="text-xl sm:text-2xl text-white font-bold">
            All Applications
          </span>
          <button
            className="text-white text-2xl px-3 py-1 rounded hover:bg-white/20"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 sm:gap-8">
          {apps.map((app) => (
            <button
              key={app.id}
              className="flex flex-col items-center space-y-2 p-2 sm:p-4 rounded-lg hover:bg-white/20 transition"
              onClick={() => {
                onOpenApp(app);
                onClose();
              }}
            >
              {app.icon &&
              app.icon.startsWith &&
              app.icon.startsWith("http") ? (
                <img
                  src={app.icon}
                  alt={app.name}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
              ) : (
                <span className="text-3xl sm:text-4xl">{app.icon}</span>
              )}
              <span className="text-white text-xs sm:text-sm font-medium">
                {app.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const allApps = [
  {
    id: "chrome",
    name: "Google Chrome",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
    component: <ChromeApp />,
  },
  {
    id: "calculator",
    name: "Calculator",
    icon: "🧮",
    component: <CalculatorApp />,
  },
  {
    id: "files",
    name: "Files",
    icon: "📁",
    component: <FileManagerApp />,
  },
  {
    id: "code",
    name: "VS Code",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg",
    component: <CodeEditorApp />,
  },
  {
    id: "spotify",
    name: "Spotify",
    icon: "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg",
    component: <SpotifyApp />,
  },
  {
    id: "terminal",
    name: "Terminal",
    icon: "⚫",
    component: <TerminalApp />,
  },
  {
    id: "mail",
    name: "Mail",
    icon: "📧",
    component: <MailApp />,
  },
  {
    id: "camera",
    name: "Camera",
    icon: "📷",
    component: <CameraApp />,
  },
  {
    id: "about",
    name: "About",
    icon: "👤",
    component: <AboutApp />,
  },
  {
    id: "text-editor",
    name: "Text Editor",
    icon: "📝",
    component: <TextEditorApp />,
  },
  {
    id: "image-viewer",
    name: "Images",
    icon: "🖼️",
    component: <ImageViewerApp />,
  },
  {
    id: "calendar",
    name: "Calendar",
    icon: "📅",
    component: <CalendarApp />,
  },
  {
    id: "github",
    name: "GitHub",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg",
    component: <GitHubApp />,
  },
  {
    id: "settings",
    name: "Settings",
    icon: "⚙️",
    component: <SettingsApp />,
  },
];

function DesktopContent({ currentTime, onShutdown, onLock }) {
  const [showAllApps, setShowAllApps] = useState(false);
  const { openWindow } = useWindows();

  const handleOpenApp = (app) => {
    if (app.component) {
      openWindow(app.id, app.name, app.component);
    }
  };

  return (
    <div className="h-screen w-screen overflow-hidden relative select-none pb-16 sm:pb-0">
      {/* Desktop Background */}
      <DesktopBackground />

      {/* Desktop Overlay */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Top Bar */}
      <TopBar
        currentTime={currentTime}
        onShutdown={onShutdown}
        onLock={onLock}
      />

      {/* Sidebar with show all apps handler */}
      <Sidebar onShowAllApps={() => setShowAllApps(true)} />

      {/* Desktop Icons */}
      <DesktopIcons />

      {/* All Apps Overlay */}
      <AllAppsOverlay
        show={showAllApps}
        onClose={() => setShowAllApps(false)}
        onOpenApp={handleOpenApp}
        apps={allApps}
      />

      {/* Window Manager */}
      <WindowManager />
    </div>
  );
}
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
        <DesktopContent
          currentTime={currentTime}
          onShutdown={onShutdown}
          onLock={onLock}
        />
      </WindowProvider>
    </DesktopProvider>
  );
}
