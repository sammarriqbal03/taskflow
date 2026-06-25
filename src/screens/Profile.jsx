import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { LogOut, Settings as SettingsIcon, User } from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const user = auth.currentUser;

  const handleLogout = async () => {
    await signOut(auth);

    // ✅ updated navigation
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen px-6 pt-16 pb-10">
      <h1 className="text-2xl font-bold mb-6">Profile</h1>

      <div className="glass rounded-2xl p-6 flex flex-col items-center mb-6">
        <div className="w-20 h-20 rounded-full brand-gradient flex items-center justify-center mb-3">
          {user?.photoURL ? (
            <img
              src={user.photoURL}
              alt=""
              className="w-20 h-20 rounded-full"
            />
          ) : (
            <User size={32} />
          )}
        </div>

        <p className="font-semibold text-lg">
          {user?.displayName || "User"}
        </p>

        <p className="text-white/60 text-sm">
          {user?.email}
        </p>
      </div>

      <div className="space-y-3">
        <button
          onClick={() => navigate("/settings")}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3"
        >
          <SettingsIcon size={20} className="text-indigo-300" />
          <span>Settings</span>
        </button>

        <button
          onClick={handleLogout}
          className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-red-300"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}