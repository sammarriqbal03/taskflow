import { useState } from "react";
import { useNavigate } from "react-router-dom";

const slides = [
  { title: "Manage Your Tasks Smartly", desc: "Plan, track and complete your tasks in one place." },
  { title: "Stay Organized", desc: "Filter, search, and view your tasks on a calendar." },
  { title: "Achieve More", desc: "Boost productivity with TaskFlow today." },
];

export default function Onboarding() {
  const [i, setI] = useState(0);
  const nav = useNavigate();

  const next = () =>
    i < slides.length - 1
      ? setI(i + 1)
      : nav("/login", { replace: true }); // ✅ ensured

  return (

    <div className="min-h-screen flex flex-col p-4 text-white">

      <button
        onClick={() => nav("/login", { replace: true })} // ✅ ensured
        className="self-end text-white/60 text-sm"
      >
        Skip
      </button>

      <div className="flex-1 flex flex-col items-center justify-center text-center">

        <div className="text-6xl mb-6">📋</div>

        <h1 className="text-2xl font-bold mb-2">
          {slides[i].title}
        </h1>

        <p className="text-white/60">
          {slides[i].desc}
        </p>

      </div>

      <div className="flex items-center justify-center gap-2 mb-6">
        {slides.map((_, k) => (
          <span
            key={k}
            className={`h-2 rounded-full transition-all ${
              k === i ? "w-6 bg-brand" : "w-2 bg-white/20"
            }`}
          />
        ))}
      </div>

      <button
        onClick={next}
        className="w-full bg-brand-gradient py-3 rounded-xl font-semibold"
      >
        {i === slides.length - 1 ? "Get Started" : "Next"}
      </button>

    </div>

  );
}