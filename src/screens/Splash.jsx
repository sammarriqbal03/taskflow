import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { auth } from "../firebase";

export default function Splash() {

  const nav = useNavigate();

  useEffect(() => {

    const t = setTimeout(() => {
      if (auth.currentUser) {
        nav("/dashboard", { replace: true }); // ✅ logged-in
      } else {
        nav("/onboarding", { replace: true }); // ✅ new user
      }
    }, 2000);

    return () => clearTimeout(t);

  }, []);

  return (

    <div className="min-h-screen flex flex-col items-center justify-center">

      <div className="w-24 h-24 rounded-3xl bg-brand-gradient flex items-center justify-center shadow-2xl shadow-brand/50 mb-6 animate-pulse">

        <CheckCircle2 size={56} className="text-white" />

      </div>

      <h1 className="text-3xl font-bold">TaskFlow</h1>

      <p className="text-white/60 mt-2">Organize. Plan. Achieve.</p>

    </div>

  );

}