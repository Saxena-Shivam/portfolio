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
  const [isExpanded, setIsExpanded] = useState(false);
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

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
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
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

    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const percent = Math.min(
      1,
      Math.max(0, (e.clientX - rect.left) / rect.width)
    );
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  // Mobile-specific interactions
  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div className="h-full bg-black text-white flex flex-col">
      {/* Header - Hidden on mobile */}
      <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-800">
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

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-64 bg-gray-900 p-4 border-r border-gray-800">
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
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-800">
            <div className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
                alt="Spotify"
                className="w-8 h-8"
              />
            </div>
            <div className="text-xl font-bold">Now Playing</div>
            <button>
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Now Playing - Mobile Collapsible */}
          <div
            className={`flex-1 flex flex-col ${
              isExpanded ? "pb-24" : ""
            } transition-all duration-300`}
            onClick={toggleExpand}
          >
            <div className="flex-1 flex items-center justify-center p-4 md:p-8">
              <div className="text-center w-full max-w-md">
                <div
                  className={`mx-auto mb-6 transition-all duration-300 ${
                    isExpanded ? "w-40 h-40" : "w-56 h-56 md:w-64 md:h-64"
                  } bg-gradient-to-br from-green-500 to-green-700 rounded-lg shadow-2xl overflow-hidden`}
                >
                  <img
                    src={currentSong.image || "/placeholder.svg"}
                    alt={currentSong.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div
                  className={`transition-all duration-300 ${
                    isExpanded ? "opacity-0 h-0" : "opacity-100 h-auto"
                  }`}
                >
                  <h1 className="text-2xl font-bold mb-2">
                    {currentSong.title}
                  </h1>
                  <p className="text-lg text-gray-300 mb-1">
                    {currentSong.artist}
                  </p>
                  <p className="text-sm text-gray-400">{currentSong.album}</p>
                </div>
              </div>
            </div>

            {/* Track List - Hidden on mobile when expanded */}
            <div
              className={`h-48 border-t border-gray-800 overflow-y-auto transition-all duration-300 ${
                isExpanded ? "h-0 opacity-0" : "opacity-100"
              }`}
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-4">Queue</h3>
                {tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors ${
                      index === currentTrack ? "bg-gray-800" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentTrack(index);
                    }}
                  >
                    <img
                      src={track.image || "/placeholder.svg"}
                      alt={track.title}
                      className="w-10 h-10 rounded"
                    />
                    <div className="flex-1">
                      <div className="font-medium">{track.title}</div>
                      <div className="text-sm text-gray-400">
                        {track.artist}
                      </div>
                    </div>
                    <div className="text-sm text-gray-400">
                      {track.duration}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Player Controls */}
      <div
        className={`p-4 bg-gray-900 border-t border-gray-800 transition-transform duration-300 ${
          isExpanded ? "translate-y-full" : ""
        }`}
      >
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <div
            ref={progressBarRef}
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
        <div className="flex items-center justify-center space-x-3 md:space-x-6 mb-4">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Shuffle className="w-5 h-5" />
          </button>

          <button
            onClick={prevTrack}
            className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors"
          >
            <SkipBack className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button
            onClick={togglePlay}
            className="p-3 md:p-4 bg-green-500 hover:bg-green-600 rounded-full transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6 md:w-8 md:h-8" />
            ) : (
              <Play className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" />
            )}
          </button>

          <button
            onClick={nextTrack}
            className="p-2 md:p-3 hover:bg-gray-800 rounded-full transition-colors"
          >
            <SkipForward className="w-5 h-5 md:w-6 md:h-6" />
          </button>

          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <Repeat className="w-5 h-5" />
          </button>
        </div>

        {/* Volume Control - Hidden on mobile */}
        <div className="hidden md:flex items-center justify-center space-x-3">
          <Volume2 className="w-5 h-5" />
          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={handleVolumeChange}
            className="w-24 accent-green-500 cursor-pointer"
          />
          <span className="text-sm text-gray-300 w-8">{volume}%</span>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src={currentSong.preview_url} />

      {/* Mobile Mini Player - Shows when collapsed */}
      {!isExpanded && (
        <div
          className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 p-3 border-t border-gray-700 flex items-center z-10"
          onClick={toggleExpand}
        >
          <img
            src={currentSong.image || "/placeholder.svg"}
            alt={currentSong.title}
            className="w-10 h-10 rounded mr-3"
          />
          <div className="flex-1">
            <div className="font-medium truncate">{currentSong.title}</div>
            <div className="text-xs text-gray-400 truncate">
              {currentSong.artist}
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="p-2"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5" />
            ) : (
              <Play className="w-5 h-5" fill="currentColor" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
