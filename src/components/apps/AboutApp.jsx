"use client";

import { useState } from "react";
import {
  User,
  GraduationCap,
  Code2,
  FolderGit2,
  FileText,
  Heart,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function PortfolioLayout() {
  const [activeSection, setActiveSection] = useState("about");
  const [showResume, setShowResume] = useState(false);
  const [resumePage, setResumePage] = useState(1);

  const resumeUrl = "/Shivam_Inter_IIT14_0 (1).pdf";

  const handleResumeNavigation = (direction) => {
    if (direction === "prev" && resumePage > 1) {
      setResumePage(resumePage - 1);
    } else if (direction === "next" && resumePage < 2) {
      setResumePage(resumePage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-blue-900 to-indigo-900 text-white flex flex-col">
        <div className="p-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Shivam Saxena</h1>
          <p className="text-blue-200 text-sm">
            Electrical Engineering Student
          </p>
        </div>

        <nav className="flex-1 py-4">
          <button
            className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
              activeSection === "about"
                ? "bg-blue-600 text-white"
                : "text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => setActiveSection("about")}
          >
            <User className="w-5 h-5 mr-3" />
            <span>About Shivam</span>
          </button>

          <button
            className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
              activeSection === "education"
                ? "bg-blue-600 text-white"
                : "text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => setActiveSection("education")}
          >
            <GraduationCap className="w-5 h-5 mr-3" />
            <span>Education</span>
          </button>

          <button
            className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
              activeSection === "skills"
                ? "bg-blue-600 text-white"
                : "text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => setActiveSection("skills")}
          >
            <Code2 className="w-5 h-5 mr-3" />
            <span>Skills</span>
          </button>

          <button
            className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
              activeSection === "projects"
                ? "bg-blue-600 text-white"
                : "text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => setActiveSection("projects")}
          >
            <FolderGit2 className="w-5 h-5 mr-3" />
            <span>Projects</span>
          </button>

          <button
            className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
              activeSection === "resume"
                ? "bg-blue-600 text-white"
                : "text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => {
              setActiveSection("resume");
              setShowResume(true);
            }}
          >
            <FileText className="w-5 h-5 mr-3" />
            <span>Resume</span>
          </button>

          <button
            className={`flex items-center w-full px-4 py-3 text-left transition-colors ${
              activeSection === "achievements"
                ? "bg-blue-600 text-white"
                : "text-blue-100 hover:bg-blue-800/50"
            }`}
            onClick={() => setActiveSection("achievements")}
          >
            <Heart className="w-5 h-5 mr-3" />
            <span>Achievements</span>
          </button>
        </nav>

        <div className="p-4 border-t border-blue-800 text-sm text-blue-200">
          <p>© 2024 Shivam Saxena</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {/* About Section */}
        {activeSection === "about" && (
          <div className="p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-4xl font-bold">
                    SS
                  </div>
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">
                    Shivam Saxena
                  </h1>
                  <p className="text-gray-600 mb-4">
                    Electrical Engineering Student | Full Stack Developer
                  </p>

                  <div className="flex justify-center space-x-4 mb-6">
                    <a
                      href="https://github.com/Saxena-Shivam"
                      target="_blank"
                      className="text-gray-600 hover:text-gray-900 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/shivam-saxena-aa8754289/"
                      target="_blank"
                      className="text-gray-600 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:24ee01074@iitbbs.ac.in"
                      className="text-gray-600 hover:text-red-600 transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="space-y-6">
                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      About Me
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Electrical Engineering student at IIT Bhubaneswar
                      passionate about full-stack development. I specialize in
                      building efficient web applications using modern
                      technologies like React, Node.js, and MongoDB. With
                      competitive programming experience and problem-solving
                      skills, I create innovative solutions that enhance user
                      experiences.
                    </p>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Contact Information
                    </h2>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>IIT Bhubaneswar, Odisha, India</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>24ee01074@iitbbs.ac.in</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>(+91) 9507250528</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>
                          Available for internships and collaborations
                        </span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Competitive Programming
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800">
                          LeetCode
                        </h3>
                        <p className="text-blue-600">Max Rating: 1630</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800">
                          CodeChef
                        </h3>
                        <p className="text-green-600">Max Rating: 1493</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800">
                          CodeForces
                        </h3>
                        <p className="text-purple-600">Max Rating: 1112</p>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeSection === "education" && (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Education</h1>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      B.Tech in Electrical Engineering
                    </h2>
                    <p className="text-gray-600">
                      Indian Institute of Technology Bhubaneswar
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      2024 - 2028 • CGPA: 8.62
                    </p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Current
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Intermediate (12th standard)
                    </h2>
                    <p className="text-gray-600">Param Gyan Niketan</p>
                    <p className="text-sm text-gray-500 mt-1">
                      2023 • Percentage: 89.2%
                    </p>
                  </div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Completed
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Secondary School Certificate (10th standard)
                    </h2>
                    <p className="text-gray-600">Manas Prabha Public School</p>
                    <p className="text-sm text-gray-500 mt-1">
                      2021 • Percentage: 85.8%
                    </p>
                  </div>
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Technical Skills
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Programming Languages
                </h2>
                <div className="flex flex-wrap gap-2">
                  {["C++", "C", "JavaScript", "Python"].map((skill) => (
                    <span
                      key={skill}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Web Development
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Next.js",
                    "React.js",
                    "Express.js",
                    "Node.js",
                    "Tailwind",
                    "CSS",
                    "HTML",
                    "Servlet",
                    "JSP",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Databases & Tools
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "MySQL",
                    "MongoDB",
                    "VS Code",
                    "Git",
                    "Postman",
                    "Dev C++",
                    "Remix IDE",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Other Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Matlab",
                    "Logisim",
                    "EMU8086",
                    "Object Oriented Programming",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Projects</h1>

            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      UniCom Project
                    </h2>
                    <p className="text-gray-600">
                      Full-stack communication platform
                    </p>
                  </div>
                </div>
                <ul className="mt-3 text-gray-600 space-y-2 list-disc pl-5">
                  <li>
                    Requestor/Receiver app with authentication and real-time
                    status tracking
                  </li>
                  <li>
                    Automated email reminders using Node-cron and Nodemailer
                  </li>
                  <li>
                    Responsive UI with role-based dashboards in React and
                    Tailwind CSS
                  </li>
                  <li>
                    Optimized database schema for efficient storage and
                    retrieval
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    React
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Node.js
                  </span>
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    MongoDB
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Rental Booking Platform
                    </h2>
                    <p className="text-gray-600">Property rental solution</p>
                  </div>
                </div>
                <ul className="mt-3 text-gray-600 space-y-2 list-disc pl-5">
                  <li>
                    Full-stack property rental platform with authentication
                  </li>
                  <li>Booking management and wishlist features</li>
                  <li>
                    Advanced search, filtering, and interactive map for property
                    discovery
                  </li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Next.js
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    Express
                  </span>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                    MySQL
                  </span>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Campus Groceries (Team Project)
                    </h2>
                    <p className="text-gray-600">
                      College-focused grocery solution
                    </p>
                  </div>
                </div>
                <ul className="mt-3 text-gray-600 space-y-2 list-disc pl-5">
                  <li>
                    Intuitive grocery browsing interface optimized for college
                    campuses
                  </li>
                  <li>Seamless ordering experience</li>
                  <li>Real-time order tracking for enhanced user experience</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    React
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Node.js
                  </span>
                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                    Firebase
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resume Section */}
        {activeSection === "resume" && (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Resume</h1>

            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="text-center mb-8">
                <FileText className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                <p className="text-gray-600 max-w-2xl mx-auto">
                  View or download my complete resume for detailed information
                  about my education, skills, projects, and achievements.
                </p>
              </div>

              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <button
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
                  onClick={() => setShowResume(true)}
                >
                  <FileText className="w-5 h-5 mr-2" />
                  <span>View Resume</span>
                </button>

                <a
                  href={resumeUrl}
                  download="Shivam_Saxena_Resume.pdf"
                  className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>Download Resume</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === "achievements" && (
          <div className="p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Achievements & Activities
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Certifications
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      PitchTember'24, Incubation Centre
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">Byteverse Hackathon</span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-blue-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      Winner Webthon, General Championship'25
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Positions of Responsibility
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      Member, Web and Design Society, IIT Bhubaneswar
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      Member, Neuromancers, IIT Bhubaneswar
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-green-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      Organizing Committee, Code Relay 3.0, IIT Bhubaneswar
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-6 md:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Extra-Curricular Activities
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      Approached judges and mentors to ensure expert evaluation
                      and guidance for Code Relay 3.0
                    </span>
                  </li>
                  <li className="flex items-start">
                    <div className="bg-purple-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-purple-600"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <span className="text-gray-600">
                      Coordinated sponsorship outreach and public engagement to
                      enhance event visibility and participation
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Resume PDF Viewer Modal */}
      {showResume && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                Shivam Saxena - Resume
              </h2>
              <button
                onClick={() => setShowResume(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {/* Simulated PDF Viewer */}
              <div className="bg-gray-100 border border-gray-300 rounded-lg w-full min-h-[70vh] flex flex-col">
                {/* PDF Navigation */}
                <div className="flex justify-between items-center p-3 bg-gray-200 border-b border-gray-300">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleResumeNavigation("prev")}
                      disabled={resumePage === 1}
                      className={`p-1 rounded ${
                        resumePage === 1
                          ? "text-gray-400"
                          : "text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleResumeNavigation("next")}
                      disabled={resumePage === 2}
                      className={`p-1 rounded ${
                        resumePage === 2
                          ? "text-gray-400"
                          : "text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="text-sm text-gray-600">
                    Page {resumePage} of 2
                  </div>
                  <div>
                    <a
                      href={resumeUrl}
                      download="Shivam_Saxena_Resume.pdf"
                      className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Download
                    </a>
                  </div>
                </div>

                {/* PDF Content */}
                <div className="flex-1 overflow-auto p-4 bg-white">
                  {resumePage === 1 ? (
                    <div className="font-sans text-gray-800">
                      <div className="text-center mb-6">
                        <h1 className="text-3xl font-bold">Shivam Saxena</h1>
                        <div className="flex justify-center items-center flex-wrap gap-4 mt-2 text-gray-600">
                          <span>Email: 24ee01074@iitbbs.ac.in</span>
                          <span>GitHub: github.com/Saxena-Shivam</span>
                          <span>
                            LinkedIn: linkedin.com/in/shivam-saxena-aa8754289/
                          </span>
                          <span>Phone: (+91) 9507250528</span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">
                          Education
                        </h2>
                        <table className="w-full border-collapse">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="border border-gray-300 p-2 text-left">
                                Year
                              </th>
                              <th className="border border-gray-300 p-2 text-left">
                                Degree/Examination
                              </th>
                              <th className="border border-gray-300 p-2 text-left">
                                University/Board
                              </th>
                              <th className="border border-gray-300 p-2 text-left">
                                %/CGPA
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="border border-gray-300 p-2">
                                2028*
                              </td>
                              <td className="border border-gray-300 p-2">
                                Electrical Engineering
                              </td>
                              <td className="border border-gray-300 p-2">
                                Indian Institute of Technology Bhubaneswar
                              </td>
                              <td className="border border-gray-300 p-2">
                                8.62
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">
                                2023
                              </td>
                              <td className="border border-gray-300 p-2">
                                Intermediate (12th standard)
                              </td>
                              <td className="border border-gray-300 p-2">
                                Param Gyan Niketan
                              </td>
                              <td className="border border-gray-300 p-2">
                                89.2%
                              </td>
                            </tr>
                            <tr>
                              <td className="border border-gray-300 p-2">
                                2021
                              </td>
                              <td className="border border-gray-300 p-2">
                                Secondary School Certificate (10th standard)
                              </td>
                              <td className="border border-gray-300 p-2">
                                Manas Prabha Public School
                              </td>
                              <td className="border border-gray-300 p-2">
                                85.8%
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div className="mb-6">
                        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">
                          Projects
                        </h2>
                        <div className="mb-4">
                          <h3 className="font-bold">UniCom Project</h3>
                          <ul className="list-disc pl-5 mt-1">
                            <li>
                              Full-stack app for Requestors and Receivers with
                              auth and real-time status tracking
                            </li>
                            <li>
                              Features automated email reminders for pending
                              requests using Node-cron and Nodemailer
                            </li>
                            <li>
                              Responsive UI with role-based dashboards built in
                              React and Tailwind CSS
                            </li>
                            <li>
                              Optimized database schema for efficient storage
                              and retrieval
                            </li>
                          </ul>
                        </div>

                        <div className="mb-4">
                          <h3 className="font-bold">Rental Booking</h3>
                          <ul className="list-disc pl-5 mt-1">
                            <li>
                              Developed a full-stack property rental platform
                              with authentication, booking, and wishlist
                              features
                            </li>
                            <li>
                              Implemented search, filtering, and an interactive
                              map for seamless property discovery
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="font-sans text-gray-800">
                      <div className="mb-6">
                        <h3 className="font-bold">
                          Campus Groceries: (Team Project)
                        </h3>
                        <ul className="list-disc pl-5 mt-1">
                          <li>
                            Designed an intuitive grocery browsing interface
                            with seamless ordering optimized for college
                            campuses
                          </li>
                          <li>
                            Developed real-time order tracking for an enhanced
                            user experience
                          </li>
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h3 className="font-bold">
                          Hello College : (Team Project)
                        </h3>
                        <ul className="list-disc pl-5 mt-1">
                          <li>
                            Developed a user-friendly full-stack website to
                            solve user problems and foster a student community
                          </li>
                          <li>
                            Integrated study materials, resources, and
                            interactive forums for student engagement
                          </li>
                        </ul>
                      </div>

                      <div className="mb-6">
                        <h2 className="text-xl font-bold border-b border-gray-300 pb-2 mb-3">
                          Technical Skills
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="font-bold">
                              Programming Languages:
                            </h3>
                            <p>C++, C, Javascript, Python</p>
                          </div>
                          <div>
                            <h3 className="font-bold">Developer Tools:</h3>
                            <p>
                              VS Code, Dev C++, Atom, Hyper, Git Bash, Remix
                              IDE, Postman
                            </p>
                          </div>
                          <div>
                            <h3 className="font-bold">Web Development:</h3>
                            <p>
                              Next.js, React.js, Express.js, Node.js,
                              Javascript, Tailwind, CSS, HTML, Servlet, JSP
                            </p>
                          </div>
                          <div>
                            <h3 className="font-bold">Databases:</h3>
                            <p>MySQL, MongoDB</p>
                          </div>
                          <div>
                            <h3 className="font-bold">Coursework:</h3>
                            <p>Object Oriented Programming</p>
                          </div>
                          <div>
                            <h3 className="font-bold">Other:</h3>
                            <p>Matlab, Logisim, EMU8086</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
