import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function TopBar({ title, right }) {
  const nav = useNavigate();
  return (
    <div className="flex items-center justify-between px-5 pt-12 pb-4">
      <button onClick={() => nav(-1)} className="w-10 h-10 rounded-full glass flex items-center justify-center">
        <ArrowLeft size={18} />
      </button>
      <h1 className="font-semibold text-lg">{title}</h1>
      <div className="w-10 h-10">{right}</div>
    </div>
  );
}
