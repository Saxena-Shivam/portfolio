"use client";

import { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Shuffle,
  Repeat,
  Heart,
  Search,
} from "lucide-react";

export default function SpotifyApp() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(75);
  const [currentTrack, setCurrentTrack] = useState(0);
  const audioRef = useRef(null);

  // Sample tracks with audio URLs
  const tracks = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      duration: "3:20",
      image: "https://picsum.photos/256/256?random=1",
      preview_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    },
    {
      id: 2,
      title: "Shape of You",
      artist: "Ed Sheeran",
      album: "÷ (Divide)",
      duration: "3:53",
      image: "https://picsum.photos/256/256?random=2",
      preview_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    },
    {
      id: 3,
      title: "Someone Like You",
      artist: "Adele",
      album: "21",
      duration: "4:45",
      image: "https://picsum.photos/256/256?random=3",
      preview_url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
    },
  ];

  const currentSong = tracks[currentTrack];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", nextTrack);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", nextTrack);
    };
  }, [currentTrack]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length);
    setIsPlaying(false);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(false);
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio || !duration) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  return (
    <div className="h-full bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center space-x-4">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
            alt="Spotify"
            className="w-8 h-8"
          />
          <h1 className="text-xl font-bold">Spotify</h1>
        </div>

        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search for songs, artists, or albums"
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 text-white"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 p-4 border-r border-gray-800">
          <nav className="space-y-2">
            <div className="font-semibold text-white py-2 px-3 bg-gray-800 rounded-lg">
              Home
            </div>
            <div className="text-gray-400 py-2 px-3 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
              Search
            </div>
            <div className="text-gray-400 py-2 px-3 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
              Your Library
            </div>
          </nav>

          <div className="mt-8">
            <h3 className="text-gray-400 text-sm font-semibold mb-4">
              PLAYLISTS
            </h3>
            <div className="space-y-2">
              <div className="text-gray-400 py-2 px-3 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                Liked Songs
              </div>
              <div className="text-gray-400 py-2 px-3 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                My Playlist #1
              </div>
              <div className="text-gray-400 py-2 px-3 hover:text-white hover:bg-gray-800 rounded-lg cursor-pointer transition-colors">
                Chill Vibes
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Now Playing */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-64 h-64 bg-gradient-to-br from-green-500 to-green-700 rounded-lg mb-6 mx-auto shadow-2xl overflow-hidden">
                <img
                  src={currentSong.image || "/placeholder.svg"}
                  alt={currentSong.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-2xl font-bold mb-2">{currentSong.title}</h1>
              <p className="text-lg text-gray-300 mb-1">{currentSong.artist}</p>
              <p className="text-sm text-gray-400">{currentSong.album}</p>

              <button className="mt-4 p-2 hover:bg-gray-800 rounded-full transition-colors">
                <Heart className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Track List */}
          <div className="h-48 border-t border-gray-800 overflow-y-auto">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-4">Queue</h3>
              {tracks.map((track, index) => (
                <div
                  key={track.id}
                  className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                    index === currentTrack ? "bg-gray-800" : ""
                  }`}
                  onClick={() => setCurrentTrack(index)}
                >
                  <img
                    src={track.image || "/placeholder.svg"}
                    alt={track.title}
                    className="w-10 h-10 rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium">{track.title}</div>
                    <div className="text-sm text-gray-400">{track.artist}</div>
                  </div>
                  <div className="text-sm text-gray-400">{track.duration}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div className="p-4 bg-gray-900 border-t border-gray-800">
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            className="w-full bg-gray-600 rounded-full h-1 cursor-pointer"
            onClick={handleSeek}
          >
            <div
              className="bg-green-500 h-1 rounded-full transition-all duration-300"
              style={{
                width: duration ? `${(currentTime / duration) * 100}%` : "0%",
              }}
            ></div>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-center space-x-6 mb-4">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={prevTrack}
            className="p-3 hover:bg-gray-800 rounded-full transition-colors"
          >
            <SkipBack className="w-6 h-6" />
          </button>

          <button
            onClick={togglePlay}
            className="p-4 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-3 hover:bg-gray-800 rounded-full transition-colors"
          >
            <SkipForward className="w-6 h-6" />
          </button>

          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center space-x-3">
          <Volume2 className="w-5 h-5" />
          <div className="w-24 bg-gray-600 rounded-full h-1">
            <div
              className="bg-green-500 h-1 rounded-full"
              style={{ width: `${volume}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-300 w-8">{volume}%</span>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={currentSong.preview_url} />
    </div>
  );
}
