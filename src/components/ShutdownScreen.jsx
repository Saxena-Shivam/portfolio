"use client"

import { useEffect, useState } from "react"
import { Power } from "lucide-react"

export default function ShutdownScreen() {
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState("Saving your work...")

  const shutdownMessages = [
    "Saving your work...",
    "Closing applications...",
    "Stopping services...",
    "Unmounting file systems...",
    "Powering down...",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 3
        const messageIndex = Math.floor((newProgress / 100) * shutdownMessages.length)
        if (messageIndex < shutdownMessages.length) {
          setMessage(shutdownMessages[messageIndex])
        }
        return newProgress >= 100 ? 100 : newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-white">
      <div className="mb-8">
        <Power className="w-16 h-16 text-red-500" />
      </div>

      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold mb-4">Shutting Down</h1>
        <p className="text-gray-300">{message}</p>
      </div>

      <div className="w-64 bg-gray-700 rounded-full h-2">
        <div
          className="bg-red-500 h-2 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      <div className="mt-4 text-sm text-gray-400">{progress}%</div>
    </div>
  )
}
