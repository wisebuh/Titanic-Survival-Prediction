"use client"
import { useState, useEffect } from "react";
import Link from "next/link";

const steps = [
  {
    num: "01",
    title: "You Enter Your Profile",
    desc: "You fill in your passenger details — class, sex, age, fare, family size, and port of embarkation. These are the exact same fields recorded in the original Titanic manifest.",
  },
  {
    num: "02",
    title: "Data is Preprocessed",
    desc: "Your inputs are cleaned and encoded the same way the training data was — categorical fields like Sex and Embarked are label-encoded, and all values are scaled to match what the model expects.",
  },
  {
    num: "03",
    title: "Model Makes a Prediction",
    desc: "A LightGBM classifier trained on 891 historical passengers analyses your profile and outputs a survival probability. If it's above 0.5, you survived.",
  },
  {
    num: "04",
    title: "Result is Returned",
    desc: "The FastAPI backend returns the prediction to the Next.js frontend, which displays your fate — along with a summary of the profile that was submitted.",
  },
];

const features = [
  { name: "Pclass",   desc: "Ticket class (1st, 2nd, 3rd). A direct proxy for socioeconomic status." },
  { name: "Sex",      desc: "Gender. Women and children were prioritised for lifeboats." },
  { name: "Age",      desc: "Passenger age in years. Children had higher survival rates." },
  { name: "SibSp",    desc: "Number of siblings or spouses aboard the Titanic." },
  { name: "Parch",    desc: "Number of parents or children aboard the Titanic." },
  { name: "Fare",     desc: "Passenger fare paid. Correlated with class and cabin location." },
  { name: "Embarked", desc: "Port of embarkation — Southampton, Cherbourg, or Queenstown." },
];

const stack = [
  { label: "Model",    value: "LightGBM Classifier" },
  { label: "Backend",  value: "FastAPI + Python" },
  { label: "Frontend", value: "Next.js + Tailwind CSS" },
  { label: "Dataset",  value: "Kaggle Titanic (891 rows)" },
  { label: "Accuracy", value: "~82% on validation set" },
];

export default function AboutPage() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-800">
        <Link href="/" className="text-xs tracking-widest text-slate-400 uppercase font-mono hover:text-white transition-colors">
          ← Back
        </Link>
        <span className="text-xs tracking-widest text-slate-600 uppercase font-mono">
          How It Works
        </span>
      </nav>

      {/* Hero */}
      <section className="px-10 py-16 border-b border-slate-800 max-w-3xl">
        <p className={`text-xs tracking-widest uppercase font-mono text-amber-400 mb-4 transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Under the Hood
        </p>
        <h1 className={`text-5xl font-black leading-tight mb-6 transition-all duration-700 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          How the model
          <span className="block italic text-slate-400 font-serif">makes its prediction</span>
        </h1>
        <div className={`w-16 h-px bg-amber-400 mb-6 transition-all duration-700 delay-200 ${mounted ? "opacity-100" : "opacity-0"}`} />
        <p className={`text-slate-400 italic text-lg leading-relaxed transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          A machine learning model trained on real Titanic passenger records — predicting survival based on the same data that was recorded that night.
        </p>
      </section>

      {/* How it works steps */}
      <section className="px-10 py-16 border-b border-slate-800">
        <p className="text-xs tracking-widest uppercase font-mono text-slate-500 mb-10">
          The Process
        </p>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-slate-800">
          {steps.map((step) => (
            <div key={step.num} className="bg-slate-950 p-8 hover:bg-slate-900 transition-colors">
              <span className="text-5xl font-black text-slate-800 font-mono block mb-4">
                {step.num}
              </span>
              <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed italic">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features table */}
      <section className="px-10 py-16 border-b border-slate-800">
        <p className="text-xs tracking-widest uppercase font-mono text-slate-500 mb-10">
          Input Features
        </p>
        <div className="max-w-2xl divide-y divide-slate-800">
          {features.map((f) => (
            <div key={f.name} className="flex gap-8 py-5">
              <span className="text-amber-400 font-mono text-sm w-24 shrink-0 pt-0.5">
                {f.name}
              </span>
              <p className="text-slate-400 text-sm leading-relaxed italic">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech stack */}
      <section className="px-10 py-16 border-b border-slate-800">
        <p className="text-xs tracking-widest uppercase font-mono text-slate-500 mb-10">
          Tech Stack
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-px bg-slate-800 max-w-3xl">
          {stack.map((s) => (
            <div key={s.label} className="bg-slate-950 p-6 hover:bg-slate-900 transition-colors">
              <p className="text-xs font-mono tracking-widest uppercase text-slate-600 mb-2">
                {s.label}
              </p>
              <p className="text-sm font-bold text-white leading-snug">{s.value}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Dataset note */}
      <section className="px-10 py-16 border-b border-slate-800">
        <p className="text-xs tracking-widest uppercase font-mono text-slate-500 mb-6">
          About the Data
        </p>
        <div className="max-w-2xl space-y-4 text-slate-400 text-sm leading-relaxed italic">
          <p>
            The model was trained on the Kaggle Titanic dataset — 891 passengers with known survival outcomes. Features were engineered and missing values imputed before training.
          </p>
          <p>
            LightGBM was chosen for its speed, accuracy on tabular data, and ability to handle mixed feature types. The model achieves approximately 82% accuracy on a held-out validation set.
          </p>
          <p>
            This is a learning project. The predictions are probabilistic and based on historical patterns — not a definitive statement about any individual's fate.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-10 py-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black mb-2">Ready to find out?</h2>
          <p className="text-slate-500 italic text-sm">Enter your 1912 passenger profile and get your verdict.</p>
        </div>
        <Link
          href="/predict"
          className="bg-amber-400 text-slate-950 px-10 py-4 text-xs font-mono tracking-widest uppercase hover:bg-amber-300 transition-colors shrink-0"
        >
          Check My Fate →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-10 py-6 flex justify-between items-center mt-auto">
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