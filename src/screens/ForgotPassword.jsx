import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";

import { auth } from "../firebase";
import TopBar from "../components/TopBar";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    try {
      await sendPasswordResetEmail(auth, email);

      setMsg("Reset link sent! Check your email.");

      // ✅ redirect to login
      navigate("/login", { replace: true });

    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <div className="min-h-screen">
      <TopBar title="Forgot Password" />

      <div className="px-6 mt-6">
        <p className="text-white/60 mb-6">
          Enter your email and we'll send you a reset link.
        </p>

        <form onSubmit={submit} className="space-y-4">
          <input
            className="input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          {msg && <p className="text-sm text-brand">{msg}</p>}

          <button className="btn-primary">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}