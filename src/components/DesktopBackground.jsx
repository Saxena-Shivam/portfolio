import { useDesktop } from "../contexts/DesktopContext";

export default function DesktopBackground() {
  const { wallpaper } = useDesktop();
  return (
    <div
      className="absolute inset-0 bg-cover bg-center bg-no-repeat -z-10"
      style={{ backgroundImage: `url(${wallpaper})` }}
    />
  );
}
