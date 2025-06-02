import { useWindows } from "../contexts/WindowContext.jsx";
import Window from "./Window.jsx";

export default function WindowManager() {
  const { windows } = useWindows();

  return (
    <>
      {windows.map((window) => (
        <Window key={window.id} window={window} />
      ))}
    </>
  );
}
