import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext"; 
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import TaskCard from "../components/TaskCard";
import { Search as SearchIcon } from "lucide-react";

export default function Search() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [q, setQ] = useState("");
  useEffect(() => {
    if (!user) return;
    const qq = query(collection(db, "tasks"), where("uid", "==", user.uid));
    return onSnapshot(qq, snap => setTasks(snap.docs.map(d=>({id:d.id, ...d.data()}))));
  }, [user]);
  const res = tasks.filter(t => t.title?.toLowerCase().includes(q.toLowerCase()) || t.description?.toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="min-h-screen pb-32">
      <TopBar title="Search"/>
      <div className="px-5 relative"><SearchIcon size={18} className="absolute left-8 top-3.5 text-white/40"/><input className="input pl-10" placeholder="Search tasks..." value={q} onChange={e=>setQ(e.target.value)} autoFocus/></div>
      <div className="px-5 mt-6 space-y-3">
        {q && res.map(t => <TaskCard key={t.id} task={t}/>)}
        {q && res.length === 0 && <p className="text-white/50 text-center py-10">No results.</p>}
        {!q && <p className="text-white/50 text-center py-10">Type to search your tasks.</p>}
      </div>
      <BottomNav/>
    </div>
  );
}
