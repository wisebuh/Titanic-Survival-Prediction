"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-800">
        <span className="text-xs tracking-widest text-slate-400 uppercase font-mono">
          RMS Titanic · 1912
        </span>
        <span className="text-xs tracking-widest text-slate-600 uppercase font-mono">
          April 15, 1912
        </span>
      </nav>

      {/* Hero */}
      <section className="flex flex-col justify-center flex-1 px-10 py-20 max-w-4xl">
        <p className={`text-xs tracking-widest uppercase font-mono text-amber-400 mb-6 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Machine Learning · Survival Analysis
        </p>

        <h1 className={`text-7xl font-black leading-none tracking-tight mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          Would you have
          <span className="block text-slate-400 italic font-serif">survived?</span>
        </h1>

        <div className={`w-20 h-px bg-amber-400 mb-8 transition-all duration-700 delay-200 ${mounted ? "opacity-100" : "opacity-0"}`} />

        <p className={`text-lg text-slate-400 max-w-lg leading-relaxed italic transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Enter your passenger profile and let our model predict your fate aboard the most famous ship in history.
        </p>

        <div className={`flex gap-4 mt-12 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link
            href="/prediction"
            className="bg-amber-400 text-slate-950 px-8 py-3 text-xs font-mono tracking-widest uppercase hover:bg-amber-300 transition-colors"
          >
            Check My Fate
          </Link>
          <Link
            href="/about"
            className="border border-slate-700 text-slate-400 px-8 py-3 text-xs font-mono tracking-widest uppercase hover:border-slate-500 hover:text-white transition-colors"
          >
            How It Works
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section className={`grid grid-cols-3 border-t border-slate-800 transition-all duration-700 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
        {[
          { num: "2,224", label: "Passengers Aboard" },
          { num: "38%",   label: "Survival Rate" },
          { num: "81",    label: "Features Analysed" },
        ].map((s) => (
          <div key={s.label} className="px-10 py-8 border-r border-slate-800 last:border-r-0">
            <p className="text-4xl font-black text-white mb-1">{s.num}</p>
            <p className="text-xs font-mono tracking-widest uppercase text-slate-500">{s.label}</p>
          </div>
        ))}
      </section>

      {/* Feature cards */}
      <section className="grid grid-cols-3 border-t border-slate-800">
        {[
          {
            icon: "🚢",
            title: "Passenger Class",
            desc: "First, second, or third class — your ticket determined more than your seat.",
          },
          {
            icon: "⚓",
            title: "Demographics",
            desc: "Age, gender, and family size all played a role in who made it to the lifeboats.",
          },
          {
            icon: "🧊",
            title: "ML Powered",
            desc: "A trained LightGBM model analyses your profile against 1,460 historical passengers.",
          },
        ].map((f) => (
          <div
            key={f.title}
            className="p-10 border-r border-slate-800 last:border-r-0 hover:bg-slate-900 transition-colors"
          >
            <div className="text-2xl mb-4">{f.icon}</div>
            <h3 className="text-base font-bold text-white mb-2">{f.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed italic">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Quote */}
      <section className="border-t border-slate-800 px-10 py-16 text-center">
        <p className="text-2xl italic text-slate-400 max-w-2xl mx-auto leading-relaxed font-serif mb-4">
          "She sank in 2 hours and 40 minutes. The data tells the rest of the story."
        </p>
        <span className="text-xs font-mono tracking-widest uppercase text-amber-400 opacity-60">
          North Atlantic · 41°43′57″N 49°56′49″W
        </span>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-10 py-6 flex justify-between items-center">
        <span className="text-xs font-mono text-slate-600 tracking-widest uppercase">
          Built with FastAPI · Next.js · LightGBM
        </span>
        <span className="text-xs font-mono text-slate-700 tracking-widest uppercase">
          Kaggle · Titanic Dataset
        </span>
      </footer>

    </main>
  );
}