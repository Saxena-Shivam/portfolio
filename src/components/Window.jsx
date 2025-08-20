"use client";
import {
  useLayoutEffect,
  useState,
  useRef,
  useEffect,
  useCallback,
} from "react";
import { useWindows } from "../contexts/WindowContext";
import useIsMobile from "../hooks/useIsMobile.jsx";
import { Minus, Square, X } from "lucide-react";

export default function Window({ window: win }) {
  const {
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    focusWindow,
    updateWindowPosition,
    updateWindowSize,
  } = useWindows();
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef(null);

  // Responsive: detect mobile/tablet
  const isMobile = useIsMobile();

  const handleMouseDown = (e) => {
    if (
      e.target === e.currentTarget ||
      e.target.classList.contains("window-header")
    ) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - win.position.x,
        y: e.clientY - win.position.y,
      });
      focusWindow(win.id);
    }
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (isDragging && !win.isMaximized && !isMobile) {
        updateWindowPosition(win.id, {
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        });
      }
    },
    [
      isDragging,
      win.isMaximized,
      isMobile,
      updateWindowPosition,
      win.id,
      dragOffset,
    ]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    setIsResizing(false);
  }, []);

  useEffect(() => {
    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, isResizing, handleMouseMove, handleMouseUp]);

  useLayoutEffect(() => {
    function clampWindowToViewport() {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      let width = win.size.width;
      let height = win.size.height;
      let x = win.position.x;
      let y = win.position.y;

      // Clamp width/height
      width = Math.min(width, vw);
      height = Math.min(height, vh);

      // Clamp position
      x = Math.max(0, Math.min(x, vw - width));
      y = Math.max(0, Math.min(y, vh - height));

      // Only update if needed
      if (width !== win.size.width || height !== win.size.height) {
        updateWindowSize(win.id, { width, height });
      }
      if (x !== win.position.x || y !== win.position.y) {
        updateWindowPosition(win.id, { x, y });
      }
    }

    clampWindowToViewport();
    window.addEventListener("resize", clampWindowToViewport);
    return () => window.removeEventListener("resize", clampWindowToViewport);
    // eslint-disable-next-line
  }, [win.id, win.size.width, win.size.height, win.position.x, win.position.y]);

  // Responsive window style
  let windowStyle;
  if (win.isMaximized || isMobile) {
    windowStyle = {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      width: "100vw",
      height: "100vh",
      zIndex: win.zIndex,
      maxWidth: "100vw",
      maxHeight: "100vh",
      minWidth: "0",
      minHeight: "0",
      borderRadius: isMobile ? 0 : "0.5rem",
    };
  } else {
    windowStyle = {
      position: "fixed",
      left: win.position.x,
      top: win.position.y,
      width: win.size.width,
      height: win.size.height,
      zIndex: win.zIndex,
      minWidth: 220,
      minHeight: 120,
      maxWidth: "100vw",
      maxHeight: "100vh",
    };
  }

  return (
    <div
      ref={windowRef}
      className={`bg-white shadow-2xl overflow-hidden animate-slideIn flex flex-col ${
        isMobile ? "rounded-none" : "rounded-lg"
      }`}
      style={win.isMinimized ? { display: "none" } : windowStyle}
      onClick={() => focusWindow(win.id)}
    >
      {/* Window Header */}
      <div
        className="window-header bg-gray-100 border-b border-gray-200 h-10 flex items-center justify-between px-2 sm:px-4 select-none"
        onMouseDown={handleMouseDown}
        style={{
          touchAction: isMobile ? "none" : "auto",
          minHeight: 40,
        }}
      >
        <div className="text-xs sm:text-sm font-medium text-gray-700 flex-1 text-center truncate">
          {win.title}
        </div>
        <div className="flex items-center space-x-2">
          {!isMobile && (
            <>
              <button
                onClick={() => minimizeWindow(win.id)}
                className="px-2 py-1 text-black rounded hover:bg-gray-600 transition-colors"
                aria-label="Minimize"
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => maximizeWindow(win.id)}
                className="px-2 py-1 text-black rounded hover:bg-gray-600 transition-colors"
                aria-label="Maximize"
              >
                <Square size={16} />
              </button>
            </>
          )}
          <button
            onClick={() => closeWindow(win.id)}
            className="px-2 py-1 text-black rounded hover:bg-gray-600 transition-colors"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div
        className="flex-1 min-h-0 overflow-y-auto"
        style={{
          padding: isMobile ? 4 : 0,
        }}
      >
        {win.component}
      </div>
    </div>
  );
}
