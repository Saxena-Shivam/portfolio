# Portfolio OS – README

A web-based desktop environment built with React, featuring a customizable desktop, draggable/resizable windows, and a modern portfolio UI.

---

## ✨ Features

### 🖥️ Desktop

- **Dynamic Wallpaper:**  
  Change your desktop background from the Settings app. Wallpapers are loaded from `/public/image/wallpaper1.avif` to `/public/image/wallpaperN.avif`.
- **Desktop Icons:**  
  Launch apps or open folders by double-clicking icons. Icons can be moved, renamed, or deleted.
- **Context Menu:**  
  Right-click on the desktop to create new folders.

### 🗂️ Window Management

- **Windowed Apps:**  
  Apps like VS Code, Spotify, Terminal, Settings, and Portfolio open in draggable, resizable, minimizable, maximizable windows.
- **Multiple Windows:**  
  Open and manage multiple app windows at once.
- **Responsive:**  
  Windows adapt to desktop, tablet, and mobile. On mobile, windows are maximized and scrollable.
- **No Overflow:**  
  Windows are always clamped to the browser viewport and cannot be dragged or resized outside the visible area.
- **Smooth Animations:**  
  Windows open/close with smooth transitions and shadow effects.

### 📁 File & Folder Management

- Create, rename, move, and delete folders/files from the desktop (demo functionality).
- Desktop icons and folders managed via context.

### 🔌 Extensible Apps

- Easily add more apps/icons by editing the desktop items array and double-click handler.

---

## 📄 Pages / Apps

### 1. **About**

- Personal introduction, profile, and contact info.
- Social links (GitHub, LinkedIn, Email).
- Competitive programming ratings (LeetCode, CodeChef, Codeforces).

### 2. **Education**

- Timeline of academic qualifications.
- Institutes, years, and grades.

### 3. **Skills**

- Programming languages (C++, C, JavaScript, Python, etc.).
- Web development (React, Next.js, Node.js, Express, Tailwind, HTML, CSS).
- Databases & tools (MongoDB, MySQL, Git, Firebase).
- Other skills (Matlab, Logisim, EMU8086, OOP).

### 4. **Projects**

- List of major projects with:
  - Title, description, tech stack badges.
  - GitHub repo and live demo links.

### 5. **Resume**

- Embedded PDF viewer for resume.
- Download button for resume PDF.

### 6. **Achievements**

- Certifications and hackathon wins.
- Positions of responsibility (clubs, organizing committees).

### 7. **Terminal**

- Simulated terminal app with basic commands:
  - System info (`whoami`, `date`, `pwd`, `ls`, etc.)
  - Git commands (`git init`, `git status`, etc.)
  - Portfolio info (`about`, `skills`, `projects`, `contact`)
- Command history and navigation.

### 8. **File Manager** (if enabled)

- Browse folders and files (demo).
- Create, rename, delete folders (demo).

### 9. **Other Apps**

- Chrome (opens portfolio in a browser-like window).
- VS Code (code editor simulation).
- GitHub Desktop (GitHub profile/app simulation).
- Spotify (music player simulation).
- Settings (change wallpaper, theme, and more).

---

## ⚙️ Settings App

- **Personalization:**  
  Change wallpaper, switch between light/dark/auto themes (UI only).
- **Display:**  
  Adjust brightness, resolution, and orientation (UI only).
- **Sound:**  
  Adjust master volume and select output device (UI only).
- **System Info:**  
  View device specs and storage usage (static info).
- **Auto Update:**  
  Toggle automatic updates (UI only).

---

## 🧑 User Menu (Top Bar)

- **Quick Access:**  
  Open Settings, Lock Screen, or Shut Down from the user menu in the top bar.
- **Settings Shortcut:**  
  Open Settings directly from the top bar gear icon.

---

## 🖥️ Responsive Design

- All windows and content adapt to mobile, tablet, and desktop.
- On mobile, windows are always maximized for best experience.
- No content is cut off; bottom of each window is always accessible.

---

## 🚀 Getting Started

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Run the development server:**

   ```sh
   npm start
   ```

3. **Add wallpapers:**  
   Place your images in `public/image/` as `wallpaper1.avif`, `wallpaper2.avif`, etc.

---

## 🛠️ Customization

- **Add Desktop Icons:**  
  Edit the `desktopItems` array in `DesktopContext.jsx`.
- **Add Wallpapers:**  
  Add more images to `public/image/` and update the wallpaper count in `SettingsApp.jsx` if needed.
- **Add Apps:**  
  Implement your app as a React component and add it to the double-click handler and desktop items.

---

## 📁 File Structure

- `src/components/` – UI components (Desktop, TopBar, Sidebar, etc.)
- `src/components/apps/` – App components (SettingsApp, TerminalApp, AboutApp, etc.)
- `src/contexts/` – React context providers (DesktopContext, WindowContext)
- `public/image/` – Wallpaper images

---

## 🙏 Credits

- Icons: [Lucide](https://lucide.dev/)
- App icons: [Devicon](https://devicon.dev/)

---

## 📝 License

MIT License

---

## 📝 Author

Shivam Saxena  
[GitHub](https://github.com/Saxena-Shivam) | [LinkedIn](https://linkedin.com/in/shivam-saxena-aa8754289/)
