import { useWindows } from "../contexts/WindowContext"
import Window from "./Window"

export default function WindowManager() {
  const { windows } = useWindows()

  return (
    <>
      {windows.map((window) => (
        <Window key={window.id} window={window} />
      ))}
    </>
  )
}
