import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Moon, Sun, Bell } from "lucide-react";

export default function Settings() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") !== "light"
  );
  const [notifications, setNotifications] = useState(true);

  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add("dark");
      root.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.add("light");
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? "app-gradient text-white" : "bg-gray-100 text-gray-900"} px-5 py-6 pb-28`}>
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className={`${darkMode ? "glass" : "bg-white shadow"} p-2 rounded-xl`}>
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="space-y-3">
        <Row
          dark={darkMode}
          icon={darkMode ? <Moon size={20} /> : <Sun size={20} />}
          label="Dark Mode"
          value={darkMode}
          onChange={setDarkMode}
        />
        <Row
          dark={darkMode}
          icon={<Bell size={20} />}
          label="Notifications"
          value={notifications}
          onChange={setNotifications}
        />
      </div>
    </div>
  );
}

function Row({ dark, icon, label, value, onChange }) {
  return (
    <div className={`${dark ? "glass" : "bg-white shadow"} rounded-2xl p-4 flex items-center justify-between`}>
      <div className="flex items-center gap-3">
        <span className="text-indigo-400">{icon}</span>
        <span>{label}</span>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-7 rounded-full transition relative ${value ? "bg-indigo-500" : "bg-gray-400"}`}
      >
        <span
          className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${value ? "left-6" : "left-1"}`}
        />
      </button>
    </div>
  );
}
