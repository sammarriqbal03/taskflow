import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase";
import { CheckCircle2, Clock, ListTodo, Plus } from "lucide-react";
import TaskCard from "../components/TaskCard";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!auth.currentUser) return;

    // ✅ USER-SCOPED QUERY (IMPORTANT)
    const q = query(
      collection(db, "tasks"),
      where("userId", "==", auth.currentUser.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoading(false);
      },
      (err) => {
        console.error("Dashboard snapshot error:", err);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === "completed").length;
  const pending = total - completed;

  return (
    <div className="min-h-screen bg-app-gradient p-4 text-white">
      <h1 className="text-xl font-semibold mb-1">
        Hello, {auth.currentUser?.displayName || "User"} 👋
      </h1>

      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatCard icon={<ListTodo size={18} />} label="Total" value={total} />
        <StatCard icon={<CheckCircle2 size={18} />} label="Done" value={completed} />
        <StatCard icon={<Clock size={18} />} label="Pending" value={pending} />
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold">Recent Tasks</h2>
        <Link to="/tasks" className="text-xs text-indigo-300">See all</Link>
      </div>

      {loading ? (
        <p className="text-white/50 text-sm">Loading...</p>
      ) : tasks.length === 0 ? (
        <div className="glass rounded-2xl p-6 text-center">
          <p className="text-white/60 text-sm mb-3">No tasks yet</p>
          <Link
            to="/create"
            className="inline-flex items-center gap-2 bg-brand-gradient px-4 py-2 rounded-xl text-sm"
          >
            <Plus size={16} /> Create your first task
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {tasks.slice(0, 5).map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>
      )}
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="glass rounded-2xl p-4 text-center">
      <div className="flex justify-center mb-1 text-indigo-300">{icon}</div>
      <p className="text-lg font-semibold">{value}</p>
      <p className="text-xs text-white/60">{label}</p>
    </div>
  );
}