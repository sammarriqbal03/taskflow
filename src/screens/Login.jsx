import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setError("");
    try {
      await signInWithPopup(auth, new GoogleAuthProvider());
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen app-gradient text-white px-6 py-10 overflow-y-auto">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-2">Welcome Back 👋</h1>
        <p className="text-white/70 mb-8">Login to continue</p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-500/20 text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div className="relative">
            <Mail className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="relative w-full glass rounded-xl pl-12 pr-4 py-4 outline-none placeholder-white/50 text-white"
              style={{ background: "transparent" }}
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60 z-10" />
            <input
              type={showPwd ? "text" : "password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="relative w-full glass rounded-xl pl-12 pr-12 py-4 outline-none placeholder-white/50 text-white"
              style={{ background: "transparent" }}
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white z-10"
              tabIndex={-1}
            >
              {showPwd ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm text-indigo-300">
              Forgot Password?
            </Link>
          </div>

          <button
            disabled={loading}
            className="w-full py-4 rounded-xl brand-gradient font-semibold disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center gap-3 my-6 text-white/50 text-sm">
          <div className="flex-1 h-px bg-white/10" />
          or continue with
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <button
          onClick={handleGoogle}
          className="w-full py-4 rounded-xl glass flex items-center justify-center gap-3 font-medium"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt=""
            className="w-5 h-5"
          />
          Continue with Google
        </button>

        <p className="text-center text-white/70 mt-8">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-300 font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
