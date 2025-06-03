import { allApps } from "./Desktop"; // or export allApps from Desktop.jsx

export default function AllAppsModal({ onOpenApp, onClose }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 rounded-xl p-6 max-w-2xl w-full grid grid-cols-4 gap-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-white text-xl"
          onClick={onClose}
        >
          &times;
        </button>
        {allApps.map((app) => (
          <button
            key={app.id}
            className="flex flex-col items-center space-y-2 p-4 rounded-xl bg-white/10 hover:bg-white/20 transition"
            onClick={() => onOpenApp(app)}
          >
            {app.icon && app.icon.startsWith && app.icon.startsWith("http") ? (
              <img src={app.icon} alt={app.name} className="w-12 h-12" />
            ) : (
              <span className="text-3xl">{app.icon}</span>
            )}
            <span className="text-white text-xs font-medium">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
