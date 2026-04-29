"use client";

import { useState } from "react";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

const WHO_CAN_JOIN = [
  "Female law students at Haramaya University",
  "Young legal professionals starting their careers",
  "Individuals passionate about leadership, advocacy, and women's rights",
  "Supporters of gender equality in law",
];

export function JoinCTA() {
  const [form, setForm] = useState({
    fullName: "", email: "", phone: "", universityId: "",
    location: "", yearOfStudy: "",
  });
  const [status, setStatus] = useState<"idle"|"submitting"|"success"|"error">("idle");
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.fullName || !form.email || !form.yearOfStudy) {
      setError("Please fill in all required fields.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, areasOfInterest: [] }),
      });
      if (res.ok) { setStatus("success"); setForm({ fullName: "", email: "", phone: "", universityId: "", location: "", yearOfStudy: "" }); }
      else { setError("Something went wrong. Please try again."); setStatus("error"); }
    } catch { setError("Connection error. Please try again."); setStatus("error"); }
  }

  const inputStyle: React.CSSProperties = {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "8px",
    padding: "12px 16px",
    fontSize: "0.875rem",
    width: "100%",
    outline: "none",
  };

  return (
    <section aria-labelledby="join-cta-heading" style={{ backgroundColor: "#0d1e35" }} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — info */}
          <ScrollReveal>
            <h2 id="join-cta-heading" className="font-bold text-white mb-5"
              style={{ fontFamily: "var(--font-playfair, Georgia, serif)", fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
              Ready to Join?
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(255,255,255,0.7)" }}>
              Membership is open to female law students and young legal professionals who want to grow academically, professionally, and personally.
            </p>
            <ul className="space-y-3">
              {WHO_CAN_JOIN.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: "#C9A84C" }} />
                  <span className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.8)" }}>{item}</span>
                </li>
              ))}
            </ul>
          </ScrollReveal>

          {/* Right — quick join form */}
          <ScrollReveal delay={0.1}>
            <div className="rounded-2xl p-8" style={{ backgroundColor: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 className="text-xl font-bold text-white text-center mb-6"
                style={{ fontFamily: "var(--font-playfair, Georgia, serif)" }}>
                Join us now
              </h3>

              {status === "success" ? (
                <div className="text-center py-8">
                  <div className="text-4xl mb-3">🎉</div>
                  <p className="text-white font-semibold mb-1">Application Received!</p>
                  <p style={{ color: "rgba(255,255,255,0.6)" }} className="text-sm">We&apos;ll be in touch soon.</p>
                  <button onClick={() => setStatus("idle")} className="mt-4 text-sm underline" style={{ color: "#C9A84C" }}>
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-3">
                  {/* Row 1 */}
                  <div className="grid grid-cols-2 gap-3">
                    <input name="fullName" value={form.fullName} onChange={handleChange}
                      placeholder="Full Name *" style={inputStyle} />
                    <input name="email" type="email" value={form.email} onChange={handleChange}
                      placeholder="Email *" style={inputStyle} />
                  </div>
                  {/* Row 2 */}
                  <div className="grid grid-cols-2 gap-3">
                    <input name="phone" value={form.phone} onChange={handleChange}
                      placeholder="Phone Number" style={inputStyle} />
                    <input name="universityId" value={form.universityId} onChange={handleChange}
                      placeholder="HU ID No." style={inputStyle} />
                  </div>
                  {/* Row 3 */}
                  <div className="grid grid-cols-2 gap-3">
                    <input name="location" value={form.location} onChange={handleChange}
                      placeholder="Faculty/Department" style={inputStyle} />
                    <select name="yearOfStudy" value={form.yearOfStudy} onChange={handleChange}
                      style={{ ...inputStyle, color: form.yearOfStudy ? "#ffffff" : "rgba(255,255,255,0.5)" }}>
                      <option value="" disabled style={{ backgroundColor: "#0d1e35" }}>Year of Study *</option>
                      <option value="1st" style={{ backgroundColor: "#0d1e35" }}>1st Year</option>
                      <option value="2nd" style={{ backgroundColor: "#0d1e35" }}>2nd Year</option>
                      <option value="3rd" style={{ backgroundColor: "#0d1e35" }}>3rd Year</option>
                      <option value="4th" style={{ backgroundColor: "#0d1e35" }}>4th Year</option>
                      <option value="5th" style={{ backgroundColor: "#0d1e35" }}>5th Year</option>
                      <option value="Graduate" style={{ backgroundColor: "#0d1e35" }}>Graduate</option>
                    </select>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <button type="submit" disabled={status === "submitting"}
                    className="w-full py-3 rounded-lg font-semibold text-sm transition-all duration-200 disabled:opacity-60 mt-2"
                    style={{ backgroundColor: "#C9A84C", color: "#0A1628" }}>
                    {status === "submitting" ? "Submitting…" : "Join Now"}
                  </button>
                </form>
              )}
            </div>
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
