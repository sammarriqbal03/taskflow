import { Home, Calendar, Plus, Search, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export default function BottomNav() {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const Item = ({ icon: Icon, path, label }) => {
    const active = pathname === path;
    return (
      <button onClick={() => nav(path)} className="flex flex-col items-center gap-1 flex-1">
        <Icon size={22} className={active ? "text-brand" : "text-white/50"} />
        <span className={`text-[10px] ${active ? "text-brand" : "text-white/50"}`}>{label}</span>
      </button>
    );
  };
  return (
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md px-4 pb-4 pt-2 pointer-events-none">
      <div className="glass rounded-2xl flex items-center justify-around py-3 px-2 pointer-events-auto relative">
        <Item icon={Home} path="/dashboard" label="Home" />
        <Item icon={Calendar} path="/calendar" label="Calendar" />
        <button onClick={() => nav("/create")} className="w-14 h-14 -mt-8 rounded-full bg-brand-gradient flex items-center justify-center shadow-xl shadow-brand/40 active:scale-95">
          <Plus className="text-white" />
        </button>
        <Item icon={Search} path="/search" label="Search" />
        <Item icon={User} path="/profile" label="Profile" />
      </div>
    </div>
  );
}
