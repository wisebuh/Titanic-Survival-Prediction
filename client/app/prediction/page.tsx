"use client"
import { useState } from "react";
import Link from "next/link";
import { predict, Features } from "@/lib/api";

const defaultForm: Features = {
  Pclass: 1,
  Sex: "male",
  Age: 30,
  SibSp: 0,
  Parch: 0,
  Fare: 50,
  Embarked: "S",
};

export default function PredictPage() {
  const [form, setForm]       = useState<Features>(defaultForm);
  const [result, setResult]   = useState<{ survived: number; formatted: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: ["Age", "Fare", "SibSp", "Parch", "Pclass"].includes(name)
        ? Number(value)
        : value,
    }));
  }

  async function handleSubmit() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await predict(form);
      setResult(res);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  const survived = result?.survived === 1;

  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col">

      {/* Nav */}
      <nav className="flex items-center justify-between px-10 py-6 border-b border-slate-800">
        <Link href="/" className="text-xs tracking-widest text-slate-400 uppercase font-mono hover:text-white transition-colors">
          ← Back
        </Link>
        <span className="text-xs tracking-widest text-slate-600 uppercase font-mono">
          Survival Predictor
        </span>
      </nav>

      <div className="flex flex-1 flex-col lg:flex-row">

        {/* Left — Form */}
        <section className="flex-1 px-10 py-14 border-r border-slate-800">
          <p className="text-xs tracking-widest uppercase font-mono text-amber-400 mb-4">
            Your Passenger Profile
          </p>
          <h1 className="text-4xl font-black leading-tight mb-2">
            Fill in your details
          </h1>
          <p className="text-slate-500 italic text-sm mb-10">
            As if you were boarding in 1912.
          </p>

          <div className="grid grid-cols-1 gap-6 max-w-lg">

            {/* Passenger Class */}
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">
                Passenger Class
              </label>
              <select
                name="Pclass"
                value={form.Pclass}
                onChange={handleChange}
                className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-400 transition-colors"
              >
                <option value={1}>1st Class — Upper deck</option>
                <option value={2}>2nd Class — Middle deck</option>
                <option value={3}>3rd Class — Lower deck</option>
              </select>
            </div>

            {/* Sex */}
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">
                Sex
              </label>
              <div className="flex gap-3">
                {["male", "female"].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setForm((p) => ({ ...p, Sex: s }))}
                    className={`flex-1 py-3 text-xs font-mono tracking-widest uppercase border transition-colors ${
                      form.Sex === s
                        ? "bg-amber-400 text-slate-950 border-amber-400"
                        : "bg-transparent text-slate-400 border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Age */}
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">
                Age — <span className="text-white">{form.Age} yrs</span>
              </label>
              <input
                type="range"
                name="Age"
                min={1}
                max={80}
                value={form.Age}
                onChange={handleChange}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-xs text-slate-600 font-mono mt-1">
                <span>1</span><span>80</span>
              </div>
            </div>

            {/* Fare */}
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">
                Fare Paid — <span className="text-white">£{form.Fare}</span>
              </label>
              <input
                type="range"
                name="Fare"
                min={0}
                max={500}
                value={form.Fare}
                onChange={handleChange}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-xs text-slate-600 font-mono mt-1">
                <span>£0</span><span>£500</span>
              </div>
            </div>

            {/* SibSp + Parch */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">
                  Siblings / Spouse
                </label>
                <input
                  type="number"
                  name="SibSp"
                  min={0}
                  max={8}
                  value={form.SibSp}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">
                  Parents / Children
                </label>
                <input
                  type="number"
                  name="Parch"
                  min={0}
                  max={6}
                  value={form.Parch}
                  onChange={handleChange}
                  className="w-full bg-slate-900 border border-slate-700 text-white px-4 py-3 text-sm font-mono focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>
            </div>

            {/* Embarked */}
            <div>
              <label className="block text-xs font-mono tracking-widest uppercase text-slate-400 mb-2">
                Port of Embarkation
              </label>
              <div className="flex gap-3">
                {[
                  { code: "S", label: "Southampton" },
                  { code: "C", label: "Cherbourg" },
                  { code: "Q", label: "Queenstown" },
                ].map((p) => (
                  <button
                    key={p.code}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, Embarked: p.code }))}
                    className={`flex-1 py-3 text-xs font-mono tracking-widest uppercase border transition-colors ${
                      form.Embarked === p.code
                        ? "bg-amber-400 text-slate-950 border-amber-400"
                        : "bg-transparent text-slate-400 border-slate-700 hover:border-slate-500"
                    }`}
                  >
                    {p.code}
                    <span className="block text-[10px] opacity-60 normal-case tracking-normal mt-0.5">
                      {p.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full bg-amber-400 text-slate-950 py-4 text-xs font-mono tracking-widest uppercase hover:bg-amber-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? "Analysing..." : "Predict My Fate →"}
            </button>

            {error && (
              <p className="text-red-400 text-xs font-mono text-center">{error}</p>
            )}
          </div>
        </section>

        {/* Right — Result */}
        <section className="w-full lg:w-96 px-10 py-14 flex flex-col">
          <p className="text-xs tracking-widest uppercase font-mono text-slate-500 mb-4">
            Prediction Result
          </p>

          {!result && !loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center border border-dashed border-slate-800 p-10">
              <div className="text-5xl mb-4">🚢</div>
              <p className="text-slate-600 text-sm italic font-serif">
                Fill in your profile and submit to see your fate.
              </p>
            </div>
          )}

          {loading && (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <div className="w-8 h-8 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-slate-500 text-xs font-mono tracking-widest uppercase">
                Consulting the model...
              </p>
            </div>
          )}

          {result && (
            <div className="flex-1 flex flex-col">
              {/* Big verdict */}
              <div className={`flex-1 flex flex-col items-center justify-center text-center p-10 border ${survived ? "border-emerald-800 bg-emerald-950" : "border-red-900 bg-red-950"}`}>
                <div className="text-6xl mb-6">{survived ? "🛟" : "🧊"}</div>
                <h2 className={`text-4xl font-black mb-3 ${survived ? "text-emerald-400" : "text-red-400"}`}>
                  {survived ? "Survived" : "Did Not Survive"}
                </h2>
                <p className={`text-sm italic font-serif ${survived ? "text-emerald-600" : "text-red-700"}`}>
                  {survived
                    ? "You made it to a lifeboat."
                    : "You did not make it off the ship."}
                </p>
              </div>

              {/* Profile recap */}
              <div className="mt-6 border border-slate-800 p-6 space-y-3">
                <p className="text-xs font-mono tracking-widest uppercase text-slate-500 mb-4">
                  Your Profile
                </p>
                {[
                  { label: "Class",    value: `${form.Pclass}${form.Pclass === 1 ? "st" : form.Pclass === 2 ? "nd" : "rd"}` },
                  { label: "Sex",      value: form.Sex },
                  { label: "Age",      value: `${form.Age} yrs` },
                  { label: "Fare",     value: `£${form.Fare}` },
                  { label: "Family",   value: `${form.SibSp + form.Parch} members` },
                  { label: "Embarked", value: form.Embarked === "S" ? "Southampton" : form.Embarked === "C" ? "Cherbourg" : "Queenstown" },
                ].map((r) => (
                  <div key={r.label} className="flex justify-between text-sm">
                    <span className="text-slate-500 font-mono text-xs uppercase tracking-widest">{r.label}</span>
                    <span className="text-white font-mono text-xs capitalize">{r.value}</span>
                  </div>
                ))}
              </div>

              {/* Try again */}
              <button
                onClick={() => { setResult(null); setForm(defaultForm); }}
                className="mt-4 w-full border border-slate-700 text-slate-400 py-3 text-xs font-mono tracking-widest uppercase hover:border-slate-500 hover:text-white transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}