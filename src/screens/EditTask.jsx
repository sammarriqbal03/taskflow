import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/TopBar";

export default function EditTask() {
  const { id } = useParams();
  const nav = useNavigate();
  const [f, setF] = useState(null);
  useEffect(() => { (async () => { const s = await getDoc(doc(db,"tasks",id)); if (s.exists()) setF(s.data()); })(); }, [id]);
  const save = async (e) => { e.preventDefault(); await updateDoc(doc(db,"tasks",id), f); nav(`/tasks/${id}`); };
  if (!f) return <div className="p-10 text-center">Loading...</div>;
  return (
    <div className="min-h-screen pb-10">
      <TopBar title="Edit Task"/>
      <form onSubmit={save} className="px-5 space-y-4">
        <input className="input" value={f.title} onChange={e=>setF({...f, title:e.target.value})}/>
        <textarea className="input min-h-[100px]" value={f.description} onChange={e=>setF({...f, description:e.target.value})}/>
        <div className="flex gap-2">{["Low","Medium","High"].map(p => <button type="button" key={p} onClick={()=>setF({...f, priority:p})} className={`flex-1 py-2 rounded-xl text-sm ${f.priority===p?"bg-brand-gradient":"glass"}`}>{p}</button>)}</div>
        <select className="input" value={f.status} onChange={e=>setF({...f, status:e.target.value})}>
          <option className="bg-bg2">In Process</option><option className="bg-bg2">Reviewing</option><option className="bg-bg2">On Hold</option><option className="bg-bg2">Complete</option>
        </select>
        <input type="date" className="input" value={f.date||""} onChange={e=>setF({...f, date:e.target.value})}/>
        <button className="btn-primary !mt-8">Save Changes</button>
      </form>
    </div>
  );
}
