import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { Filter as FilterIcon } from "lucide-react";

const TABS = ["All", "In Process", "Reviewing", "Complete"];

export default function TaskList() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [tab, setTab] = useState("All");

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
    return onSnapshot(q, (snap) => setTasks(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
  }, [user]);

  const filtered = tab === "All" ? tasks : tasks.filter(t => t.status === tab);

  return (
    <div className="min-h-screen pb-32">
      <TopBar title="Task List" right={<Link to="/filter" className="w-10 h-10 rounded-full glass flex items-center justify-center"><FilterIcon size={16}/></Link>}/>
      <div className="px-5 flex gap-2 overflow-x-auto pb-3 mb-2">
        {TABS.map(t => (
          <button key={t} onClick={() => setTab(t)} className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${tab===t ? "bg-brand-gradient" : "glass"}`}>{t}</button>
        ))}
      </div>
      <div className="px-5 space-y-3">
        {filtered.map(t => <TaskCard key={t.id} task={t}/>)}
        {filtered.length === 0 && <p className="text-white/50 text-center py-10">No tasks here.</p>}
      </div>
      <BottomNav/>
    </div>
  );
}
