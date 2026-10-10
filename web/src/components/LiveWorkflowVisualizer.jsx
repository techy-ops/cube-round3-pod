import React from 'react'
import {
  Inbox,
  Layers,
  Box,
  RotateCcw,
  Scale,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  ShieldAlert,
  ShieldCheck,
  Cpu,
  FileCheck2
} from 'lucide-react'

const STAGES = [
  { key: 'receiving', num: 1, title: 'Receiving', icon: Inbox, desc: 'Dock Intake & Inbound Verification' },
  { key: 'prep', num: 2, title: 'Prep', icon: Layers, desc: 'FBA Packaging & Polybag Seal Standards' },
  { key: 'pack', num: 3, title: 'Pack', icon: Box, desc: 'Order-Blind Vision & MFN Box Packing' },
  { key: 'returns', num: 4, title: 'Returns', icon: RotateCcw, desc: 'Customer Return Grading & Restock' },
  { key: 'recovery', num: 5, title: 'Recovery', icon: Scale, desc: 'Breeth Intelligence & Fee Audit Dossier' },
]

export default function LiveWorkflowVisualizer({
  workflow = null,
  isExecuting = false,
  currentUnit = '',
  orgId = '',
  onSelectStage = null,
}) {
  // Map stage_results by stage key if workflow exists
  const resultsByStage = {}
  if (workflow?.stage_results && Array.isArray(workflow.stage_results)) {
    for (const r of workflow.stage_results) {
      if (r?.stage) resultsByStage[r.stage] = r
    }
  }

  // Derive workflow-level decision vs pipeline status
  const finalOutcome = workflow?.final_outcome
  const businessOutcome = typeof finalOutcome === 'string'
    ? finalOutcome
    : (finalOutcome?.outcome || finalOutcome?.verdict || workflow?.status || 'IDLE')
  const technicalStatus = workflow?.status || (isExecuting ? 'RUNNING' : 'IDLE')
  const needsHuman = Boolean(finalOutcome?.needs_human || workflow?.stage_results?.some(s => s.needs_human))

  return (
    <div className="live-workflow-card card" style={{ padding: '24px 28px', marginBottom: '24px', position: 'relative' }}>
      {/* Top Status Bar: Clearly Distinguishing Pipeline Execution from Business Outcome */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        borderBottom: '1px solid var(--border)',
        paddingBottom: '18px',
        marginBottom: '22px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: isExecuting ? 'rgba(37, 99, 235, 0.08)' : 'var(--surface-sunken)',
            border: isExecuting ? '1px solid var(--accent)' : '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isExecuting ? 'var(--accent)' : 'var(--text-primary)',
          }}>
            <Cpu size={20} className={isExecuting ? 'spin-slow' : ''} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                Multi-Agent Verification Pipeline
              </h3>
              {isExecuting && (
                <span className="badge badge-info" style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  <span className="live-ping-dot" style={{ width: '6px', height: '6px' }} />
                  Live Execution
                </span>
              )}
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', margin: '3px 0 0 0' }}>
              {isExecuting 
                ? `Executing DAG sequence for unit ${currentUnit || 'UNIT-0001'} (${orgId || 'org_demo_alpha'})...`
                : (workflow 
                    ? `Workflow ${workflow.workflow_id} evaluated for ${workflow.subject_id}`
                    : 'System ready. Trigger an inspection to evaluate all 5 stages.')}
            </p>
          </div>
        </div>

        {/* Real-time Status Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {workflow && (
            <>
              {/* Technical Pipeline Completion State */}
              <div style={{
                fontSize: '0.78rem',
                padding: '6px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--surface-sunken)',
                border: '1px solid var(--border)',
                color: 'var(--text-secondary)'
              }}>
                <span style={{ color: 'var(--text-muted)', marginRight: '6px' }}>Pipeline:</span>
                <strong style={{ color: 'var(--text-primary)' }}>{technicalStatus}</strong>
              </div>

              {/* Official Business Approval Verdict */}
              <div style={{
                fontSize: '0.78rem',
                padding: '6px 14px',
                borderRadius: 'var(--radius-sm)',
                background: businessOutcome === 'CLEAN' || businessOutcome === 'PASS' 
                  ? 'var(--seal-soft)' 
                  : (businessOutcome === 'EXCEPTION' || businessOutcome === 'FAIL' ? 'var(--stop-soft)' : 'var(--uncertain-soft)'),
                border: businessOutcome === 'CLEAN' || businessOutcome === 'PASS' 
                  ? '1px solid var(--seal-edge)' 
                  : (businessOutcome === 'EXCEPTION' || businessOutcome === 'FAIL' ? '1px solid var(--stop-edge)' : '1px solid var(--uncertain-edge)'),
                color: businessOutcome === 'CLEAN' || businessOutcome === 'PASS' 
                  ? 'var(--seal)' 
                  : (businessOutcome === 'EXCEPTION' || businessOutcome === 'FAIL' ? 'var(--stop)' : 'var(--uncertain)'),
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                {businessOutcome === 'CLEAN' || businessOutcome === 'PASS' ? (
                  <CheckCircle2 size={14} />
                ) : (businessOutcome === 'EXCEPTION' || businessOutcome === 'FAIL' ? (
                  <XCircle size={14} />
                ) : (
                  <AlertTriangle size={14} />
                ))}
                <span>Outcome: {businessOutcome}</span>
              </div>

              {/* Human Certification Checkpoint Rule Flag */}
              {needsHuman && (
                <div style={{
                  fontSize: '0.76rem',
                  padding: '5px 10px',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--uncertain-soft)',
                  border: '1px solid var(--uncertain-edge)',
                  color: 'var(--uncertain)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontWeight: 600
                }}>
                  <ShieldAlert size={14} />
                  <span>Human Certification Required</span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* 5 Sequential Stage Track */}
      <div className="pipeline-flow-track" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px',
        position: 'relative'
      }}>
        {STAGES.map((s, idx) => {
          const Icon = s.icon
          const stageResult = resultsByStage[s.key]
          
          // Determine stage state
          let state = 'idle' // 'idle' | 'running' | 'completed' | 'skipped' | 'review'
          let verdict = null
          let duration = null
          let recordId = null

          if (isExecuting) {
            state = 'running'
          } else if (stageResult) {
            verdict = stageResult.verdict ? (typeof stageResult.verdict === 'object' ? stageResult.verdict.verdict : stageResult.verdict) : null
            duration = stageResult.duration_ms
            recordId = stageResult.record_id

            if (stageResult.state === 'skipped') {
              state = 'skipped'
            } else if (stageResult.needs_human) {
              state = 'review'
            } else {
              state = 'completed'
            }
          }

          const isPass = verdict === 'PASS' || verdict === 'CLEAN'
          const isFail = verdict === 'FAIL' || verdict === 'EXCEPTION'
          const isReview = verdict === 'UNCERTAIN' || state === 'review'

          return (
            <div
              key={s.key}
              className={`pipeline-stage-box stage-state-${state} ${isPass ? 'is-pass' : (isFail ? 'is-fail' : (isReview ? 'is-review' : ''))}`}
              onClick={() => onSelectStage && onSelectStage(s.key)}
              style={{
                background: 'var(--surface)',
                border: state === 'running' 
                  ? '1px solid var(--accent)' 
                  : (isPass ? '1px solid var(--seal-edge)' : (isFail ? '1px solid var(--stop-edge)' : (isReview ? '1px solid var(--uncertain-edge)' : '1px solid var(--border)'))),
                borderRadius: 'var(--radius)',
                padding: '16px 14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                cursor: onSelectStage ? 'pointer' : 'default',
                transition: 'all 0.2s ease',
                position: 'relative',
                boxShadow: state === 'running' ? '0 0 0 1px var(--accent-glow)' : 'var(--shadow-sm)'
              }}
            >
              {/* Stage Header Line */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-faint)',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase'
                }}>
                  0{s.num}
                </span>

                {/* Stage Execution State Pill */}
                {state === 'running' && (
                  <span className="stage-pill pill-running">
                    <span className="live-ping-dot" style={{ width: '5px', height: '5px' }} />
                    Active
                  </span>
                )}
                {state === 'skipped' && (
                  <span className="stage-pill pill-skipped">
                    Skipped
                  </span>
                )}
                {state === 'completed' && verdict && (
                  <span className={`stage-pill ${isPass ? 'pill-pass' : (isFail ? 'pill-fail' : 'pill-review')}`}>
                    {verdict}
                  </span>
                )}
                {state === 'idle' && (
                  <span className="stage-pill pill-idle">
                    Idle
                  </span>
                )}
              </div>

              {/* Stage Icon & Title */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '7px',
                  background: 'var(--surface-sunken)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: state === 'running' ? 'var(--accent)' : 'var(--text-primary)'
                }}>
                  <Icon size={16} />
                </div>
                <strong style={{ fontSize: '0.88rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                  {s.title}
                </strong>
              </div>

              {/* Sub-label */}
              <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.3 }}>
                {s.desc}
              </span>

              {/* Record / Latency Metrics Footer */}
              {stageResult && (
                <div style={{
                  marginTop: 'auto',
                  paddingTop: '8px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)'
                }}>
                  {recordId ? (
                    <span className="truncate" style={{ maxWidth: '85px' }} title={recordId}>
                      {recordId}
                    </span>
                  ) : (
                    <span>—</span>
                  )}
                  {duration !== null && (
                    <span style={{ color: 'var(--text-secondary)' }}>
                      {duration < 1000 ? `${duration}ms` : `${(duration / 1000).toFixed(1)}s`}
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
