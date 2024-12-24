import { MoonLoader } from "react-spinners";

export default function Loader() {
  return (
    <div
      className="
        absolute inset-0
        flex items-center justify-center
        bg-black/20
        rounded-lg
        z-50
      "
    >
      <MoonLoader size={40} speedMultiplier={0.6} color="#3b82f6" />
    </div>
  );
}
