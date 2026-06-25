import { useState } from "react";
import TopBar from "../components/TopBar";
import { useNavigate } from "react-router-dom";

export default function Filter() {
  const nav = useNavigate();
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");
  const [from, setFrom] = useState(""); const [to, setTo] = useState("");
  const apply = () => { localStorage.setItem("filter", JSON.stringify({status,priority,from,to})); nav("/tasks"); };
  const Chip = ({val, set, options}) => (
    <div className="flex flex-wrap gap-2 mt-2">{options.map(o => <button key={o} onClick={()=>set(o)} className={`px-4 py-2 rounded-full text-sm ${val===o ? "bg-brand-gradient":"glass"}`}>{o}</button>)}</div>
  );
  return (
    <div className="min-h-screen pb-10">
      <TopBar title="Filter"/>
      <div className="px-5 space-y-6">
        <div><p className="text-sm text-white/60">Status</p><Chip val={status} set={setStatus} options={["All","In Process","Reviewing","Complete","On Hold"]}/></div>
        <div><p className="text-sm text-white/60">Priority</p><Chip val={priority} set={setPriority} options={["All","Low","Medium","High"]}/></div>
        <div><p className="text-sm text-white/60">Date Range</p>
          <div className="flex gap-3 mt-2"><input type="date" className="input" value={from} onChange={e=>setFrom(e.target.value)}/><input type="date" className="input" value={to} onChange={e=>setTo(e.target.value)}/></div>
        </div>
        <button onClick={apply} className="btn-primary !mt-10">Apply Filters</button>
      </div>
    </div>
  );
}
