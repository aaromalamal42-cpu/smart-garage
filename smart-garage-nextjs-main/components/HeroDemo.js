"use client";
/* Homepage hero card: quick diagnosis guide.
   The visitor picks a common problem from a dropdown and instantly sees
   possible causes and a recommendation (no AI / API call needed). */
import { useState } from "react";

const PROBLEMS = [
  {
    id: "brake-noise",
    label: "Grinding noise when braking",
    causes: [
      { cause: "Worn brake pads", likelihood: "High" },
      { cause: "Scored / uneven brake disc", likelihood: "Medium" },
      { cause: "Sticking brake caliper", likelihood: "Medium" }
    ],
    inspection: true,
    urgency: "High",
    tip: "Brakes are safety-critical. Drive slowly and avoid highways until inspected."
  },
  {
    id: "hard-start",
    label: "Engine takes long to start",
    causes: [
      { cause: "Weak or old battery", likelihood: "High" },
      { cause: "Loose / corroded battery terminals", likelihood: "Medium" },
      { cause: "Faulty starter motor", likelihood: "Low" }
    ],
    inspection: true,
    urgency: "Medium",
    tip: "Check if the headlights look dim before starting — that points to the battery."
  },
  {
    id: "overheating",
    label: "Engine overheating",
    causes: [
      { cause: "Low coolant / coolant leak", likelihood: "High" },
      { cause: "Radiator fan not working", likelihood: "Medium" },
      { cause: "Faulty thermostat", likelihood: "Medium" }
    ],
    inspection: true,
    urgency: "High",
    tip: "Stop the vehicle. Never open the radiator cap while the engine is hot."
  },
  {
    id: "ac",
    label: "AC not cooling",
    causes: [
      { cause: "Low refrigerant (gas leak)", likelihood: "High" },
      { cause: "AC compressor clutch not engaging", likelihood: "Medium" },
      { cause: "Blocked condenser or cabin filter", likelihood: "Low" }
    ],
    inspection: true,
    urgency: "Low",
    tip: "Safe to drive. Book an AC service and gas check."
  },
  {
    id: "pulling",
    label: "Car pulls to one side",
    causes: [
      { cause: "Uneven tyre pressure", likelihood: "High" },
      { cause: "Wheel alignment out of spec", likelihood: "High" },
      { cause: "Worn suspension or steering parts", likelihood: "Low" }
    ],
    inspection: false,
    urgency: "Medium",
    tip: "Check tyre pressure first; if it continues, get an alignment."
  },
  {
    id: "check-engine",
    label: "Check-engine light is on",
    causes: [
      { cause: "Loose fuel cap / sensor fault", likelihood: "Medium" },
      { cause: "Faulty oxygen sensor", likelihood: "Medium" },
      { cause: "Ignition coil or spark plug issue", likelihood: "Medium" }
    ],
    inspection: true,
    urgency: "Medium",
    tip: "If the light is blinking, stop driving — it means a serious misfire."
  },
  {
    id: "smoke",
    label: "Smoke from the exhaust",
    causes: [
      { cause: "Burning engine oil (blue smoke)", likelihood: "Medium" },
      { cause: "Coolant leak into engine (white smoke)", likelihood: "Medium" },
      { cause: "Rich fuel mixture (black smoke)", likelihood: "Medium" }
    ],
    inspection: true,
    urgency: "High",
    tip: "Note the smoke colour — it helps the mechanic find the cause faster."
  },
  {
    id: "vibration",
    label: "Steering vibrates at high speed",
    causes: [
      { cause: "Wheel balancing needed", likelihood: "High" },
      { cause: "Damaged or uneven tyre", likelihood: "Medium" },
      { cause: "Warped brake discs", likelihood: "Low" }
    ],
    inspection: false,
    urgency: "Low",
    tip: "Usually fixed with wheel balancing at your next service."
  }
];

export default function HeroDemo() {
  const [selectedId, setSelectedId] = useState(PROBLEMS[0].id);
  const problem = PROBLEMS.find((p) => p.id === selectedId);

  return (
    <div className="hero-card" aria-label="Quick vehicle diagnosis guide">
      <div className="hc-head">
        <span className="hc-title">Quick Diagnosis Guide</span>
        <span className="hc-chip">Instant result</span>
      </div>

      <label className="hc-label" htmlFor="hero-problem">Select your vehicle problem</label>
      <select
        id="hero-problem"
        className="hc-select"
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
      >
        {PROBLEMS.map((p) => (
          <option key={p.id} value={p.id}>{p.label}</option>
        ))}
      </select>

      <div className="hc-result" key={problem.id}>
        <div className="hc-label">Possible causes</div>
        <ul className="hc-list">
          {problem.causes.map((c) => (
            <li key={c.cause}><span>{c.cause}</span><span>{c.likelihood.toUpperCase()}</span></li>
          ))}
        </ul>
        <div className="hc-label">Recommendation</div>
        <div className="hc-input" style={{ marginBottom: 10 }}>
          {problem.inspection ? "Professional inspection recommended" : "Quick check first, inspection if it continues"}
          {" · "}
          <span className={`hc-urgency hc-urgency-${problem.urgency.toLowerCase()}`}>{problem.urgency} urgency</span>
        </div>
        <p className="hc-tip">💡 {problem.tip}</p>
      </div>
      <p className="hc-foot">General guidance only — does not replace a professional diagnosis.</p>
    </div>
  );
}