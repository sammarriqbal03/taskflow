import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";

const priColor = { High: "text-pink-400 bg-pink-500/20", Medium: "text-yellow-400 bg-yellow-500/20", Low: "text-green-400 bg-green-500/20" };

export default function TaskCard({ task }) {
  const nav = useNavigate();
  return (
    <button onClick={() => nav(`/tasks/${task.id}`)} className="w-full glass rounded-2xl p-4 text-left active:scale-[0.98] transition">
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] px-2 py-1 rounded-full ${priColor[task.priority] || priColor.Low}`}>{task.priority}</span>
        <span className="text-xs text-white/50">{task.status}</span>
      </div>
      <h3 className="font-semibold mb-1 line-clamp-1">{task.title}</h3>
      <p className="text-sm text-white/60 line-clamp-1">{task.description}</p>
      <div className="flex items-center gap-1 mt-3 text-xs text-white/50">
        <Clock size={12} /> {task.date || "No date"}
      </div>
    </button>
  );
}
