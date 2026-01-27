import { memo } from "react"

// Icon components - memoized for performance
const PhysicsIcon = memo(function PhysicsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v6m0 10v6M1 12h6m10 0h6" />
      <path d="M4.22 4.22l4.24 4.24m7.08 7.08l4.24 4.24M4.22 19.78l4.24-4.24m7.08-7.08l4.24-4.24" />
    </svg>
  )
})

const ExperimentIcon = memo(function ExperimentIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M9 3h6v8l4 9H5l4-9V3z" />
      <path d="M9 3h6" strokeLinecap="round" />
      <circle cx="10" cy="16" r="1" fill="currentColor" />
      <circle cx="14" cy="14" r="1" fill="currentColor" />
    </svg>
  )
})

const FrontierIcon = memo(function FrontierIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  )
})

const DIYIcon = memo(function DIYIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
})

// SVG Diagrams - memoized for performance
const MalusDiagram = memo(function MalusDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <defs>
        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="40" r="12" fill="#fbbf24" opacity="0.8" />
      <rect x="35" y="38" width="40" height="4" fill="url(#beamGrad)" />
      <rect x="78" y="25" width="4" height="30" fill="#22d3ee" rx="1" />
      <rect x="85" y="38" width="40" height="4" fill="#22d3ee" opacity="0.8" />
      <rect x="128" y="25" width="4" height="30" fill="#a78bfa" rx="1" />
      <rect x="135" y="38" width="30" height="4" fill="#a78bfa" opacity="0.5" />
      <rect x="168" y="28" width="6" height="24" fill="#64748b" rx="1" />
    </svg>
  )
})

const BirefringenceDiagram = memo(function BirefringenceDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <line x1="20" y1="40" x2="70" y2="40" stroke="#fbbf24" strokeWidth="3" />
      <polygon points="70,40 64,36 64,44" fill="#fbbf24" />
      <path d="M80,20 L120,20 L130,60 L90,60 Z" fill="#22d3ee" opacity="0.3" stroke="#22d3ee" strokeWidth="1" />
      <line x1="130" y1="35" x2="180" y2="30" stroke="#ff4444" strokeWidth="2" />
      <text x="175" y="22" fill="#ff4444" fontSize="8">o</text>
      <line x1="130" y1="45" x2="180" y2="55" stroke="#44ff44" strokeWidth="2" />
      <text x="175" y="68" fill="#44ff44" fontSize="8">e</text>
    </svg>
  )
})

const WaveplateDiagram = memo(function WaveplateDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <line x1="15" y1="40" x2="55" y2="40" stroke="#fbbf24" strokeWidth="2" />
      <line x1="35" y1="30" x2="35" y2="50" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3" />
      <rect x="60" y="25" width="30" height="30" fill="#a78bfa" opacity="0.3" stroke="#a78bfa" strokeWidth="1" />
      <ellipse cx="130" cy="40" rx="15" ry="15" fill="none" stroke="#22d3ee" strokeWidth="2" />
      <polygon points="145,40 140,35 140,45" fill="#22d3ee" />
      <line x1="90" y1="40" x2="112" y2="40" stroke="#22d3ee" strokeWidth="2" strokeDasharray="3" />
    </svg>
  )
})

const PolarizationStateDiagram = memo(function PolarizationStateDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <line x1="25" y1="25" x2="25" y2="55" stroke="#ffaa00" strokeWidth="2" />
      <circle cx="25" cy="40" r="15" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2" />
      <circle cx="100" cy="40" r="15" fill="none" stroke="#44ff44" strokeWidth="2" />
      <polygon points="115,40 110,35 110,45" fill="#44ff44" />
      <ellipse cx="175" cy="40" rx="18" ry="10" fill="none" stroke="#a78bfa" strokeWidth="2" transform="rotate(-30 175 40)" />
    </svg>
  )
})

const FresnelDiagram = memo(function FresnelDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <line x1="30" y1="50" x2="170" y2="50" stroke="#64748b" strokeWidth="2" />
      <line x1="50" y1="15" x2="100" y2="50" stroke="#fbbf24" strokeWidth="2" />
      <line x1="100" y1="50" x2="150" y2="15" stroke="#22d3ee" strokeWidth="2" />
      <line x1="100" y1="50" x2="140" y2="78" stroke="#44ff44" strokeWidth="2" opacity="0.7" />
    </svg>
  )
})

