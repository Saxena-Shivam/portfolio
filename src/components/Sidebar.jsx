"use client";
import { useWindows } from "../contexts/WindowContext";
import ChromeApp from "./apps/ChromeApp";
import FileManagerApp from "./apps/FileManagerApp";
import CodeEditorApp from "./apps/CodeEditorApp";
import SpotifyApp from "./apps/SpotifyApp";
import TerminalApp from "./apps/TerminalApp";
import MailApp from "./apps/MailApp";
import AboutApp from "./apps/AboutApp";
import TextEditorApp from "./apps/TextEditorApp";
import GitHubApp from "./apps/GitHubApp";
import SettingsApp from "./apps/SettingsApp";

export default function Sidebar({ onShowAllApps }) {
  const { openWindow } = useWindows();

  const apps = [
    {
      id: "chrome",
      name: "Chrome",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",
      component: <ChromeApp />,
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
    <>
      {/* Desktop/Tablet: Vertical sidebar */}
      <div className="fixed z-40 left-0 top-10 bottom-0 w-16 bg-black/90 backdrop-blur-md flex-col items-center py-4 space-y-2 border-r border-white/10 hidden sm:flex">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => openWindow(app.id, app.name, app.component)}
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
        {/* Show Applications Button */}
        <button
          onClick={onShowAllApps}
          className="w-12 h-12 mt-auto mb-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
          title="Show Applications"
        >
          {/* 3x3 grid icon */}
          <svg
            width="24"
            height="24"
            fill="currentColor"
            className="text-white"
          >
            <circle cx="5" cy="5" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="12" cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
          </svg>
        </button>
      </div>
      {/* Mobile: Horizontal bar at bottom */}
      <div className="fixed z-40 bottom-0 left-0 right-0 h-16 bg-black/90 backdrop-blur-md flex sm:hidden flex-row items-center px-2 border-t border-white/10 overflow-x-auto">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => openWindow(app.id, app.name, app.component)}
            className="w-12 h-12 mx-1 bg-white/5 hover:bg-white/15 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-110 group border border-white/10"
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
        {/* Show Applications Button */}
        <button
          onClick={onShowAllApps}
          className="w-12 h-12 ml-2 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 border border-white/10"
          title="Show Applications"
        >
          <svg
            width="24"
            height="24"
            fill="currentColor"
            className="text-white"
          >
            <circle cx="5" cy="5" r="2" />
            <circle cx="12" cy="5" r="2" />
            <circle cx="19" cy="5" r="2" />
            <circle cx="5" cy="12" r="2" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="19" cy="12" r="2" />
            <circle cx="5" cy="19" r="2" />
            <circle cx="12" cy="19" r="2" />
            <circle cx="19" cy="19" r="2" />
          </svg>
        </button>
      </div>
    </>
  );
}
