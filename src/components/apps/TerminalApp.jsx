"use client";

import { useState, useEffect, useRef } from "react";

export default function TerminalApp() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([
    "Shivam's Portfolio Terminal v2.0.0",
    'Type "help" for available commands.',
    "",
  ]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [currentDirectory, setCurrentDirectory] = useState("~/portfolio");
  const [gitRepo, setGitRepo] = useState(null);
  const inputRef = useRef(null);
  const terminalRef = useRef(null);

  const commands = {
    help: () => [
      "Available commands:",
      "",
      "System Commands:",
      "  help     - Show this help message",
      "  clear    - Clear terminal",
      "  date     - Show current date",
      "  whoami   - Show current user",
      "  pwd      - Print working directory",
      "  ls       - List directory contents",
      "  cd       - Change directory",
      "  cat      - Display file contents",
      "  mkdir    - Create directory",
      "  touch    - Create file",
      "  rm       - Remove file/directory",
      "",
      "Git Commands:",
      "  git init    - Initialize git repository",
      "  git status  - Show git status",
      "  git add     - Add files to staging",
      "  git commit  - Commit changes",
      "  git log     - Show commit history",
      "  git branch  - List/create branches",
      "  git push    - Push to remote",
      "  git pull    - Pull from remote",
      "",
      "Portfolio Commands:",
      "  about    - About me",
      "  skills   - My technical skills",
      "  projects - My projects",
      "  contact  - Contact information",
      "",
    ],

    clear: () => {
      setHistory([]);
      return [];
    },

    date: () => [new Date().toString(), ""],

    whoami: () => ["Shivam Saxena", ""],

    pwd: () => [currentDirectory, ""],

    ls: (args) => {
      const showHidden = args.includes("-a");
      const longFormat = args.includes("-l");

      const items = ["README.md", "package.json", "src/"];
      if (showHidden) {
        items.unshift(".git/");
      }

      if (longFormat) {
        return [
          "total 4",
          "drwxr-xr-x  3 shivam shivam 4096 May 27 10:00 .",
          "drwxr-xr-x  5 shivam shivam 4096 May 27 09:30 ..",
          "-rw-r--r--  1 shivam shivam  156 May 27 10:00 README.md",
          "-rw-r--r--  1 shivam shivam   89 May 27 09:45 package.json",
          "drwxr-xr-x  3 shivam shivam 4096 May 27 10:15 src",
          ...(showHidden
            ? ["drwxr-xr-x  8 shivam shivam 4096 May 27 10:20 .git"]
            : []),
          "",
        ];
      }

      return [items.join("  "), ""];
    },

    cd: (args) => {
      const target = args[0] || "~";
      if (target === "..") {
        const parts = currentDirectory.split("/");
        if (parts.length > 1) {
          parts.pop();
          setCurrentDirectory(parts.join("/") || "~");
        }
      } else if (target === "~") {
        setCurrentDirectory("~/portfolio");
      } else {
        setCurrentDirectory(`${currentDirectory}/${target}`.replace("//", "/"));
      }
      return [""];
    },

    cat: (args) => {
      const filename = args[0];
      if (!filename) return ["cat: missing file operand", ""];

      if (filename === "README.md") {
        return [
          "# Portfolio Project",
          "",
          "This is Shivam Saxena's portfolio website built with Vite and React.",
          "",
        ];
      } else if (filename === "package.json") {
        return [
          "{",
          '  "name": "shivam-portfolio",',
          '  "version": "1.0.0",',
          '  "scripts": {',
          '    "dev": "vite",',
          '    "build": "vite build"',
          "  }",
          "}",
          "",
        ];
      }

      return [`cat: ${filename}: No such file or directory`, ""];
    },

    mkdir: (args) => {
      const dirname = args[0];
      if (!dirname) return ["mkdir: missing operand", ""];
      return [`mkdir: created directory '${dirname}'`, ""];
    },

    touch: (args) => {
      const filename = args[0];
      if (!filename) return ["touch: missing file operand", ""];
      return [`touch: created file '${filename}'`, ""];
    },

    rm: (args) => {
      const filename = args[0];
      if (!filename) return ["rm: missing operand", ""];
      return [`rm: removed '${filename}'`, ""];
    },

    git: (args) => {
      const subcommand = args[0];

      switch (subcommand) {
        case "init":
          setGitRepo({ branch: "main", commits: [], staged: [], modified: [] });
          return [
            "Initialized empty Git repository in " +
              currentDirectory +
              "/.git/",
            "",
          ];

        case "status":
          if (!gitRepo) return ["fatal: not a git repository", ""];
          return [
            "On branch " + gitRepo.branch,
            "",
            "Changes not staged for commit:",
            '  (use "git add <file>..." to update what will be committed)',
            "",
            "\tmodified:   README.md",
            "\tmodified:   src/App.jsx",
            "",
            "Untracked files:",
            '  (use "git add <file>..." to include in what will be committed)',
            "",
            "\tnew-feature.js",
            "",
          ];

        case "add": {
          if (!gitRepo) return ["fatal: not a git repository", ""];
          const file = args[1] || ".";
          return [`Added ${file} to staging area`, ""];
        }

        case "commit": {
          if (!gitRepo) return ["fatal: not a git repository", ""];
          const message = args.slice(2).join(" ") || "Initial commit";
          const commitHash = Math.random().toString(36).substring(2, 8);
          return [
            `[main ${commitHash}] ${message}`,
            " 2 files changed, 15 insertions(+), 3 deletions(-)",
            " create mode 100644 new-feature.js",
            "",
          ];
        }

        case "log":
          if (!gitRepo) return ["fatal: not a git repository", ""];
          return [
            "commit a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0 (HEAD -> main)",
            "Author: Shivam Saxena <24ee01074@iitbbs.ac.in>",
            "Date:   Mon May 27 10:30:00 2024 -0700",
            "",
            "    Add new portfolio features",
            "",
            "commit b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0a1",
            "Author: Shivam Saxena <24ee01074@iitbbs.ac.in>",
            "Date:   Sun May 26 15:20:00 2024 -0700",
            "",
            "    Initial commit",
            "",
          ];

        case "branch":
          if (!gitRepo) return ["fatal: not a git repository", ""];
          return ["* main", "  feature/new-ui", "  hotfix/bug-fix", ""];

        case "push":
          if (!gitRepo) return ["fatal: not a git repository", ""];
          return [
            "Enumerating objects: 5, done.",
            "Counting objects: 100% (5/5), done.",
            "Delta compression using up to 8 threads",
            "Compressing objects: 100% (3/3), done.",
            "Writing objects: 100% (3/3), 1.2 KiB | 1.2 MiB/s, done.",
            "Total 3 (delta 1), reused 0 (delta 0)",
            "To github.com:Saxena-Shivam/portfolio.git",
            "   a1b2c3d..b2c3d4e  main -> main",
            "",
          ];

        case "pull":
          if (!gitRepo) return ["fatal: not a git repository", ""];
          return [
            "remote: Enumerating objects: 3, done.",
            "remote: Counting objects: 100% (3/3), done.",
            "remote: Total 3 (delta 0), reused 0 (delta 0), pack-reused 0",
            "Unpacking objects: 100% (3/3), done.",
            "From github.com:Saxena-Shivam/portfolio",
            "   b2c3d4e..c3d4e5f  main     -> origin/main",
            "Updating b2c3d4e..c3d4e5f",
            "Fast-forward",
            " README.md | 2 +-",
            " 1 file changed, 1 insertion(+), 1 deletion(-)",
            "",
          ];

        default:
          return [
            `git: '${subcommand}' is not a git command. See 'git --help'.`,
            "",
          ];
      }
    },

    about: () => [
      "Shivam Saxena - Electrical Engineering Student",
      "",
      "Pursuing B.Tech in Electrical Engineering at IIT Bhubaneswar (2028*)",
      "Passionate full-stack developer with experience in building web applications",
      "and solving real-world problems through technology.",
      "",
      "Education:",
      "  ├── B.Tech Electrical Engineering, IIT Bhubaneswar - 8.62 CGPA",
      "  ├── Intermediate (12th), Param Gyan Niketan - 89.2%",
      "  └── Secondary (10th), Manas Prabha Public School - 85.8%",
      "",
      "Current Focus: Full-stack development with React, Node.js, and modern web technologies",
      "",
    ],

    skills: () => [
      "Technical Skills:",
      "",
      "Programming Languages:",
      "  ├── C++",
      "  ├── C",
      "  ├── JavaScript",
      "  └── Python",
      "",
      "Web Development:",
      "  ├── Next.js",
      "  ├── React.js",
      "  ├── Express.js",
      "  ├── Node.js",
      "  ├── Tailwind CSS",
      "  ├── HTML/CSS",
      "  ├── Servlet",
      "  └── JSP",
      "",
      "Databases:",
      "  ├── MySQL",
      "  └── MongoDB",
      "",
      "Developer Tools:",
      "  ├── VS Code",
      "  ├── Git",
      "  ├── Postman",
      "  ├── Remix IDE",
      "  └── Dev C++",
      "",
      "Other:",
      "  ├── MATLAB",
      "  ├── Logisim",
      "  └── EMU8086",
      "",
      "Coursework:",
      "  ├── Object Oriented Programming",
      "  └── Digital Logic Design",
      "",
    ],

    projects: () => [
      "Featured Projects:",
      "",
      "1. UniCom Project",
      "   ├── Full-stack app for Requestors and Receivers with auth",
      "   ├── Features: Real-time status tracking, automated email reminders",
      "   └── Tech: React, Tailwind CSS, Node.js, MongoDB",
      "",
      "2. Rental Booking Platform",
      "   ├── Property rental platform with authentication and booking",
      "   ├── Features: Wishlist, search filtering, interactive map",
      "   └── Tech: MERN Stack (MongoDB, Express, React, Node.js)",
      "",
      "3. Campus Groceries (Team Project)",
      "   ├── Grocery platform optimized for college campuses",
      "   ├── Features: Intuitive browsing, real-time order tracking",
      "   └── Tech: React, Node.js, MongoDB",
      "",
      "4. Hello College (Team Project)",
      "   ├── Student community platform with resources and forums",
      "   ├── Features: Study materials, interactive forums",
      "   └── Tech: MERN Stack",
      "",
      "Achievements:",
      "  ├── Winner Webthon, General Championship'25",
      "  ├── PitchTember'24, Incubation Centre",
      "  └── Byteverse Hackathon participant",
      "",
      "Visit: github.com/Saxena-Shivam for more projects",
      "",
    ],

    contact: () => [
      "Contact Information:",
      "",
      "📧 Email: 24ee01074@iitbbs.ac.in",
      "🐙 GitHub: github.com/Saxena-Shivam",
      "💼 LinkedIn: linkedin.com/in/shivam-saxena-aa8754289/",
      "📱 Phone: (+91) 9507250528",
      "",
      "Positions of Responsibility:",
      "  ├── Member, Web and Design Society, IIT Bhubaneswar",
      "  ├── Member, Neuromancers, IIT Bhubaneswar",
      "  └── Organizing Committee, Code Relay 3.0, IIT Bhubaneswar",
      "",
      "Competitive Programming:",
      "  ├── LectCode: Max Rating 1630",
      "  ├── CodeChef: Max Rating 1493",
      "  └── Codeforces: Max Rating 1112",
      "",
      "Available for:",
      "  ✓ Internship opportunities",
      "  ✓ Full-time roles (after 2028 graduation)",
      "  ✓ Collaborative projects",
      "",
      "Response time: Within 24 hours",
      "",
    ],
  };

  const executeCommand = (cmd) => {
    const trimmedCmd = cmd.trim();
    if (trimmedCmd === "") return [];

    const [command, ...args] = trimmedCmd.split(" ");

    if (commands[command]) {
      return commands[command](args);
    } else {
      return [
        `Command not found: ${command}`,
        'Type "help" for available commands.',
        "",
      ];
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const prompt = `${currentDirectory} $ ${input}`;
    const newHistory = [...history, prompt];
    const output = executeCommand(input);

    setHistory([...newHistory, ...output]);
    setCommandHistory([...commandHistory, input]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const commands = [
        "help",
        "clear",
        "ls",
        "cd",
        "cat",
        "git",
        "about",
        "skills",
        "projects",
        "contact",
      ];
      const matches = commands.filter((cmd) => cmd.startsWith(input));
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div
      className="h-full bg-black text-green-400 font-mono text-sm p-4 overflow-hidden flex flex-col cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <div
        ref={terminalRef}
        className="flex-1 overflow-y-auto mb-2 terminal-scroll"
      >
        {history.map((line, index) => (
          <div key={index} className="whitespace-pre-wrap leading-relaxed">
            {line}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="text-blue-400 mr-2">{currentDirectory} $</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none text-green-400 caret-green-400"
          autoComplete="off"
          spellCheck={false}
        />
      </form>
    </div>
  );
}
