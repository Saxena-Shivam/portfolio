"use client";

import { useState, useEffect } from "react";
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
  ExternalLink,
  Menu,
  X,
} from "lucide-react";

// Tech icons import
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMysql,
  SiPython,
  SiCplusplus,
  SiGit,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiFirebase,
} from "react-icons/si";

export default function PortfolioLayout() {
  const [activeSection, setActiveSection] = useState("about");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="min-h-screen h-screen bg-white flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-gradient-to-r from-indigo-800 to-indigo-900 text-white p-4 flex items-center justify-between sticky top-0 z-20 shadow-lg">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-1 rounded-md hover:bg-indigo-700 transition-colors"
        >
          {isSidebarOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
        <h1 className="text-xl font-bold">Shivam Saxena</h1>
        <div className="w-6"></div>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-10 bg-gradient-to-b from-indigo-800 to-indigo-900 text-white transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition-transform duration-300 md:w-64 flex flex-col shadow-2xl`}
      >
        <div className="p-4 border-b border-indigo-700">
          <h1 className="text-xl font-bold">Shivam Saxena</h1>
          <p className="text-indigo-200 text-sm">
            Electrical Engineering Student
          </p>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {[
            { id: "about", icon: User, label: "About Shivam" },
            { id: "education", icon: GraduationCap, label: "Education" },
            { id: "skills", icon: Code2, label: "Skills" },
            { id: "projects", icon: FolderGit2, label: "Projects" },
            { id: "resume", icon: FileText, label: "Resume" },
            { id: "achievements", icon: Heart, label: "Achievements" },
          ].map((item) => (
            <button
              key={item.id}
              className={`flex items-center w-full px-4 py-3 text-left transition-all duration-300 ${
                activeSection === item.id
                  ? "bg-indigo-600 text-white shadow-inner"
                  : "text-indigo-100 hover:bg-indigo-700/70"
              }`}
              onClick={() => {
                setActiveSection(item.id);
                if (isMobile) setIsSidebarOpen(false);
              }}
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-indigo-800 text-sm text-indigo-200">
          <p>© 2024 Shivam Saxena</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto h-screen bg-white">
        {/* About Section */}
        {activeSection === "about" && (
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              <div className="md:w-1/3">
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 flex items-center justify-center overflow-hidden rounded-full border-4 border-indigo-200 shadow-xl">
                    <div className="bg-gradient-to-br from-indigo-400 to-indigo-600 w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                      SS
                    </div>
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
                      className="text-gray-600 hover:text-gray-900 transition-colors bg-gray-100 p-2 rounded-full shadow-sm hover:shadow-lg"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                    <a
                      href="https://linkedin.com/in/shivam-saxena-aa8754289/"
                      target="_blank"
                      className="text-gray-600 hover:text-blue-700 transition-colors bg-gray-100 p-2 rounded-full shadow-sm hover:shadow-lg"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                      href="mailto:24ee01074@iitbbs.ac.in"
                      className="text-gray-600 hover:text-red-600 transition-colors bg-gray-100 p-2 rounded-full shadow-sm hover:shadow-lg"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3">
                <div className="space-y-6">
                  <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      About Me
                    </h2>
                    <p className="text-gray-600 leading-relaxed">
                      Electrical Engineering student at IIT Bhubaneswar
                      passionate about full-stack development. I build efficient
                      web applications using modern technologies like React,
                      Node.js, and MongoDB. With competitive programming
                      experience, I create innovative solutions that enhance
                      user experiences.
                    </p>
                  </section>

                  <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Contact Information
                    </h2>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                        <span>IIT Bhubaneswar, Odisha, India</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Mail className="w-4 h-4 text-indigo-600" />
                        <span>24ee01074@iitbbs.ac.in</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Phone className="w-4 h-4 text-indigo-600" />
                        <span>(+91) 9507250528</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Calendar className="w-4 h-4 text-indigo-600" />
                        <span>
                          Available for internships and collaborations
                        </span>
                      </div>
                    </div>
                  </section>

                  <section className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-xl font-semibold text-gray-800 mb-3">
                      Competitive Programming
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 hover:shadow-lg transition-shadow shadow-sm">
                        <h3 className="font-semibold text-gray-800">
                          LeetCode
                        </h3>
                        <p className="text-blue-600 font-medium">
                          Max Rating: 1630
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg border border-green-100 hover:shadow-lg transition-shadow shadow-sm">
                        <h3 className="font-semibold text-gray-800">
                          CodeChef
                        </h3>
                        <p className="text-green-600 font-medium">
                          Max Rating: 1493
                        </p>
                      </div>
                      <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-lg border border-purple-100 hover:shadow-lg transition-shadow shadow-sm">
                        <h3 className="font-semibold text-gray-800">
                          CodeForces
                        </h3>
                        <p className="text-purple-600 font-medium">
                          Max Rating: 1112
                        </p>
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
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Education</h1>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                  <div className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    Current
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    Completed
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium shadow-sm">
                    Completed
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === "skills" && (
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Technical Skills
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-indigo-600" />
                  Programming Languages
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      name: "C++",
                      icon: <SiCplusplus className="w-5 h-5 text-blue-600" />,
                    },
                    {
                      name: "C",
                      icon: <SiCplusplus className="w-5 h-5 text-blue-600" />,
                    },
                    {
                      name: "JavaScript",
                      icon: (
                        <SiJavascript className="w-5 h-5 text-yellow-500" />
                      ),
                    },
                    {
                      name: "Python",
                      icon: <SiPython className="w-5 h-5 text-blue-500" />,
                    },
                  ].map((skill) => (
                    <span
                      key={skill.name}
                      className="bg-gray-50 text-gray-800 px-3 py-2 rounded-lg text-sm flex items-center gap-2 border border-gray-200 hover:shadow-md transition-all"
                    >
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <SiReact className="w-5 h-5 mr-2 text-blue-500" />
                  Web Development
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      name: "Next.js",
                      icon: <SiNextdotjs className="w-5 h-5 text-black" />,
                    },
                    {
                      name: "React.js",
                      icon: <SiReact className="w-5 h-5 text-blue-500" />,
                    },
                    {
                      name: "Express.js",
                      icon: <SiExpress className="w-5 h-5 text-green-600" />,
                    },
                    {
                      name: "Node.js",
                      icon: <SiNodedotjs className="w-5 h-5 text-green-600" />,
                    },
                    {
                      name: "Tailwind",
                      icon: <SiTailwindcss className="w-5 h-5 text-blue-400" />,
                    },
                    {
                      name: "HTML",
                      icon: <SiHtml5 className="w-5 h-5 text-orange-500" />,
                    },
                    {
                      name: "CSS",
                      icon: <SiCss3 className="w-5 h-5 text-blue-500" />,
                    },
                  ].map((skill) => (
                    <span
                      key={skill.name}
                      className="bg-gray-50 text-gray-800 px-3 py-2 rounded-lg text-sm flex items-center gap-2 border border-gray-200 hover:shadow-md transition-all"
                    >
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <SiMongodb className="w-5 h-5 mr-2 text-green-500" />
                  Databases & Tools
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      name: "MySQL",
                      icon: <SiMysql className="w-5 h-5 text-blue-600" />,
                    },
                    {
                      name: "MongoDB",
                      icon: <SiMongodb className="w-5 h-5 text-green-500" />,
                    },
                    {
                      name: "Git",
                      icon: <SiGit className="w-5 h-5 text-orange-600" />,
                    },
                    {
                      name: "Firebase",
                      icon: <SiFirebase className="w-5 h-5 text-yellow-500" />,
                    },
                  ].map((skill) => (
                    <span
                      key={skill.name}
                      className="bg-gray-50 text-gray-800 px-3 py-2 rounded-lg text-sm flex items-center gap-2 border border-gray-200 hover:shadow-md transition-all"
                    >
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <Code2 className="w-5 h-5 mr-2 text-indigo-600" />
                  Other Skills
                </h2>
                <div className="flex flex-wrap gap-3">
                  {[
                    {
                      name: "Matlab",
                      icon: <SiCplusplus className="w-5 h-5 text-blue-600" />,
                    },
                    {
                      name: "Logisim",
                      icon: <Code2 className="w-5 h-5 text-gray-600" />,
                    },
                    {
                      name: "EMU8086",
                      icon: <Code2 className="w-5 h-5 text-gray-600" />,
                    },
                    {
                      name: "OOP",
                      icon: <Code2 className="w-5 h-5 text-gray-600" />,
                    },
                  ].map((skill) => (
                    <span
                      key={skill.name}
                      className="bg-gray-50 text-gray-800 px-3 py-2 rounded-lg text-sm flex items-center gap-2 border border-gray-200 hover:shadow-md transition-all"
                    >
                      {skill.icon}
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === "projects" && (
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Projects</h1>

            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500 hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                  <li>Responsive UI with role-based dashboards</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    {
                      name: "React",
                      icon: <SiReact className="w-4 h-4 text-blue-500" />,
                    },
                    {
                      name: "Node.js",
                      icon: <SiNodedotjs className="w-4 h-4 text-green-600" />,
                    },
                    {
                      name: "MongoDB",
                      icon: <SiMongodb className="w-4 h-4 text-green-500" />,
                    },
                    {
                      name: "Express",
                      icon: <SiExpress className="w-4 h-4 text-gray-800" />,
                    },
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="bg-gray-50 text-gray-800 px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-gray-200"
                    >
                      {tech.icon}
                      {tech.name}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Saxena-Shivam/ARC_Task"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    <span>GitHub Repo</span>
                  </a>
                  <a
                    href="https://arc-woad-kappa.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500 hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                  <li>Advanced search, filtering, and interactive map</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    {
                      name: "Next.js",
                      icon: <SiNextdotjs className="w-4 h-4 text-black" />,
                    },
                    {
                      name: "Express",
                      icon: <SiExpress className="w-4 h-4 text-gray-800" />,
                    },
                    {
                      name: "MySQL",
                      icon: <SiMysql className="w-4 h-4 text-blue-600" />,
                    },
                    {
                      name: "Tailwind",
                      icon: <SiTailwindcss className="w-4 h-4 text-blue-400" />,
                    },
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="bg-gray-50 text-gray-800 px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-gray-200"
                    >
                      {tech.icon}
                      {tech.name}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Saxena-Shivam/Airbnb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    <span>GitHub Repo</span>
                  </a>
                  <a
                    href="#"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500 hover:shadow-xl transition-all duration-300 border border-gray-100">
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
                    Intuitive grocery browsing interface for college campuses
                  </li>
                  <li>Seamless ordering experience</li>
                  <li>Real-time order tracking</li>
                </ul>
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    {
                      name: "React",
                      icon: <SiReact className="w-4 h-4 text-blue-500" />,
                    },
                    {
                      name: "Node.js",
                      icon: <SiNodedotjs className="w-4 h-4 text-green-600" />,
                    },
                    {
                      name: "Firebase",
                      icon: <SiFirebase className="w-4 h-4 text-yellow-500" />,
                    },
                    {
                      name: "CSS",
                      icon: <SiCss3 className="w-4 h-4 text-blue-500" />,
                    },
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className="bg-gray-50 text-gray-800 px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-gray-200"
                    >
                      {tech.icon}
                      {tech.name}
                    </span>
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="https://github.com/Varshitcode14/Grocto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                  >
                    <Github className="w-4 h-4 mr-2" />
                    <span>GitHub Repo</span>
                  </a>
                  <a
                    href="https://grocto-frontend.onrender.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-md hover:shadow-lg"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resume Section */}
        {activeSection === "resume" && (
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Resume</h1>

            <div className="bg-white rounded-lg shadow-lg p-4 md:p-8 border border-gray-100">
              <div className="bg-gray-50 border border-gray-200 rounded-lg w-full min-h-[50vh]">
                <iframe
                  src="/Shivam_Inter_IIT14_0 (1).pdf"
                  className="w-full h-full min-h-[50vh]"
                  frameBorder="0"
                >
                  <p className="p-4 text-center text-gray-600">
                    Your browser does not support PDFs.
                    <a
                      href="/Shivam_Inter_IIT14_0 (1).pdf"
                      className="text-blue-600 hover:underline ml-1"
                      download
                    >
                      Download the resume instead
                    </a>
                  </p>
                </iframe>
              </div>

              <div className="mt-6 flex justify-center">
                <a
                  href="/Shivam_Inter_IIT14_0 (1).pdf"
                  download="Shivam_Saxena_Resume.pdf"
                  className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center shadow-md hover:shadow-lg"
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
                  <span>Download</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Achievements Section */}
        {activeSection === "achievements" && (
          <div className="p-4 md:p-6 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">
              Achievements & Activities
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-indigo-600" />
                  Certifications
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
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
                  <li className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
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
                  <li className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
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

              <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-indigo-600" />
                  Positions of Responsibility
                </h2>
                <ul className="space-y-3">
                  <li className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
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
                  <li className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
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
                  <li className="flex items-start p-3 rounded-lg hover:bg-indigo-50 transition-colors">
                    <div className="bg-indigo-100 p-2 rounded-full mr-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-indigo-600"
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
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
