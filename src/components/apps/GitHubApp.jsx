"use client";

import { useState, useEffect } from "react";
import {
  Star,
  GitFork,
  GitBranch,
  GitCommit,
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

export default function GitHubApp() {
  const [activeTab, setActiveTab] = useState("repositories");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [repositories, setRepositories] = useState([]);
  const [commits, setCommits] = useState([]);
  const [stats, setStats] = useState({
    totalCommits: 267,
    totalStars: 89,
    totalForks: 27,
    contributionsThisYear: 142,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = "Saxena-Shivam"; // Replace with any GitHub username

  // Fetch repositories from GitHub API
  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch(
          `https://api.github.com/users/${username}/repos?sort=updated`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch repositories");
        }
        const data = await response.json();

        // Transform GitHub API response to match our structure
        const formattedRepos = data.map((repo) => ({
          name: repo.name,
          description: repo.description || "No description",
          language: repo.language || "Unknown",
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          isPrivate: repo.private,
          updatedAt: formatDate(repo.updated_at),
          url: repo.html_url,
        }));

        setRepositories(formattedRepos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepositories();
  }, [username]);

  // Fetch recent commits from GitHub API
  useEffect(() => {
    const fetchCommits = async () => {
      if (repositories.length === 0) return;

      try {
        const commitPromises = repositories.slice(0, 4).map((repo) =>
          fetch(`https://api.github.com/repos/${username}/${repo.name}/commits`)
            .then((res) => res.json())
            .then((commits) => ({
              ...commits[0],
              repository: repo.name,
            }))
        );

        const commitData = await Promise.all(commitPromises);

        const formattedCommits = commitData.map((commit) => ({
          message: commit.commit.message.split("\n")[0],
          hash: commit.sha.substring(0, 7),
          author: commit.commit.author.name,
          time: formatDate(commit.commit.author.date),
          repository: commit.repository,
        }));

        setCommits(formattedCommits);
      } catch (err) {
        console.error("Error fetching commits:", err);
      }
    };

    fetchCommits();
  }, [repositories, username]);

  // Format date to relative time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "just now";
    if (diffInSeconds < 3600)
      return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)} days ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 604800)} weeks ago`;
    return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading GitHub data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-4">
          <h3 className="text-lg font-medium text-red-800 mb-2">
            Error Loading Data
          </h3>
          <p className="text-red-700 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
        <div className="flex items-center space-x-3">
          <img
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
            alt="GitHub"
            className="w-8 h-8"
          />
          <div>
            <h1 className="text-xl font-bold text-gray-800">GitHub</h1>
            <p className="text-sm text-gray-600">{username}</p>
          </div>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md text-gray-700"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar for Desktop */}
        <div className="hidden md:flex md:w-64 lg:w-72 xl:w-80 flex-col border-r border-gray-200 bg-gray-50">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
                alt="GitHub"
                className="w-8 h-8"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-800">GitHub</h1>
                <p className="text-sm text-gray-600">{username}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
                SS
              </div>

              <h2 className="text-xl font-bold text-gray-800 text-center">
                Shivam Saxena
              </h2>
              <p className="text-gray-600 text-center mt-2 text-sm">
                Full Stack Developer at IIT Bhubaneswar
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xl font-bold text-gray-800">
                  {stats.totalCommits}
                </div>
                <div className="text-xs text-gray-600">Commits</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xl font-bold text-gray-800">
                  {stats.totalStars}
                </div>
                <div className="text-xs text-gray-600">Stars</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xl font-bold text-gray-800">
                  {stats.totalForks}
                </div>
                <div className="text-xs text-gray-600">Forks</div>
              </div>
              <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                <div className="text-xl font-bold text-gray-800">
                  {stats.contributionsThisYear}
                </div>
                <div className="text-xs text-gray-600">Contributions</div>
              </div>
            </div>

            <button
              onClick={() =>
                window.open(`https://github.com/${username}`, "_blank")
              }
              className="w-full flex items-center justify-center space-x-2 mt-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Open GitHub</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Profile Summary */}
          <div className="md:hidden p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                SS
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-800">
                  Shivam Saxena
                </h2>
                <button
                  onClick={() =>
                    window.open(`https://github.com/${username}`, "_blank")
                  }
                  className="flex items-center space-x-1 mt-1 text-blue-600 text-sm"
                >
                  <span>View Profile</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden bg-gray-50 border-b border-gray-200">
              <div className="grid grid-cols-3 gap-2 p-4 text-center">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-lg font-bold text-gray-800">
                    {stats.totalCommits}
                  </div>
                  <div className="text-xs text-gray-600">Commits</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-lg font-bold text-gray-800">
                    {stats.totalStars}
                  </div>
                  <div className="text-xs text-gray-600">Stars</div>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-lg font-bold text-gray-800">
                    {stats.totalForks}
                  </div>
                  <div className="text-xs text-gray-600">Forks</div>
                </div>
              </div>
              <div className="p-4">
                <button
                  onClick={() =>
                    window.open(`https://github.com/${username}`, "_blank")
                  }
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors text-sm"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open GitHub</span>
                </button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex border-b border-gray-200 overflow-x-auto">
            {["repositories", "commits", "activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium capitalize transition-colors flex-shrink-0 ${
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
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {activeTab === "repositories" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    Repositories ({repositories.length})
                  </h3>
                </div>

                {repositories.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No repositories found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {repositories.map((repo) => (
                      <div
                        key={repo.name}
                        className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
                          <div className="flex items-center space-x-2">
                            <h4
                              className="text-base sm:text-lg font-medium text-blue-600 hover:underline cursor-pointer"
                              onClick={() => window.open(repo.url, "_blank")}
                            >
                              {repo.name}
                            </h4>
                            {repo.isPrivate && (
                              <span className="px-2 py-0.5 bg-gray-200 text-gray-700 text-xs rounded">
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

                        <p className="text-gray-600 mb-3 text-sm sm:text-base">
                          {repo.description}
                        </p>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm text-gray-600 gap-2">
                          <div className="flex items-center space-x-2">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                repo.language === "JavaScript"
                                  ? "bg-yellow-500"
                                  : repo.language === "TypeScript"
                                  ? "bg-blue-500"
                                  : repo.language === "HTML"
                                  ? "bg-red-500"
                                  : repo.language === "CSS"
                                  ? "bg-purple-500"
                                  : "bg-gray-500"
                              }`}
                            ></div>
                            <span>{repo.language}</span>
                          </div>
                          <span className="text-xs sm:text-sm">
                            Updated {repo.updatedAt}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "commits" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Recent Commits
                </h3>

                {commits.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No commits found</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {commits.map((commit) => (
                      <div
                        key={commit.hash}
                        className="flex items-start space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                        onClick={() =>
                          window.open(
                            `https://github.com/${username}/${commit.repository}/commit/${commit.hash}`,
                            "_blank"
                          )
                        }
                      >
                        <GitCommit className="w-5 h-5 text-gray-500 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-800 mb-1 truncate">
                            {commit.message}
                          </p>
                          <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                            <span className="font-mono bg-gray-100 px-2 py-0.5 rounded text-xs truncate">
                              {commit.hash}
                            </span>
                            <span className="truncate">
                              {commit.repository}
                            </span>
                            <span>{commit.time}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "activity" && (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-6">
                  Contribution Activity
                </h3>

                {/* Contribution Graph */}
                <div className="mb-8">
                  <h4 className="text-md font-medium text-gray-700 mb-4">
                    Contributions in the last year
                  </h4>
                  <div className="overflow-x-auto pb-2">
                    <div className="grid grid-cols-53 gap-1 min-w-max">
                      {Array.from({ length: 365 }, (_, i) => {
                        const rand = Math.random();
                        return (
                          <div
                            key={i}
                            className={`w-3 h-3 rounded-sm ${
                              rand > 0.8
                                ? "bg-green-500"
                                : rand > 0.6
                                ? "bg-green-400"
                                : rand > 0.4
                                ? "bg-green-300"
                                : rand > 0.2
                                ? "bg-green-200"
                                : "bg-gray-100"
                            }`}
                          ></div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
                    <span>Less</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-3 h-3 bg-gray-100 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-200 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-sm"></div>
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
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <GitBranch className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="flex-1 min-w-[200px]">
                        Created branch{" "}
                        <code className="bg-gray-100 px-1 rounded text-xs sm:text-sm">
                          feature/auth-improvements
                        </code>{" "}
                        in <strong>UniCom</strong>
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        3 days ago
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <GitCommit className="w-4 h-4 text-blue-500 flex-shrink-0" />
                      <span className="flex-1 min-w-[200px]">
                        Pushed 2 commits to <strong>Rental-Booking</strong>
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        5 days ago
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 flex-shrink-0" />
                      <span className="flex-1 min-w-[200px]">
                        Starred <strong>vercel/next.js</strong>
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        1 week ago
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                      <GitFork className="w-4 h-4 text-purple-500 flex-shrink-0" />
                      <span className="flex-1 min-w-[200px]">
                        Forked <strong>shadcn-ui/ui</strong>
                      </span>
                      <span className="text-gray-500 text-xs sm:text-sm">
                        2 weeks ago
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
