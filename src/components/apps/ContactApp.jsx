"use client";

import { useState } from "react";
import {
  Search,
  Star,
  Archive,
  Trash2,
  Reply,
  Forward,
  MoreHorizontal,
} from "lucide-react";

export default function MailApp() {
  const [selectedEmail, setSelectedEmail] = useState(0);

  const emails = [
    {
      id: 1,
      sender: "John Doe",
      subject: "Project Collaboration Opportunity",
      preview:
        "Hi Vivek, I came across your portfolio and I'm impressed with your work...",
      time: "2:30 PM",
      unread: true,
      starred: false,
    },
    {
      id: 2,
      sender: "Sarah Wilson",
      subject: "Interview Invitation - Senior Developer",
      preview:
        "We would like to invite you for an interview for the Senior Developer position...",
      time: "11:45 AM",
      unread: true,
      starred: true,
    },
    {
      id: 3,
      sender: "GitHub",
      subject: "Your weekly digest",
      preview: "Here's what happened in your repositories this week...",
      time: "Yesterday",
      unread: false,
      starred: false,
    },
    {
      id: 4,
      sender: "LinkedIn",
      subject: "New connection request",
      preview: "You have a new connection request from Alex Johnson...",
      time: "Yesterday",
      unread: false,
      starred: false,
    },
  ];

  const currentEmail = emails[selectedEmail];

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg mb-6 hover:bg-blue-700 transition-colors">
          Compose
        </button>

        <nav className="space-y-2">
          <div className="font-semibold text-blue-600 py-2 px-3 bg-blue-50 rounded-lg">
            Inbox (2)
          </div>
          <div className="text-gray-600 py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            Starred
          </div>
          <div className="text-gray-600 py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            Sent
          </div>
          <div className="text-gray-600 py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            Drafts
          </div>
          <div className="text-gray-600 py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            Archive
          </div>
          <div className="text-gray-600 py-2 px-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            Trash
          </div>
        </nav>
      </div>

      {/* Email List */}
      <div className="w-80 border-r border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search mail..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="overflow-y-auto">
          {emails.map((email, index) => (
            <div
              key={email.id}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                selectedEmail === index
                  ? "bg-blue-50 border-l-4 border-l-blue-500"
                  : ""
              }`}
              onClick={() => setSelectedEmail(index)}
            >
              <div className="flex items-start justify-between mb-1">
                <div
                  className={`font-medium ${
                    email.unread ? "text-gray-900" : "text-gray-600"
                  }`}
                >
                  {email.sender}
                </div>
                <div className="flex items-center space-x-1">
                  {email.starred && (
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  )}
                  <span className="text-xs text-gray-500">{email.time}</span>
                </div>
              </div>
              <div
                className={`text-sm mb-1 ${
                  email.unread ? "font-medium text-gray-900" : "text-gray-600"
                }`}
              >
                {email.subject}
              </div>
              <div className="text-xs text-gray-500 truncate">
                {email.preview}
              </div>
              {email.unread && (
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Email Content */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-semibold">{currentEmail.subject}</h1>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Archive className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <Trash2 className="w-4 h-4" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-lg">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {currentEmail.sender.charAt(0)}
              </div>
              <div>
                <div className="font-medium">{currentEmail.sender}</div>
                <div className="text-sm text-gray-500">to me</div>
              </div>
            </div>
            <div className="text-sm text-gray-500">{currentEmail.time}</div>
          </div>
        </div>

        <div className="flex-1 p-6 overflow-y-auto">
          <div className="prose max-w-none">
            <p>Dear Vivek,</p>
            <p>
              I hope this email finds you well. I came across your portfolio
              website and I'm thoroughly impressed with your work, particularly
              your innovative approach to web development and the creative
              desktop simulation you've built.
            </p>
            <p>
              We are currently looking for a talented full-stack developer to
              join our team at TechCorp. Your skills in React, Vite, and
              TypeScript align perfectly with what we're looking for. The role
              involves working on cutting-edge projects with a collaborative
              team of developers.
            </p>
            <p>
              Would you be interested in discussing this opportunity further?
              I'd love to schedule a call to talk about the position and learn
              more about your experience.
            </p>
            <p>Looking forward to hearing from you.</p>
            <p>
              Best regards,
              <br />
              {currentEmail.sender}
              <br />
              Senior Recruiter
              <br />
              TechCorp Solutions
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              <Reply className="w-4 h-4" />
              <span>Reply</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Forward className="w-4 h-4" />
              <span>Forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
