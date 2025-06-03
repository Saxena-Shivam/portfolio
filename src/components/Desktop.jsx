"use client";

import { useState, useEffect } from "react";
import TopBar from "./TopBar";
import DesktopIcons from "./DesktopIcons";
import WindowManager from "./WindowManager";
import { WindowProvider, useWindows } from "../contexts/WindowContext";
import { DesktopProvider } from "../contexts/DesktopContext";
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
import Sidebar from "./Sidebar";
import DesktopBackground from "./DesktopBackground";
import AllAppsModal from "./AllAppsModal";

export const allApps = [
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

function AllAppsMobile({ onOpenApp }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-40 flex flex-col items-center justify-center sm:hidden">
      <div className="w-full max-w-md mx-auto p-2 flex-1 flex flex-col justify-center">
        <div
          className="grid grid-cols-3 gap-4"
          style={{
            minHeight: "calc(100vh - 80px)",
            maxHeight: "calc(100vh - 80px)",
            alignContent: "center",
          }}
        >
          {allApps.map((app) => (
            <button
              key={app.id}
              className="flex flex-col items-center space-y-2 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              onClick={() => onOpenApp(app)}
              style={{ minHeight: 80 }}
            >
              {app.icon &&
              app.icon.startsWith &&
              app.icon.startsWith("http") ? (
                <img src={app.icon} alt={app.name} className="w-12 h-12" />
              ) : (
                <span className="text-3xl">{app.icon}</span>
              )}
              <span className="text-white text-xs font-medium">{app.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function DesktopContent({ currentTime, onShutdown, onLock }) {
  const [mobileApp, setMobileApp] = useState(null);
  const { openWindow, windows } = useWindows();
  const [showAllApps, setShowAllApps] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // On mobile, open app as a single full-screen window
  const handleOpenAppMobile = (app) => {
    setMobileApp(app);
    openWindow(app.id, app.name, app.component);
  };

  // On mobile, when all windows are closed, return to home
  useEffect(() => {
    if (isMobile && windows.length === 0) setMobileApp(null);
  }, [windows, isMobile]);

  return (
    <div className="h-screen w-screen overflow-hidden relative select-none pb-0">
      {/* Desktop Background */}
      <DesktopBackground />

      {/* Top Bar */}
      <TopBar
        currentTime={currentTime}
        onShutdown={onShutdown}
        onLock={onLock}
      />

      {/* Desktop/Tablet: Sidebar and Desktop Icons */}
      <div className="hidden sm:block">
        <Sidebar onShowAllApps={() => setShowAllApps(true)} />
        <DesktopIcons />
      </div>
      {/* Show modal when needed */}
      {showAllApps && !isMobile && (
        <AllAppsModal
          onOpenApp={(app) => {
            openWindow(app.id, app.name, app.component);
            setShowAllApps(false);
          }}
          onClose={() => setShowAllApps(false)}
        />
      )}
      {/* Mobile: Show All Apps grid if no app is open */}
      {isMobile && !mobileApp && (
        <AllAppsMobile onOpenApp={handleOpenAppMobile} />
      )}

      {/* Window Manager (windows will cover the whole screen on mobile) */}
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
