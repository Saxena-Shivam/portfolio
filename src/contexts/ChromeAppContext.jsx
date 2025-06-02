import { createContext, useContext, useState } from "react";

const ChromeAppContext = createContext();

export function ChromeAppProvider({ children }) {
  const [url, setUrl] = useState("https://grocto-frontend.onrender.com/");
  return (
    <ChromeAppContext.Provider value={{ url, setUrl }}>
      {children}
    </ChromeAppContext.Provider>
  );
}

export function useChromeApp() {
  return useContext(ChromeAppContext);
}
