import React from 'react'

/**
 * AgentBackground
 * 
 * Provides distinct, lightweight, and elegant animated backgrounds for each of
 * the 5 Cube Orchestrator agents:
 * - Receiving: incoming-material flow, scanning pulses, intake particles.
 * - Prep: organized processing paths, preparation stages, gentle transformation patterns.
 * - Pack: precise geometric grids, sealing outlines, packaging-inspired motion.
 * - Returns: reverse-flow paths, returning particles, circular/orbital reverse motion.
 * - Recovery: connected evidence nodes, investigation paths, restrained network graph (Breeth).
 * 
 * Performance & Accessibility:
 * - 100% vector SVG + hardware-accelerated CSS animations (0 canvas overhead).
 * - Respects prefers-reduced-motion media query.
 * - Sits behind content with subtle opacity (0.35 - 0.55) to guarantee text legibility.
 */

export default function AgentBackground({ stage = 'receiving', className = '', active = false }) {
  const normStage = (stage || 'receiving').toLowerCase()

  return (
    <div 
      className={`agent-background-wrapper agent-bg-${normStage} ${active ? 'is-active' : ''} ${className}`}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.65,
        transition: 'opacity 0.4s ease',
      }}
    >
      {normStage === 'receiving' && <ReceivingBackground />}
      {normStage === 'prep' && <PrepBackground />}
      {normStage === 'pack' && <PackBackground />}
      {normStage === 'returns' && <ReturnsBackground />}
      {normStage === 'recovery' && <RecoveryBackground />}
    </div>
  )
}

/* --------------------------------------------------------------------------
   1. RECEIVING AGENT BACKGROUND
   Incoming cargo flows downward, horizontal scanning beam sweeps across bay.
   -------------------------------------------------------------------------- */
function ReceivingBackground() {
  return (
    <svg 
      className="agent-svg receiving-svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 800 400" 
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Subtle grid pattern */}
        <pattern id="rcv-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(2, 132, 199, 0.08)" strokeWidth="1" />
          <circle cx="0" cy="0" r="1.5" fill="rgba(2, 132, 199, 0.15)" />
        </pattern>
        {/* Laser beam gradient */}
        <linearGradient id="rcv-beam-grad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(2, 132, 199, 0)" />
          <stop offset="50%" stopColor="rgba(2, 132, 199, 0.45)" />
          <stop offset="100%" stopColor="rgba(2, 132, 199, 0)" />
        </linearGradient>
      </defs>

      {/* Grid Floor */}
      <rect width="100%" height="100%" fill="url(#rcv-grid)" />

      {/* Inbound flow lanes */}
      <g stroke="rgba(2, 132, 199, 0.15)" strokeWidth="1" strokeDasharray="4 6">
        <line x1="200" y1="0" x2="200" y2="400" />
        <line x1="320" y1="0" x2="320" y2="400" />
        <line x1="480" y1="0" x2="480" y2="400" />
        <line x1="600" y1="0" x2="600" y2="400" />
      </g>

      {/* Inward particles moving down the lanes */}
      <g className="rcv-particles">
        <circle cx="200" cy="60" r="3" fill="#0284c7" opacity="0.6" className="rcv-flow-dot d1" />
        <circle cx="320" cy="180" r="4" fill="#0284c7" opacity="0.7" className="rcv-flow-dot d2" />
        <circle cx="480" cy="110" r="3.5" fill="#0284c7" opacity="0.6" className="rcv-flow-dot d3" />
        <circle cx="600" cy="240" r="4" fill="#0284c7" opacity="0.7" className="rcv-flow-dot d4" />
        <circle cx="320" cy="310" r="3" fill="#0284c7" opacity="0.5" className="rcv-flow-dot d5" />
      </g>

      {/* Horizontal intake scanning line */}
      <g className="rcv-scanner">
        <line x1="120" y1="120" x2="680" y2="120" stroke="url(#rcv-beam-grad)" strokeWidth="2.5" />
        <rect x="120" y="112" width="560" height="16" fill="url(#rcv-beam-grad)" opacity="0.15" />
      </g>

      {/* Intake inspection crosshair brackets */}
      <g stroke="rgba(2, 132, 199, 0.35)" strokeWidth="1.5" fill="none">
        <path d="M 280 150 L 300 150 M 280 150 L 280 170" />
        <path d="M 520 150 L 500 150 M 520 150 L 520 170" />
        <path d="M 280 250 L 300 250 M 280 250 L 280 230" />
        <path d="M 520 250 L 500 250 M 520 250 L 520 230" />
      </g>
    </svg>
  )
}

/* --------------------------------------------------------------------------
   2. PREP AGENT BACKGROUND
   Organized processing stages, polybag transformation pathways, and check gates.
   -------------------------------------------------------------------------- */
