import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithPopup,
} from "firebase/auth";

import { auth, googleProvider } from "../firebase";
import { User, Mail, Lock } from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");

    if (password !== confirm) {
      return setErr("Passwords do not match");
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(user, { displayName: name });

      // ✅ updated navigation
      navigate("/dashboard", { replace: true });

    } catch (e) {
      setErr(e.message);
    }
  };

  const google = async () => {
    try {
      await signInWithPopup(auth, googleProvider);

      // ✅ updated navigation
      navigate("/dashboard", { replace: true });

    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="min-h-screen px-6 pt-16 pb-10">
      <h1 className="text-3xl font-bold">Create Account</h1>
      <p className="text-white/60 mt-2 mb-8">Sign up to get started</p>

      <form onSubmit={submit} className="space-y-4">
        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-3.5 text-white/40"
          />
          <input
            className="input pl-10"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-3 top-3.5 text-white/40"
          />
          <input
            className="input pl-10"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-3.5 text-white/40"
          />
          <input
            className="input pl-10"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-3 top-3.5 text-white/40"
          />
          <input
            className="input pl-10"
            placeholder="Confirm Password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required
          />
        </div>

        {err && <p className="text-pink-400 text-sm">{err}</p>}

        <button className="btn-primary">Sign Up</button>
      </form>

      <div className="flex items-center gap-2 my-6">
        <div className="flex-1 h-px bg-white/10" />
        <span className="text-xs text-white/40">
          or continue with
        </span>
        <div className="flex-1 h-px bg-white/10" />
      </div>

      <button onClick={google} className="btn-ghost">
        <img
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          className="w-5 h-5"
          alt="google"
        />
        Continue with Google
      </button>

      {/* ✅ Updated Login Navigation */}
      <p className="text-center text-sm text-white/60 mt-8">
        Already have an account?{" "}
        <button
          onClick={() => navigate("/login", { replace: true })}
          className="text-brand font-medium"
        >
          Login
        </button>
      </p>
    </div>
  );
}