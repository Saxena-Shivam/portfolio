# Portfolio OS – README

A web-based desktop environment built with React, featuring a customizable desktop, windowed apps, and a modern UI.

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
  Apps like VS Code, Spotify, Terminal, and Settings open in draggable, resizable windows.
- **Multiple Windows:**  
  Open and manage multiple app windows at once.

### ⚙️ Settings App

- **Personalization:**
  - Change wallpaper by selecting from available images.
  - Switch between light, dark, and auto themes (UI only).
- **Display:**  
  Adjust brightness, resolution, and orientation (UI only).
- **Sound:**  
  Adjust master volume and select output device (UI only).
- **System Info:**  
  View device specs and storage usage (static info).
- **Auto Update:**  
  Toggle automatic updates (UI only).

### 🖼️ Wallpaper Selection

- Wallpapers are shown as thumbnails in the Settings > Personalization section.
- Click a wallpaper to instantly set it as your desktop background.

### 🧑 User Menu (Top Bar)

- **Quick Access:**  
  Open Settings, Lock Screen, or Shut Down from the user menu in the top bar.
- **Settings Shortcut:**  
  Open Settings directly from the top bar gear icon.

### 💻 Terminal App

- Simulated terminal with commands for:
  - System info (`whoami`, `date`, `pwd`, `ls`, etc.)
  - Git commands (`git init`, `git status`, etc.)
  - Portfolio info (`about`, `skills`, `projects`, `contact`)

### 📁 File & Folder Management

- Create, rename, move, and delete folders/files from the desktop.

### 🔌 Extensible Apps

- Easily add more apps/icons by editing the desktop items array and double-click handler.

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

## 📄 File Structure

- `src/components/` – UI components (Desktop, TopBar, Sidebar, etc.)
- `src/components/apps/` – App components (SettingsApp, TerminalApp, etc.)
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