function PrepBackground() {
  return (
    <svg 
      className="agent-svg prep-svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 800 400" 
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id="prep-lines" width="60" height="60" patternUnits="userSpaceOnUse">
          <line x1="0" y1="30" x2="60" y2="30" stroke="rgba(217, 119, 6, 0.07)" strokeWidth="1" strokeDasharray="3 3" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#prep-lines)" />

      {/* Sequential Processing Pipeline Tracks */}
      <g fill="none" stroke="rgba(217, 119, 6, 0.2)" strokeWidth="1.5">
        <path d="M 80 200 L 220 200 L 280 140 L 420 140 L 480 260 L 620 260 L 720 200" />
        <path d="M 80 220 L 210 220 L 270 160 L 410 160 L 470 280 L 610 280 L 720 220" strokeDasharray="4 6" opacity="0.6" />
      </g>

      {/* Animated Traveling Pulses on the Track */}
      <circle cx="220" cy="200" r="5" fill="#d97706" className="prep-node p1" />
      <circle cx="280" cy="140" r="4" fill="#d97706" className="prep-node p2" />
      <circle cx="420" cy="140" r="6" fill="#d97706" className="prep-node p3" />
      <circle cx="480" cy="260" r="4" fill="#d97706" className="prep-node p4" />
      <circle cx="620" cy="260" r="5" fill="#d97706" className="prep-node p5" />

      {/* Polybag & FNSKU Seal Transformation Gates */}
      <g stroke="rgba(217, 119, 6, 0.3)" strokeWidth="1.2" fill="none">
        {/* Gate 1: Polybag seal checkpoint */}
        <rect x="250" y="115" width="50" height="50" rx="6" className="prep-gate-pulse" />
        {/* Gate 2: Barcode cover checkpoint */}
        <rect x="450" y="235" width="50" height="50" rx="6" className="prep-gate-pulse" style={{ animationDelay: '1.2s' }} />
      </g>
    </svg>
  )
}

/* --------------------------------------------------------------------------
   3. PACK AGENT BACKGROUND
   Precise isometric geometric grid, sealing outline, and dimension alignment marks.
   -------------------------------------------------------------------------- */
function PackBackground() {
  return (
    <svg 
      className="agent-svg pack-svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 800 400" 
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        {/* Isometric dot grid */}
        <pattern id="pack-dots" width="32" height="32" patternUnits="userSpaceOnUse">
          <circle cx="16" cy="16" r="1.2" fill="rgba(79, 70, 229, 0.12)" />
        </pattern>
      </defs>

      <rect width="100%" height="100%" fill="url(#pack-dots)" />

      {/* Isometric Shipping Box Contours with Animated Sealing Tape */}
      <g transform="translate(400, 200)" stroke="rgba(79, 70, 229, 0.25)" strokeWidth="1.5" fill="none">
        {/* Isometric Cube Edges */}
        <path d="M 0 -90 L 120 -20 L 120 110 L 0 40 Z" fill="rgba(79, 70, 229, 0.02)" />
        <path d="M 0 -90 L -120 -20 L -120 110 L 0 40 Z" fill="rgba(79, 70, 229, 0.03)" />
        <path d="M 0 -90 L 120 -20 L 0 50 L -120 -20 Z" fill="rgba(79, 70, 229, 0.04)" />

        {/* Center Vertical Joint */}
        <line x1="0" y1="40" x2="0" y2="180" stroke="rgba(79, 70, 229, 0.2)" strokeDasharray="3 3" />

        {/* Animated Sealing Tape Path across Top Box Flap */}
        <path 
          d="M -120 -20 L 0 50 L 120 -20" 
          stroke="#4f46e5" 
          strokeWidth="2.5" 
          className="pack-tape-seal" 
          strokeDasharray="320"
          strokeDashoffset="0"
        />
      </g>

      {/* Precision Caliper Dimension Ticks */}
      <g stroke="rgba(79, 70, 229, 0.3)" strokeWidth="1" fill="none">
        <line x1="160" y1="80" x2="220" y2="80" />
        <line x1="160" y1="74" x2="160" y2="86" />
        <line x1="220" y1="74" x2="220" y2="86" />
        <line x1="190" y1="77" x2="190" y2="83" />

        <line x1="580" y1="320" x2="640" y2="320" />
        <line x1="580" y1="314" x2="580" y2="326" />
        <line x1="640" y1="314" x2="640" y2="326" />
      </g>
    </svg>
  )
}

/* --------------------------------------------------------------------------
   4. RETURNS AGENT BACKGROUND
   Reverse flow paths, circular orbital motion, and returning particles.
   -------------------------------------------------------------------------- */
