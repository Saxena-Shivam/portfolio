"use client";

import { useState } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCw,
  Download,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Grid,
} from "lucide-react";

export default function ImageViewerApp() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);
  const [viewMode, setViewMode] = useState("single");

  const images = [
    {
      id: 1,
      name: "portfolio-screenshot.jpg",
      src: "https://picsum.photos/600/400?random=1",
      size: "1.2 MB",
    },
    {
      id: 2,
      name: "project-demo.png",
      src: "https://picsum.photos/600/400?random=2",
      size: "856 KB",
    },
    {
      id: 3,
      name: "team-photo.jpg",
      src: "https://picsum.photos/600/400?random=3",
      size: "2.1 MB",
    },
    {
      id: 4,
      name: "design-mockup.png",
      src: "https://picsum.photos/600/400?random=4",
      size: "1.8 MB",
    },
    {
      id: 5,
      name: "code-screenshot.jpg",
      src: "https://picsum.photos/600/400?random=5",
      size: "945 KB",
    },
    {
      id: 6,
      name: "presentation.png",
      src: "https://picsum.photos/600/400?random=6",
      size: "1.5 MB",
    },
  ];

  const currentImage = images[selectedImage];

  const zoomIn = () => setZoom((prev) => Math.min(prev + 25, 300));
  const zoomOut = () => setZoom((prev) => Math.max(prev - 25, 25));
  const rotate = () => setRotation((prev) => (prev + 90) % 360);
  const resetView = () => {
    setZoom(100);
    setRotation(0);
  };

  const nextImage = () =>
    setSelectedImage((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);

  if (viewMode === "grid") {
    return (
      <div className="h-full bg-gray-100">
        {/* Toolbar */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setViewMode("single")}
              className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              Single View
            </button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded">
              <Grid className="w-4 h-4" />
            </button>
          </div>
          <div className="text-sm text-gray-600">{images.length} images</div>
        </div>

        {/* Grid View */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="group cursor-pointer"
              onClick={() => {
                setSelectedImage(index);
                setViewMode("single");
              }}
            >
              <div className="aspect-square bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-medium text-gray-800 truncate">
                  {image.name}
                </div>
                <div className="text-xs text-gray-500">{image.size}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode("grid")}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            <Grid className="w-4 h-4" />
          </button>

          <div className="h-6 w-px bg-gray-600 mx-2"></div>

          <button
            onClick={zoomOut}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <span className="text-sm px-2">{zoom}%</span>

          <button
            onClick={zoomIn}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={rotate}
            className="p-2 hover:bg-gray-700 rounded transition-colors"
          >
            <RotateCw className="w-4 h-4" />
          </button>

          <button
            onClick={resetView}
            className="px-3 py-1 text-sm border border-gray-600 rounded hover:bg-gray-700 transition-colors"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-700 rounded transition-colors">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 hover:bg-gray-700 rounded transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Image Display */}
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src={currentImage.src || "/placeholder.svg"}
            alt={currentImage.name}
            className="max-w-none transition-transform duration-200"
            style={{
              transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
              maxHeight: zoom <= 100 ? "100%" : "none",
              maxWidth: zoom <= 100 ? "100%" : "none",
            }}
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Image Info */}
      <div className="p-4 bg-gray-800 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium">{currentImage.name}</div>
            <div className="text-sm text-gray-400">
              {selectedImage + 1} of {images.length} • {currentImage.size}
            </div>
          </div>

          <div className="flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedImage
                    ? "bg-blue-500"
                    : "bg-gray-600 hover:bg-gray-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