const BrewsterDiagram = memo(function BrewsterDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <line x1="30" y1="50" x2="170" y2="50" stroke="#64748b" strokeWidth="2" />
      <line x1="40" y1="10" x2="100" y2="50" stroke="#fbbf24" strokeWidth="2" />
      <line x1="100" y1="50" x2="160" y2="10" stroke="#22d3ee" strokeWidth="2" />
      <circle cx="130" cy="30" r="4" fill="none" stroke="#22d3ee" strokeWidth="1.5" />
      <circle cx="130" cy="30" r="1" fill="#22d3ee" />
      <path d="M100,50 L100,35" stroke="#a78bfa" strokeWidth="1" strokeDasharray="2" />
      <text x="108" y="38" fill="#a78bfa" fontSize="8">θB</text>
    </svg>
  )
})

const ScatteringDiagram = memo(function ScatteringDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <line x1="20" y1="40" x2="70" y2="40" stroke="#fbbf24" strokeWidth="2" />
      <polygon points="70,40 64,36 64,44" fill="#fbbf24" />
      <circle cx="100" cy="40" r="15" fill="#64748b" opacity="0.3" stroke="#64748b" />
      <line x1="115" y1="40" x2="160" y2="40" stroke="#22d3ee" strokeWidth="1.5" />
      <line x1="110" y1="28" x2="145" y2="10" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
      <line x1="110" y1="52" x2="145" y2="70" stroke="#22d3ee" strokeWidth="1.5" opacity="0.7" />
      <line x1="100" y1="25" x2="100" y2="5" stroke="#4444ff" strokeWidth="1.5" opacity="0.8" />
    </svg>
  )
})

const StokesDiagram = memo(function StokesDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <circle cx="100" cy="40" r="30" fill="none" stroke="#64748b" strokeWidth="1" />
      <ellipse cx="100" cy="40" rx="30" ry="10" fill="none" stroke="#64748b" strokeWidth="1" strokeDasharray="2" />
      <line x1="65" y1="40" x2="135" y2="40" stroke="#ff4444" strokeWidth="1.5" />
      <text x="140" y="43" fill="#ff4444" fontSize="8">S₁</text>
      <line x1="100" y1="55" x2="100" y2="5" stroke="#44ff44" strokeWidth="1.5" />
      <text x="105" y="10" fill="#44ff44" fontSize="8">S₃</text>
      <circle cx="120" cy="30" r="4" fill="#ffff00" />
      <line x1="100" y1="40" x2="120" y2="30" stroke="#ffff00" strokeWidth="1.5" />
    </svg>
  )
})

const MuellerDiagram = memo(function MuellerDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <rect x="15" y="25" width="35" height="30" fill="#22d3ee" opacity="0.2" stroke="#22d3ee" rx="3" />
      <text x="32" y="43" textAnchor="middle" fill="#22d3ee" fontSize="10">S</text>
      <rect x="70" y="15" width="50" height="50" fill="#a78bfa" opacity="0.2" stroke="#a78bfa" rx="3" />
      <text x="95" y="35" textAnchor="middle" fill="#a78bfa" fontSize="8">M</text>
      <text x="95" y="48" textAnchor="middle" fill="#a78bfa" fontSize="7">4×4</text>
      <rect x="140" y="25" width="35" height="30" fill="#44ff44" opacity="0.2" stroke="#44ff44" rx="3" />
      <text x="157" y="43" textAnchor="middle" fill="#44ff44" fontSize="10">S'</text>
      <line x1="52" y1="40" x2="68" y2="40" stroke="#64748b" strokeWidth="1.5" />
      <polygon points="68,40 63,37 63,43" fill="#64748b" />
      <line x1="122" y1="40" x2="138" y2="40" stroke="#64748b" strokeWidth="1.5" />
      <polygon points="138,40 133,37 133,43" fill="#64748b" />
    </svg>
  )
})

const LightWaveDiagram = memo(function LightWaveDiagram() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-auto">
      <path d="M10,40 Q30,20 50,40 T90,40 T130,40 T170,40" fill="none" stroke="#fbbf24" strokeWidth="2" />
      <path d="M10,40 Q30,60 50,40 T90,40 T130,40 T170,40" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4" />
      <line x1="180" y1="40" x2="195" y2="40" stroke="#64748b" strokeWidth="2" />
      <polygon points="195,40 188,36 188,44" fill="#64748b" />
      <text x="100" y="75" textAnchor="middle" fill="#94a3b8" fontSize="8">λ</text>
    </svg>
  )
})
export {
  PhysicsIcon,
  ExperimentIcon,
    FrontierIcon,
    DIYIcon,
    MalusDiagram,
    BirefringenceDiagram,
    WaveplateDiagram,
    PolarizationStateDiagram,
    FresnelDiagram,
    BrewsterDiagram,
    ScatteringDiagram,
    StokesDiagram,
    MuellerDiagram,
    LightWaveDiagram,
}
