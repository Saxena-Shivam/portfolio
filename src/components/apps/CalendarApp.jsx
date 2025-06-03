"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Menu } from "lucide-react";

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const events = [
    {
      id: 1,
      title: "Team Meeting",
      date: new Date(2024, 4, 27),
      time: "10:00 AM",
      duration: "1 hour",
      location: "Conference Room A",
      color: "bg-blue-500",
    },
    {
      id: 2,
      title: "Project Review",
      date: new Date(2024, 4, 28),
      time: "2:00 PM",
      duration: "2 hours",
      location: "Online",
      color: "bg-green-500",
    },
    {
      id: 3,
      title: "Client Presentation",
      date: new Date(2024, 4, 30),
      time: "11:00 AM",
      duration: "1.5 hours",
      location: "Client Office",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Lunch with Team",
      date: new Date(2024, 4, 25),
      time: "12:30 PM",
      duration: "1 hour",
      location: "Cafeteria",
      color: "bg-yellow-500",
    },
    {
      id: 5,
      title: "Training Session",
      date: new Date(2024, 4, 27),
      time: "3:00 PM",
      duration: "2 hours",
      location: "Training Room",
      color: "bg-red-500",
    },
  ];

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const navigateMonth = (direction) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getEventsForDate = (date) => {
    if (!date) return [];
    return events.filter(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const days = getDaysInMonth(currentDate);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between w-full sm:w-auto">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              className="sm:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h1>
          </div>

          <div className="flex items-center space-x-1 sm:hidden">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Desktop controls */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => navigateMonth("prev")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateMonth("next")}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex bg-gray-100 rounded-lg p-1">
              {["month", "week", "day"].map((viewType) => (
                <button
                  key={viewType}
                  onClick={() => setView(viewType)}
                  className={`px-3 py-1 rounded text-sm transition-colors ${
                    view === viewType
                      ? "bg-white shadow-sm"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                </button>
              ))}
            </div>

            <button className="hidden md:flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Plus className="w-4 h-4" />
              <span>New Event</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {showMobileMenu && (
        <div className="sm:hidden bg-white p-4 border-b border-gray-200 shadow-sm">
          <div className="flex flex-col space-y-3">
            <div className="flex justify-between">
              <div className="flex bg-gray-100 rounded-lg p-1">
                {["month", "week", "day"].map((viewType) => (
                  <button
                    key={viewType}
                    onClick={() => {
                      setView(viewType);
                      setShowMobileMenu(false);
                    }}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      view === viewType
                        ? "bg-white shadow-sm"
                        : "hover:bg-gray-200"
                    }`}
                  >
                    {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
                  </button>
                ))}
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Plus className="w-4 h-4" />
                <span>New</span>
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Calendar Grid */}
        <div className="flex-1 p-2 sm:p-4">
          {/* Day Headers */}
          <div className="hidden sm:grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days - Desktop */}
          <div className="hidden sm:grid grid-cols-7 gap-1">
            {days.map((date, index) => (
              <div
                key={index}
                className={`min-h-[100px] p-2 rounded-lg cursor-pointer transition-colors border
                  ${isToday(date) ? "border-blue-500" : "border-transparent"}
                  ${isSelected(date) ? "bg-blue-50" : "hover:bg-gray-50"}
                  ${date ? "" : "bg-gray-50 cursor-default"}
                `}
                onClick={() => date && setSelectedDate(date)}
              >
                <div
                  className={`text-sm font-semibold ${
                    isToday(date)
                      ? "text-blue-600"
                      : isSelected(date)
                      ? "text-blue-800"
                      : "text-gray-800"
                  }`}
                >
                  {date ? date.getDate() : ""}
                </div>
                {/* Events */}
                <div className="mt-1 space-y-1 overflow-y-auto max-h-[70px]">
                  {getEventsForDate(date).map((event) => (
                    <div
                      key={event.id}
                      className={`w-full rounded px-2 py-1 text-xs text-white truncate ${event.color}`}
                      title={event.title}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Mobile calendar view */}
          <div className="sm:hidden space-y-2">
            <div className="flex justify-between items-center px-2 py-3">
              <button
                onClick={() => navigateMonth("prev")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-lg font-semibold">
                {monthNames[currentDate.getMonth()].substring(0, 3)}{" "}
                {currentDate.getFullYear()}
              </span>
              <button
                onClick={() => navigateMonth("next")}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayNames.map((day) => (
                <div
                  key={day}
                  className="p-2 text-center text-xs font-medium text-gray-600"
                >
                  {day.substring(0, 1)}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <div
                  key={index}
                  className={`aspect-square p-1 rounded-lg cursor-pointer transition-colors flex flex-col items-center justify-center
                    ${isToday(date) ? "border border-blue-500" : ""}
                    ${isSelected(date) ? "bg-blue-100" : "hover:bg-gray-100"}
                    ${date ? "" : "bg-gray-50 cursor-default"}
                  `}
                  onClick={() => date && setSelectedDate(date)}
                >
                  <div
                    className={`text-xs font-semibold ${
                      isToday(date)
                        ? "text-blue-600"
                        : isSelected(date)
                        ? "text-blue-800"
                        : date
                        ? "text-gray-800"
                        : "text-gray-300"
                    }`}
                  >
                    {date ? date.getDate() : ""}
                  </div>
                  {date && getEventsForDate(date).length > 0 && (
                    <div className="flex mt-1 space-x-[2px]">
                      {getEventsForDate(date)
                        .slice(0, 3)
                        .map((event) => (
                          <div
                            key={event.id}
                            className={`w-1 h-1 rounded-full ${event.color}`}
                          ></div>
                        ))}
                      {getEventsForDate(date).length > 3 && (
                        <div className="text-[8px] text-gray-500">
                          +{getEventsForDate(date).length - 3}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar - Event Details */}
        <div className="w-full lg:w-80 xl:w-96 border-t lg:border-t-0 lg:border-l border-gray-200 bg-white p-4 shadow-sm lg:shadow-none">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {selectedDate.toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </h2>
            <p className="text-sm text-gray-600">
              {getEventsForDate(selectedDate).length}{" "}
              {getEventsForDate(selectedDate).length === 1 ? "event" : "events"}
            </p>
          </div>

          <div className="space-y-3 max-h-[calc(100vh-220px)] overflow-y-auto">
            {getEventsForDate(selectedDate).length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                  <Plus className="w-8 h-8 text-gray-400" />
                </div>
                <p>No events scheduled</p>
                <button className="mt-3 text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Add event
                </button>
              </div>
            ) : (
              getEventsForDate(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className={`p-3 rounded-lg border-l-4 ${event.color.replace(
                    "bg",
                    "border"
                  )} bg-white shadow-sm cursor-pointer hover:shadow transition-shadow ${
                    selectedEvent?.id === event.id ? "ring-2 ring-blue-300" : ""
                  }`}
                  onClick={() => setSelectedEvent(event)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-semibold text-gray-800">
                      {event.title}
                    </h3>
                    <span className="text-xs font-medium text-gray-600">
                      {event.time}
                    </span>
                  </div>
                  <div className="mt-2 flex items-center text-xs text-gray-600">
                    <span className="mr-2">{event.duration}</span>
                    <span className="truncate">• {event.location}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-800">
                    {selectedEvent.title}
                  </h2>
                  <div className="mt-1 flex items-center text-sm text-gray-600">
                    <span>{selectedEvent.date.toLocaleDateString()}</span>
                    <span className="mx-2">•</span>
                    <span>{selectedEvent.time}</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex">
                  <div className="w-10 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">Time</h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {selectedEvent.time} ({selectedEvent.duration})
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-10 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Location
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {selectedEvent.location}
                    </p>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-10 flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900">
                      Description
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Team meeting to discuss quarterly goals and project
                      timelines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex space-x-3">
                <button className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 px-4 rounded-lg transition-colors">
                  Edit
                </button>
                <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile floating action button */}
      <button className="fixed bottom-6 right-6 sm:hidden w-14 h-14 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