function ReturnsBackground() {
  return (
    <svg 
      className="agent-svg returns-svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 800 400" 
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="ret-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(13, 148, 136, 0.08)" />
          <stop offset="100%" stopColor="rgba(13, 148, 136, 0)" />
        </radialGradient>
      </defs>

      {/* Central Ambient Glow */}
      <circle cx="400" cy="200" r="160" fill="url(#ret-glow)" />

      {/* Concentric Reverse-Flow Orbital Paths */}
      <g stroke="rgba(13, 148, 136, 0.2)" strokeWidth="1.2" fill="none">
        <circle cx="400" cy="200" r="130" strokeDasharray="6 8" className="returns-orbit-outer" />
        <circle cx="400" cy="200" r="85" strokeDasharray="4 6" className="returns-orbit-inner" />
      </g>

      {/* Reverse Trajectory Arrows (Counter-Clockwise Circulation) */}
      <g fill="rgba(13, 148, 136, 0.5)">
        <polygon points="400,65 393,73 407,73" transform="rotate(-90 400 70)" />
        <polygon points="400,335 393,343 407,343" transform="rotate(90 400 338)" />
      </g>

      {/* Returning Flowing Particles */}
      <g className="returns-orbit-particles">
        <circle cx="270" cy="200" r="4.5" fill="#0d9488" className="returns-particle rp1" />
        <circle cx="400" cy="70" r="4" fill="#0d9488" className="returns-particle rp2" />
        <circle cx="530" cy="200" r="5" fill="#0d9488" className="returns-particle rp3" />
        <circle cx="400" cy="330" r="3.5" fill="#0d9488" className="returns-particle rp4" />
      </g>

      {/* Reverse Intake Diverter Wings */}
      <path 
        d="M 120 160 Q 260 160 340 180 M 120 240 Q 260 240 340 220" 
        stroke="rgba(13, 148, 136, 0.2)" 
        strokeWidth="1.5" 
        fill="none" 
        strokeDasharray="4 4"
      />
    </svg>
  )
}

/* --------------------------------------------------------------------------
   5. RECOVERY AGENT BACKGROUND (BREETH INTELLIGENCE)
   Restrained constellation network graph of interconnected evidence nodes.
   -------------------------------------------------------------------------- */
function RecoveryBackground() {
  return (
    <svg 
      className="agent-svg recovery-svg" 
      width="100%" 
      height="100%" 
      viewBox="0 0 800 400" 
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="rec-radial" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(124, 58, 237, 0.08)" />
          <stop offset="100%" stopColor="rgba(124, 58, 237, 0)" />
        </radialGradient>
      </defs>

      <rect width="100%" height="100%" fill="url(#rec-radial)" />

      {/* Interconnecting Evidence Filaments (Synapses) */}
      <g stroke="rgba(124, 58, 237, 0.2)" strokeWidth="1.2" fill="none">
        <line x1="200" y1="120" x2="360" y2="160" className="rec-filament" />
        <line x1="360" y1="160" x2="480" y2="100" className="rec-filament" />
        <line x1="480" y1="100" x2="620" y2="170" className="rec-filament" />
        <line x1="360" y1="160" x2="400" y2="280" className="rec-filament" />
        <line x1="400" y1="280" x2="560" y2="270" className="rec-filament" />
        <line x1="560" y1="270" x2="620" y2="170" className="rec-filament" />
        <line x1="200" y1="120" x2="260" y2="260" className="rec-filament" />
        <line x1="260" y1="260" x2="400" y2="280" className="rec-filament" />
      </g>

      {/* Evidence Hub Nodes with Soft Pulse Rings */}
      <g>
        {/* Node 1: Upstream Receiving Defect Node */}
        <circle cx="200" cy="120" r="14" fill="rgba(124, 58, 237, 0.06)" className="rec-pulse-ring" />
        <circle cx="200" cy="120" r="4.5" fill="#7c3aed" />

        {/* Node 2: Prep Evidence Node */}
        <circle cx="260" cy="260" r="12" fill="rgba(124, 58, 237, 0.06)" className="rec-pulse-ring" style={{ animationDelay: '0.6s' }} />
        <circle cx="260" cy="260" r="4" fill="#7c3aed" />

        {/* Node 3: Central Breeth Cognitive Cluster */}
        <circle cx="360" cy="160" r="22" fill="rgba(124, 58, 237, 0.08)" className="rec-pulse-ring" style={{ animationDelay: '1.2s' }} />
        <circle cx="360" cy="160" r="7" fill="#7c3aed" />

        {/* Node 4: Discrepancy Gate */}
        <circle cx="480" cy="100" r="16" fill="rgba(124, 58, 237, 0.06)" className="rec-pulse-ring" style={{ animationDelay: '1.8s' }} />
        <circle cx="480" cy="100" r="5" fill="#7c3aed" />

        {/* Node 5: Inbound Defect Fee Audit */}
        <circle cx="400" cy="280" r="18" fill="rgba(124, 58, 237, 0.06)" className="rec-pulse-ring" style={{ animationDelay: '0.9s' }} />
        <circle cx="400" cy="280" r="5.5" fill="#7c3aed" />

        {/* Node 6: Return Discrepancy Node */}
        <circle cx="560" cy="270" r="14" fill="rgba(124, 58, 237, 0.06)" className="rec-pulse-ring" style={{ animationDelay: '1.5s' }} />
        <circle cx="560" cy="270" r="4.5" fill="#7c3aed" />

        {/* Node 7: Claim Dossier Formulation Node */}
        <circle cx="620" cy="170" r="20" fill="rgba(124, 58, 237, 0.08)" className="rec-pulse-ring" style={{ animationDelay: '2.1s' }} />
        <circle cx="620" cy="170" r="6" fill="#7c3aed" />
      </g>
    </svg>
  )
}
