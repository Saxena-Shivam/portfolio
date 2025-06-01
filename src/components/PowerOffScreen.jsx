"use client";

import { Power } from "lucide-react";

export default function PowerOffScreen({ onPowerOff }) {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white z-50">
      <div className="mb-8">
        <Power
          className="w-24 h-24 text-red-500 cursor-pointer hover:scale-110 transition-transform"
          onClick={onPowerOff}
        />
      </div>
      <div className="text-2xl font-bold mb-2">Ready to power on?</div>
      <div className="text-gray-400 mb-8">
        Click the power button to start your system.
      </div>
    </div>
  );
}
