import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import TopBar from "../components/TopBar";
import { Pencil, Trash2, Calendar, Flag } from "lucide-react";

export default function TaskDetails() {
  const { id } = useParams();
  const nav = useNavigate();
  const [task, setTask] = useState(null);
  const [confirm, setConfirm] = useState(false);

  useEffect(() => {
    (async () => {
      const snap = await getDoc(doc(db, "tasks", id));
      if (snap.exists()) setTask({ id: snap.id, ...snap.data() });
    })();
  }, [id]);

  const remove = async () => { await deleteDoc(doc(db, "tasks", id)); nav("/tasks"); };
  const toggleDone = async () => { await updateDoc(doc(db,"tasks",id), { status: task.status === "Complete" ? "In Process" : "Complete"}); setTask({...task, status: task.status === "Complete" ? "In Process" : "Complete"}); };

  if (!task) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="min-h-screen pb-10">
      <TopBar title="Task Detail" right={<button onClick={() => nav(`/edit/${id}`)} className="w-10 h-10 rounded-full glass flex items-center justify-center"><Pencil size={16}/></button>}/>
      <div className="px-5">
        <p className="text-sm text-white/50">Task Title</p>
        <h2 className="text-2xl font-bold mt-1">{task.title}</h2>
        <div className="flex gap-2 mt-3">
          <span className="px-3 py-1 rounded-full text-xs bg-pink-500/20 text-pink-300">{task.priority}</span>
          <span className="px-3 py-1 rounded-full text-xs bg-indigo-500/20 text-indigo-300">{task.status}</span>
        </div>

        <div className="glass rounded-2xl p-4 mt-6 space-y-3">
          <div className="flex items-center gap-3 text-sm"><Calendar size={16} className="text-white/50"/> {task.date || "No date"}</div>
          <div className="flex items-center gap-3 text-sm"><Flag size={16} className="text-white/50"/> Priority: {task.priority}</div>
        </div>

        <p className="mt-6 text-sm text-white/50">Description</p>
        <p className="mt-2 text-white/80 leading-relaxed">{task.description}</p>

        <button onClick={toggleDone} className="btn-primary mt-8">{task.status === "Complete" ? "Mark Incomplete" : "Mark as Complete"}</button>
        <button onClick={() => setConfirm(true)} className="btn-ghost mt-3 text-pink-400 border-pink-500/30"><Trash2 size={16}/> Delete Task</button>
      </div>

      {confirm && (
        <div className="fixed inset-0 bg-black/70 flex items-end justify-center z-50" onClick={()=>setConfirm(false)}>
          <div className="w-full max-w-md bg-bg2 rounded-t-3xl p-6" onClick={e=>e.stopPropagation()}>
            <h3 className="text-lg font-semibold">Delete this task?</h3>
            <p className="text-white/60 text-sm mt-1">This action cannot be undone.</p>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setConfirm(false)} className="btn-ghost">Cancel</button>
              <button onClick={remove} className="btn-primary !bg-none !bg-pink-500">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
