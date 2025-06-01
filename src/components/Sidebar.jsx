"use client";

import { useWindows } from "../contexts/WindowContext.jsx";
import CalculatorApp from "./apps/CalculatorApp.jsx";
import FileManagerApp from "./apps/FileManagerApp.jsx";
import CodeEditorApp from "./apps/CodeEditorApp.jsx";
import SpotifyApp from "./apps/SpotifyApp.jsx";
import TerminalApp from "./apps/TerminalApp.jsx";
import MailApp from "./apps/MailApp.jsx";
import CameraApp from "./apps/CameraApp.jsx";
import TextEditorApp from "./apps/TextEditorApp.jsx";
import ImageViewerApp from "./apps/ImageViewerApp.jsx";
import CalendarApp from "./apps/CalendarApp.jsx";
import GitHubApp from "./apps/GitHubApp.jsx";
import SettingsApp from "./apps/SettingsApp.jsx";
import AboutApp from "./apps/AboutApp";
import ChromeApp from "./apps/ChromeApp.jsx";
export default function Sidebar() {
  const { openWindow } = useWindows();

  const apps = [
    {
      id: "chrome",
      name: "Chrome",
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
    // {
    //   id: "text-editor",
    //   name: "Text Editor",
    //   icon: "📝",
    //   component: <TextEditorApp />,
    // },
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

  return (
    <div className="absolute left-0 top-8 bottom-0 w-16 bg-black/90 backdrop-blur-md flex flex-col items-center py-4 space-y-2 z-40 border-r border-white/10">
      {apps.map((app) => (
        <button
          key={app.id}
          onClick={() => {
            if (app.action) {
              app.action();
            } else if (app.component) {
              openWindow(app.id, app.name, app.component);
            }
          }}
          className="w-12 h-12 bg-white/5 hover:bg-white/15 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group border border-white/10"
          title={app.name}
        >
          {app.icon.startsWith("http") ? (
            <img
              src={app.icon || "/placeholder.svg"}
              alt={app.name}
              className="w-8 h-8"
            />
          ) : (
            <span className="text-2xl">{app.icon}</span>
          )}
        </button>
      ))}
    </div>
  );
}
