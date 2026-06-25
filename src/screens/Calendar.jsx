import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext"; // ✅ FIXED PATH
import TopBar from "../components/TopBar";
import BottomNav from "../components/BottomNav";
import TaskCard from "../components/TaskCard";

export default function Calendar() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [sel, setSel] = useState(new Date().toISOString().split("T")[0]);

  useEffect(() => {
    if (!user) return;
    const q = query(collection(db, "tasks"), where("uid", "==", user.uid));
    return onSnapshot(q, (snap) =>
      setTasks(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
  }, [user]);

  const today = new Date();
  const week = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i - 3);
    return d;
  });

  const dayTasks = tasks.filter((t) => t.date === sel);

  return (
    <div className="min-h-screen app-gradient flex flex-col">
      
      <TopBar title="Calendar" />

      {/* Week Selector */}
      <div className="flex gap-3 px-4 py-4 overflow-x-auto">
        {week.map((d) => {
          const k = d.toISOString().split("T")[0];
          const active = k === sel;

          return (
            <button
              key={k}
              onClick={() => setSel(k)}
              className={`flex flex-col items-center w-14 py-3 rounded-2xl shrink-0 ${
                active ? "bg-brand-gradient text-white" : "glass"
              }`}
            >
              <span className="text-xs">
                {d.toLocaleDateString("en", { weekday: "short" })}
              </span>
              <span className="text-lg font-semibold">{d.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* Tasks */}
      <div className="flex-1 px-4 pb-24">
        <h2 className="text-white mb-3">Tasks on {sel}</h2>

        {dayTasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}

        {dayTasks.length === 0 && (
          <p className="text-white/60">No tasks this day.</p>
        )}
      </div>

      <BottomNav />
    </div>
  );
}