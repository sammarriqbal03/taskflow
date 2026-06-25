import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../firebase";
import { ArrowLeft, Calendar, Flag } from "lucide-react";

export default function CreateTask() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return setError("Title is required");
    if (!auth.currentUser) return setError("Please login first");

    try {
      setLoading(true);
      setError("");
      await addDoc(collection(db, "tasks"), {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || null,
        priority,
        status: "pending",
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });
      navigate("/dashboard");
    } catch (err) {
      console.error("Create task error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen app-gradient text-white px-5 py-6 pb-28">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="glass p-2 rounded-xl">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Create Task</h1>
      </div>

      {error && (
        <div className="glass p-3 rounded-xl mb-4 text-red-300 text-sm">{error}</div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="glass rounded-2xl p-4">
          <label className="text-xs text-white/60 mb-1 block">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full bg-transparent outline-none text-white placeholder-white/40"
          />
        </div>

        <div className="glass rounded-2xl p-4">
          <label className="text-xs text-white/60 mb-1 block">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Add details..."
            className="w-full bg-transparent outline-none text-white placeholder-white/40 resize-none"
          />
        </div>

        <div className="glass rounded-2xl p-4 flex items-center gap-3">
          <Calendar size={18} className="text-white/60" />
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="bg-transparent outline-none text-white flex-1"
          />
        </div>

        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Flag size={18} className="text-white/60" />
            <span className="text-sm">Priority</span>
          </div>
          <div className="flex gap-2">
            {["low", "medium", "high"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`flex-1 py-2 rounded-xl text-sm capitalize ${
                  priority === p ? "brand-gradient text-white" : "bg-white/5 text-white/70"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full brand-gradient py-4 rounded-2xl font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
