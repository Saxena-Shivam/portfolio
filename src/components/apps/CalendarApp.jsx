"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

export default function CalendarApp() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState("month");

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
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h1>

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
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            {["month", "week", "day"].map((viewType) => (
              <button
                key={viewType}
                onClick={() => setView(viewType)}
                className={`px-3 py-1 rounded text-sm transition-colors ${
                  view === viewType ? "bg-white shadow-sm" : "hover:bg-gray-200"
                }`}
              >
                {viewType.charAt(0).toUpperCase() + viewType.slice(1)}
              </button>
            ))}
          </div>

          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Calendar Grid */}
        <div className="flex-1 p-4">
          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day) => (
              <div
                key={day}
                className="p-2 text-center text-sm font-medium text-gray-600"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1 flex-1">
            {days.map((date, index) => (
              <div
                key={index}
                className={`min-h-[80px] p-2 rounded-lg cursor-pointer transition-colors border
                  ${isToday(date) ? "border-blue-500" : "border-transparent"}
                  ${isSelected(date) ? "bg-blue-50" : "hover:bg-gray-100"}
                  ${date ? "" : "bg-gray-50 cursor-default"}
                `}
                onClick={() => date && setSelectedDate(date)}
              >
                <div
                  className={`text-sm font-semibold ${
                    isToday(date) ? "text-blue-600" : "text-gray-800"
                  }`}
                >
                  {date ? date.getDate() : ""}
                </div>
                {/* Events */}
                <div className="mt-1 space-y-1">
                  {getEventsForDate(date).map((event) => (
                    <div
                      key={event.id}
                      className={`w-full rounded px-2 py-1 text-xs text-white truncate ${event.color}`}
                      title={event.title}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Optionally, add a sidebar or event details here */}
      </div>
    </div>
  );
}
