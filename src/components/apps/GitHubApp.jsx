"use client";

import { useState } from "react";
import {
  Star,
  GitFork,
  GitBranch,
  GitCommit,
  ExternalLink,
} from "lucide-react";

export default function GitHubApp() {
  const [activeTab, setActiveTab] = useState("repositories");

  const repositories = [
    {
      name: "UniCom",
      description: "Full-stack request management app with real-time tracking",
      language: "JavaScript",
      stars: 24,
      forks: 8,
      isPrivate: false,
      updatedAt: "3 days ago",
      url: "https://github.com/Saxena-Shivam/UniCom",
    },
    {
      name: "Rental-Booking",
      description:
        "Property rental platform with interactive maps and booking system",
      language: "JavaScript",
      stars: 18,
      forks: 5,
      isPrivate: false,
      updatedAt: "1 week ago",
      url: "https://github.com/Saxena-Shivam/Rental-Booking",
    },
    {
      name: "Campus-Groceries",
      description: "College-focused e-commerce with real-time order tracking",
      language: "JavaScript",
      stars: 32,
      forks: 11,
      isPrivate: false,
      updatedAt: "2 weeks ago",
      url: "https://github.com/Saxena-Shivam/Campus-Groceries",
    },
    {
      name: "Hello-College",
      description: "Student community portal with resource sharing and forums",
      language: "TypeScript",
      stars: 15,
      forks: 3,
      isPrivate: false,
      updatedAt: "3 weeks ago",
      url: "https://github.com/Saxena-Shivam/Hello-College",
    },
  ];

  const commits = [
    {
      message: "Added automated email reminders with Node-cron",
      hash: "e1f2a3b",
      author: "Shivam Saxena",
      time: "2 days ago",
      repository: "UniCom",
    },
    {
      message: "Implemented Mapbox integration for property discovery",
      hash: "d9c8b7a",
      author: "Shivam Saxena",
      time: "4 days ago",
      repository: "Rental-Booking",
    },
    {
      message: "Optimized MongoDB queries for 40% faster response",
      hash: "c5d6e7f",
      author: "Shivam Saxena",
      time: "1 week ago",
      repository: "Campus-Groceries",
    },
    {
      message: "Added SSR optimization to Next.js frontend",
      hash: "b4c3d2e",
      author: "Shivam Saxena",
      time: "2 weeks ago",
      repository: "Hello-College",
    },
  ];

  const stats = {
    totalCommits: 267,
    totalStars: 89,
    totalForks: 27,
    contributionsThisYear: 142,
  };

  return (
    <div className="h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">GitHub</h1>
            <p className="text-sm text-gray-600">Saxena-Shivam</p>
          </div>
        </div>

        <button
          onClick={() =>
            window.open("https://github.com/Saxena-Shivam", "_blank")
          }
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open GitHub</span>
        </button>
      </div>

      {/* Profile Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-start space-x-6">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            SS
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Shivam Saxena
            </h2>
            <p className="text-gray-600 mb-4">
              Full Stack Developer at IIT Bhubaneswar specializing in React,
              Node.js and database optimization. Passionate about building
              efficient web applications.
            </p>

            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.totalCommits}
                </div>
                <div className="text-sm text-gray-600">Commits</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.totalStars}
                </div>
                <div className="text-sm text-gray-600">Stars</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.totalForks}
                </div>
                <div className="text-sm text-gray-600">Forks</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-800">
                  {stats.contributionsThisYear}
                </div>
                <div className="text-sm text-gray-600">Contributions</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {["repositories", "commits", "activity"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium capitalize transition-colors ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "repositories" && (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Repositories ({repositories.length})
              </h3>
            </div>

            <div className="space-y-4">
              {repositories.map((repo) => (
                <div
                  key={repo.name}
                  className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4
                        className="text-lg font-medium text-blue-600 hover:underline cursor-pointer"
                        onClick={() => window.open(repo.url, "_blank")}
                      >
                        {repo.name}
                      </h4>
                      {repo.isPrivate && (
                        <span className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded">
                          Private
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4" />
                        <span>{repo.stars}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <GitFork className="w-4 h-4" />
                        <span>{repo.forks}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-3">{repo.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <div
                          className={`w-3 h-3 rounded-full ${
                            repo.language === "JavaScript"
                              ? "bg-yellow-500"
                              : "bg-blue-500"
                          }`}
                        ></div>
                        <span>{repo.language}</span>
                      </div>
                      <span>Updated {repo.updatedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "commits" && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Recent Commits
            </h3>
            <div className="space-y-4">
              {commits.map((commit) => (
                <div
                  key={commit.hash}
                  className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  onClick={() =>
                    window.open(
                      `https://github.com/Saxena-Shivam/${commit.repository}/commit/${commit.hash}`,
                      "_blank"
                    )
                  }
                >
                  <GitCommit className="w-5 h-5 text-gray-500 mt-1" />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800 mb-1">
                      {commit.message}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                        {commit.hash}
                      </span>
                      <span>{commit.repository}</span>
                      <span>{commit.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "activity" && (
          <div className="p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Contribution Activity
            </h3>

            {/* Contribution Graph */}
            <div className="mb-8">
              <h4 className="text-md font-medium text-gray-700 mb-4">
                Contributions in the last year
              </h4>
              <div className="grid grid-cols-53 gap-1">
                {Array.from({ length: 365 }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-sm ${
                      Math.random() > 0.8
                        ? "bg-green-500"
                        : Math.random() > 0.6
                        ? "bg-green-300"
                        : Math.random() > 0.4
                        ? "bg-green-200"
                        : "bg-gray-100"
                    }`}
                  ></div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                <span>Less</span>
                <div className="flex items-center space-x-1">
                  <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                </div>
                <span>More</span>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="text-md font-medium text-gray-700 mb-4">
                Recent Activity
              </h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm">
                  <GitBranch className="w-4 h-4 text-green-500" />
                  <span>
                    Created branch{" "}
                    <code className="bg-gray-100 px-1 rounded">
                      feature/auth-improvements
                    </code>{" "}
                    in <strong>UniCom</strong>
                  </span>
                  <span className="text-gray-500">3 days ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <GitCommit className="w-4 h-4 text-blue-500" />
                  <span>
                    Pushed 2 commits to <strong>Rental-Booking</strong>
                  </span>
                  <span className="text-gray-500">5 days ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>
                    Starred <strong>vercel/next.js</strong>
                  </span>
                  <span className="text-gray-500">1 week ago</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <GitFork className="w-4 h-4 text-purple-500" />
                  <span>
                    Forked <strong>shadcn-ui/ui</strong>
                  </span>
                  <span className="text-gray-500">2 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
