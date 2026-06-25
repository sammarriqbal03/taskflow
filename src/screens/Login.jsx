import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { Mail, Lock } from "lucide-react";

export default function Login() {

  const nav = useNavigate();

  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault(); 
    setErr("");

    try { 
      await signInWithEmailAndPassword(auth, email, password); 
      nav("/dashboard", { replace: true }); // ✅ ensured
    }
    catch (e) { setErr(e.message); }
  };

  const google = async () => {
    try { 
      await signInWithPopup(auth, googleProvider); 
      nav("/dashboard", { replace: true }); // ✅ ensured
    }
    catch (e) { setErr(e.message); }
  };

  return (

    <div className="min-h-screen px-6 pt-16 pb-10">

      <h1 className="text-3xl font-bold">Welcome Back 👋</h1>
      <p className="text-white/60 mt-2 mb-8">Login to continue</p>

      <form onSubmit={submit} className="space-y-4">

        <div className="relative">
          <Mail size={18} className="absolute left-3 top-3.5 text-white/40"/>
          <input 
            className="input pl-10" 
            placeholder="Email" 
            value={email} 
            onChange={e=>setEmail(e.target.value)} 
            type="email" 
            required
          />
        </div>

        <div className="relative">
          <Lock size={18} className="absolute left-3 top-3.5 text-white/40"/>
          <input 
            className="input pl-10" 
            placeholder="Password" 
            value={password} 
            onChange={e=>setPassword(e.target.value)} 
            type="password" 
            required
          />
        </div>

        <Link to="/forgot" className="block text-right text-sm text-brand">
          Forgot Password?
        </Link>

        {err && <p className="text-pink-400 text-sm">{err}</p>}

        <button className="btn-primary">Login</button>

      </form>

      <div className="flex items-center gap-2 my-6">
        <div className="flex-1 h-px bg-white/10"/>
        <span className="text-xs text-white/40">or continue with</span>
        <div className="flex-1 h-px bg-white/10"/>
      </div>

      <button onClick={google} className="btn-ghost">
        <img 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
          className="w-5 h-5"
        /> 
        Continue with Google
      </button>

      <p className="text-center text-sm text-white/60 mt-8">
        Don't have an account?{" "}
        <button 
          onClick={() => nav("/signup", { replace: true })} // ✅ ensured
          className="text-brand font-medium"
        >
          Sign Up
        </button>
      </p>

    </div>

  );
}