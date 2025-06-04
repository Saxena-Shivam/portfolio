"use client";

import { useState } from "react";
import {
  Camera,
  Video,
  RotateCcw,
  Settings,
  Download,
  Trash2,
} from "lucide-react";

export default function CameraApp() {
  const [mode, setMode] = useState("photo");
  const [isRecording, setIsRecording] = useState(false);
  const [photos, setPhotos] = useState([
    { id: 1, src: "https://picsum.photos/100/100?random=1", type: "photo" },
    { id: 2, src: "https://picsum.photos/100/100?random=2", type: "photo" },
    { id: 3, src: "https://picsum.photos/100/100?random=3", type: "video" },
  ]);

  const takePhoto = () => {
    const newPhoto = {
      id: Date.now(),
      src: `https://picsum.photos/100/100?random=${Date.now()}`,
      type: "photo",
    };
    setPhotos([newPhoto, ...photos]);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      setTimeout(() => {
        const newVideo = {
          id: Date.now(),
          src: `https://picsum.photos/100/100?random=${Date.now()}`,
          type: "video",
        };
        setPhotos([newVideo, ...photos]);
        setIsRecording(false);
      }, 3000);
    }
  };

  return (
    <div className="h-full min-h-screen bg-black text-white flex flex-col md:flex-row">
      {/* Camera View */}
      <div className="flex-1 relative min-h-[320px]">
        {/* Camera Preview */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="text-center">
            <Camera className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 text-gray-400" />
            {/* <p className="text-gray-400">Camera Preview</p> */}
            <p className="text-sm text-gray-500 mt-2">
              {mode === "photo" ? "Photo Mode" : "Video Mode"}
            </p>
            {isRecording && (
              <div className="mt-4">
                <div className="w-4 h-4 bg-red-500 rounded-full mx-auto animate-pulse"></div>
                <p className="text-red-400 text-sm mt-2">Recording...</p>
              </div>
            )}
          </div>
        </div>

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
          <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-center md:space-x-8">
            {/* Mode Toggle */}
            <div className="flex bg-black/50 rounded-full p-1 mb-2 md:mb-0">
              <button
                onClick={() => setMode("photo")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  mode === "photo" ? "bg-white text-black" : "text-white"
                }`}
              >
                Photo
              </button>
              <button
                onClick={() => setMode("video")}
                className={`px-4 py-2 rounded-full text-sm transition-colors ${
                  mode === "video" ? "bg-white text-black" : "text-white"
                }`}
              >
                Video
              </button>
            </div>

            {/* Capture Button */}
            <button
              onClick={mode === "photo" ? takePhoto : toggleRecording}
              className={`w-16 h-16 rounded-full border-4 border-white flex items-center justify-center transition-all ${
                isRecording ? "bg-red-500" : "hover:bg-white/20"
              }`}
            >
              {mode === "photo" ? (
                <div className="w-12 h-12 bg-white rounded-full"></div>
              ) : isRecording ? (
                <div className="w-6 h-6 bg-white rounded-sm"></div>
              ) : (
                <div className="w-12 h-12 bg-red-500 rounded-full"></div>
              )}
            </button>

            {/* Settings */}
            <button className="p-3 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Top Controls */}
        <div className="absolute top-0 left-0 right-0 p-2 md:p-4 flex justify-between">
          <button className="p-2 bg-black/50 rounded-full hover:bg-black/70 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Gallery Sidebar */}
      <div className="w-full md:w-64 bg-gray-900 border-t md:border-t-0 md:border-l border-gray-700 flex-shrink-0">
        <div className="p-4 border-b border-gray-700">
          <h3 className="font-semibold">Gallery</h3>
          <p className="text-sm text-gray-400">{photos.length} items</p>
        </div>

        <div className="p-4 grid grid-cols-3 md:grid-cols-1 gap-3 overflow-y-auto max-h-48 md:max-h-none">
          {photos.map((item) => (
            <div key={item.id} className="group relative">
              <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                <img
                  src={item.src || "/placeholder.svg"}
                  alt="Captured media"
                  className="w-full h-full object-cover"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="w-8 h-8 text-white" />
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center space-x-2">
                <button className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors">
                  <Download className="w-4 h-4" />
                </button>
                <button className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
