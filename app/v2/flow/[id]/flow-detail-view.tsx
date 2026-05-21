"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  Calendar,
  Check,
  CheckCircle2,
  FileText,
  MoreHorizontal,
  Pencil,
  Plus,
  Sparkles,
  Workflow,
  Link2,
  type LucideIcon,
} from "lucide-react";
import {
  flowItems,
  getFlowDetail,
  type FlowDetail,
  type TableRow,
} from "../../../data";

/* ============================================================
 * Overlay data: status step, decisions, next moves, source map
 * ============================================================ */

type NextMove = {
  id: string;
  text: string;
  primaryCta: string;
  primaryIcon?: LucideIcon;
  secondaryCta?: string;
};

type FlowOverlay = {
  statusStep: number; // 0..5
  decisions: string[];
  nextMoves: NextMove[];
  /** paragraph index → list of source ids that paragraph cites */
  sourceMap: Record<number, string[]>;
};

const STATUS_STEPS = [
  { id: "chat", label: "CHAT" },
  { id: "research", label: "RESEARCH" },
  { id: "draft", label: "DRAFT" },
  { id: "review", label: "REVIEW" },
  { id: "sop", label: "SOP" },
  { id: "agent", label: "AGENT" },
];

const overlays: Record<string, FlowOverlay> = {
  "1": {
    statusStep: 3,
    decisions: [
      "Delay the notification prompt until after the first task",
      "Lead with value proposition, not permissions",
      "Use Marcus's revised mockup as the working comp",
    ],
    nextMoves: [
      {
        id: "summarize",
        text: "Summarize the findings for stakeholders before tomorrow's review",
        primaryCta: "Draft summary",
        primaryIcon: Pencil,
      },
      {
        id: "schedule",
        text: "Block 10am tomorrow with Sarah for the comp review",
        primaryCta: "Open calendar",
        primaryIcon: Calendar,
      },
      {
        id: "prototype",
        text: "Pull Marcus's prototype into the working doc",
        primaryCta: "Link prototype",
        primaryIcon: Link2,
      },
    ],
    sourceMap: { 0: ["r1"], 1: ["r2"] },
  },
  "2": {
    statusStep: 4,
    decisions: [
      "维持当前监控阈值，不动 P0/P1 触发条件",
      "P2 告警自动收敛流程保留",
      "下一次例行扫描明日 09:00 自动执行",
    ],
    nextMoves: [
      {
        id: "save-sop",
        text: "把这套告警处理流程保存为可复用 SOP",
        primaryCta: "Save as SOP",
        primaryIcon: Bookmark,
      },
      {
        id: "automate",
        text: "让 Tanka 每天自动跑一次并把结论发到 #ops-daily",
        primaryCta: "Make it an agent",
        primaryIcon: Workflow,
      },
    ],
    sourceMap: { 0: ["r1"], 1: ["r2"] },
  },
  "3": {
    statusStep: 2,
    decisions: [
      "前两步「收集设计稿 → 跨端走查」已完成",
      "RICE 评分表的截图作为决策依据已纳入工作清单",
      "把批量操作场景的交互演示补齐",
    ],
    nextMoves: [
      {
        id: "rice",
        text: "等 Adam 下午提供 RICE 评分截图",
        primaryCta: "Ping Adam",
        primaryIcon: ArrowRight,
      },
      {
        id: "review",
        text: "明早约 30 分钟评审，把 SOP 归档到 Memos / Library",
        primaryCta: "Schedule review",
        primaryIcon: Calendar,
      },
      {
        id: "template",
        text: "把 SOP 抽象成「状态/分层」类决策的通用模板",
        primaryCta: "Save as template",
        primaryIcon: FileText,
      },
    ],
    sourceMap: { 0: ["r1"], 1: ["r2"], 2: ["r1", "r2"], 3: [] },
  },
};

function getOverlay(id: string): FlowOverlay {
  return overlays[id] ?? overlays["1"];
}

/* ============================================================
 * Page
 * ============================================================ */

export default function FlowDetailView({ id }: { id: string }) {
  const router = useRouter();

  const flowItem = useMemo(
    () => flowItems.find((f) => f.id === id) ?? flowItems[0],
    [id],
  );
  const detail = useMemo<FlowDetail>(() => getFlowDetail(flowItem), [flowItem]);
  const overlay = useMemo(() => getOverlay(id), [id]);

  const [activeSourceId, setActiveSourceId] = useState<string | null>(null);
  const [doneMoves, setDoneMoves] = useState<Set<string>>(new Set());
  const [input, setInput] = useState("");
  const [tankaReply, setTankaReply] = useState<string | null>(null);

  function markMoveDone(id: string) {
    setDoneMoves((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }
  function undoMove(id: string) {
    setDoneMoves((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }
  function handleSend() {
    if (!input.trim()) return;
    setTankaReply(input.trim());
    setInput("");
  }

  return (
    <div className="h-screen w-full flex flex-col bg-warm-bg-2 overflow-hidden">
      {/* Header */}
      <header className="h-[60px] px-6 flex items-center justify-between shrink-0 border-b border-warm-gray-2/70">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => router.push("/v2")}
            className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 transition-colors"
            title="Back"
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={1.8} />
          </button>
          <h1 className="text-[15px] font-medium tracking-tight text-warm-black truncate">
            {detail.title}
          </h1>
          <span className="text-[11px] font-medium uppercase tracking-[0.06em] text-warm-border ml-1 shrink-0">
            FLOW · #{detail.id}
          </span>
        </div>
        <button
          type="button"
          className="w-8 h-8 rounded-md flex items-center justify-center text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/60 transition-colors"
          title="More"
        >
          <MoreHorizontal className="w-4 h-4" strokeWidth={1.8} />
        </button>
      </header>

      {/* Status rail */}
      <div className="px-8 py-5 shrink-0 border-b border-warm-gray-2/70 bg-warm-bg-2">
        <StatusRail steps={STATUS_STEPS} current={overlay.statusStep} />
      </div>

      {/* Body: brief (left) + sources (right) */}
      <div className="flex-1 min-h-0 flex">
        {/* Left: Brief */}
        <section className="flex-1 min-w-0 overflow-y-auto scrollbar-thin">
          <div className="max-w-[640px] mx-auto px-8 py-8">
            <BriefQuery query={detail.query} />

            <BriefSection label="WHAT TANKA FOUND" topGap>
              <FoundParagraphs
                paragraphs={detail.response}
                sourceMap={overlay.sourceMap}
                activeSourceId={activeSourceId}
                onHover={setActiveSourceId}
              />
            </BriefSection>

            <BriefSection label="DECISIONS TAKEN">
              <DecisionsList decisions={overlay.decisions} />
            </BriefSection>

            <BriefSection label="NEXT MOVES">
              <NextMovesList
                moves={overlay.nextMoves}
                doneMoves={doneMoves}
                onDo={markMoveDone}
                onUndo={undoMove}
              />
            </BriefSection>

            {tankaReply && (
              <div className="mt-8 flex items-start gap-3">
                <span
                  className="w-6 h-6 rounded-[8px] bg-warm-black text-white text-[9px] font-bold flex items-center justify-center shrink-0 mt-[2px] shadow-[0_2px_6px_rgba(38,32,28,0.18)]"
                  aria-hidden
                >
                  T
                </span>
                <p className="text-[14px] leading-[1.6] text-warm-2 m-0">
                  <span className="text-warm-black">On it.</span> Reading your note —
                  <span className="italic"> &ldquo;{tankaReply}&rdquo;</span> — and folding it
                  into the brief. I&apos;ll surface a follow-up when there&apos;s something to
                  show.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Right: Sources */}
        <aside className="w-[360px] shrink-0 border-l border-warm-gray-2/70 bg-warm-bg overflow-y-auto scrollbar-thin">
          <SourcesPanel
            sources={detail.tableRows}
            totalResults={detail.totalResults}
            activeSourceId={activeSourceId}
            onHover={setActiveSourceId}
          />
        </aside>
      </div>

      {/* Composer + ladder push */}
      <div className="shrink-0 border-t border-warm-gray-2/70 bg-warm-bg-2 px-8 py-5">
        <div className="max-w-[820px] mx-auto">
          <FlowComposer
            value={input}
            onChange={setInput}
            onSend={handleSend}
            placeholder="Ask more, or push this forward…"
          />
          <FlowLadderActions statusStep={overlay.statusStep} />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
 * Status rail
 * ============================================================ */

function StatusRail({
  steps,
  current,
}: {
  steps: typeof STATUS_STEPS;
  current: number;
}) {
  return (
    <ol className="flex items-center w-full max-w-[820px] mx-auto m-0 p-0 list-none">
      {steps.map((s, i) => {
        const isPast = i < current;
        const isCurrent = i === current;
        return (
          <li
            key={s.id}
            className={`flex items-center min-w-0 ${
              i === steps.length - 1 ? "" : "flex-1"
            }`}
          >
            <button
              type="button"
              className="group/step inline-flex items-center gap-2 shrink-0"
              title={s.label}
            >
              <span
                className={`relative w-2.5 h-2.5 rounded-full transition-all shrink-0 ${
                  isCurrent
                    ? "bg-warm-black ring-4 ring-warm-black/10"
                    : isPast
                      ? "bg-warm-black/60"
                      : "bg-transparent border border-warm-border"
                }`}
              >
                {isPast && (
                  <Check
                    className="absolute inset-0 m-auto w-2 h-2 text-white"
                    strokeWidth={3.5}
                  />
                )}
              </span>
              <span
                className={`text-[10.5px] font-medium uppercase tracking-[0.06em] whitespace-nowrap transition-colors ${
                  isCurrent
                    ? "text-warm-black"
                    : isPast
                      ? "text-warm-2"
                      : "text-warm-border"
                }`}
              >
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <span
                className={`flex-1 h-px mx-3 transition-colors ${
                  isPast ? "bg-warm-black/30" : "bg-warm-gray-2"
                }`}
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

/* ============================================================
 * Brief
 * ============================================================ */

function BriefQuery({ query }: { query: string }) {
  return (
    <div>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-warm-border">
        ASKED
      </div>
      <h2 className="mt-2 text-[22px] leading-[1.35] font-medium tracking-tight text-warm-black m-0 max-w-[44ch]">
        {query}
      </h2>
    </div>
  );
}

function BriefSection({
  label,
  children,
  topGap,
}: {
  label: string;
  children: React.ReactNode;
  topGap?: boolean;
}) {
  return (
    <section className={topGap ? "mt-10" : "mt-9"}>
      <div className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-warm-border mb-3">
        {label}
      </div>
      {children}
    </section>
  );
}

function FoundParagraphs({
  paragraphs,
  sourceMap,
  activeSourceId,
  onHover,
}: {
  paragraphs: string[];
  sourceMap: Record<number, string[]>;
  activeSourceId: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className="space-y-3">
      {paragraphs.map((p, i) => {
        const ids = sourceMap[i] ?? [];
        const isLit = !!activeSourceId && ids.includes(activeSourceId);
        return (
          <p
            key={i}
            onMouseEnter={() => ids.length && onHover(ids[0])}
            onMouseLeave={() => onHover(null)}
            className={`text-[14.5px] leading-[1.65] text-warm-black m-0 -mx-2 px-2 py-1 rounded-md transition-colors ${
              isLit ? "bg-warm-base" : "bg-transparent"
            }`}
          >
            {p}
            {ids.length > 0 && (
              <sup className="ml-1 text-[10px] font-medium text-warm-border align-super">
                {ids.map((_, j) => i * 10 + j + 1).join(",")}
              </sup>
            )}
          </p>
        );
      })}
    </div>
  );
}

function DecisionsList({ decisions }: { decisions: string[] }) {
  return (
    <ul className="list-none p-0 m-0 space-y-2.5">
      {decisions.map((d, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-[14px] leading-[1.55] text-warm-black"
        >
          <span className="mt-[3px] w-4 h-4 rounded-full bg-warm-black flex items-center justify-center shrink-0">
            <Check className="w-2.5 h-2.5 text-white" strokeWidth={3.2} />
          </span>
          <span>{d}</span>
        </li>
      ))}
    </ul>
  );
}

function NextMovesList({
  moves,
  doneMoves,
  onDo,
  onUndo,
}: {
  moves: NextMove[];
  doneMoves: Set<string>;
  onDo: (id: string) => void;
  onUndo: (id: string) => void;
}) {
  return (
    <ul className="list-none p-0 m-0 space-y-2.5">
      {moves.map((m) => {
        const done = doneMoves.has(m.id);
        if (done) {
          return (
            <li key={m.id}>
              <div className="flex items-center gap-2.5 px-3.5 py-3 rounded-xl bg-warm-bg border border-warm-gray-2/60 text-[13.5px] text-warm-2">
                <CheckCircle2
                  className="w-3.5 h-3.5 text-warm-black shrink-0"
                  strokeWidth={2}
                />
                <span className="truncate">
                  <span className="text-warm-black">Picked up.</span> {m.text}
                </span>
                <button
                  type="button"
                  onClick={() => onUndo(m.id)}
                  className="ml-auto text-[12px] text-warm-2 hover:text-warm-black transition-colors"
                >
                  Undo
                </button>
              </div>
            </li>
          );
        }
        const Icon = m.primaryIcon;
        return (
          <li key={m.id}>
            <article className="group/move flex items-start gap-3 px-4 py-3.5 rounded-xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] transition-shadow duration-200 hover:shadow-[0_2px_12px_rgba(38,32,28,0.06)]">
              <span className="mt-[3px] w-4 h-4 rounded-full border border-warm-border flex items-center justify-center shrink-0 group-hover/move:border-warm-black transition-colors">
                <ArrowRight
                  className="w-2.5 h-2.5 text-warm-2 group-hover/move:text-warm-black transition-colors"
                  strokeWidth={2.4}
                />
              </span>
              <p className="flex-1 m-0 text-[14px] leading-[1.5] text-warm-black">
                {m.text}
              </p>
              <button
                type="button"
                onClick={() => onDo(m.id)}
                className="inline-flex items-center gap-1.5 h-8 px-3 rounded-full bg-warm-black text-white text-[12.5px] font-medium hover:bg-[#15110d] transition-colors shrink-0"
              >
                {Icon && <Icon className="w-3.5 h-3.5" strokeWidth={1.9} />}
                <span>{m.primaryCta}</span>
              </button>
            </article>
          </li>
        );
      })}
    </ul>
  );
}

/* ============================================================
 * Sources
 * ============================================================ */

function SourcesPanel({
  sources,
  totalResults,
  activeSourceId,
  onHover,
}: {
  sources: TableRow[];
  totalResults: number;
  activeSourceId: string | null;
  onHover: (id: string | null) => void;
}) {
  return (
    <div className="px-5 py-6">
      <div className="flex items-baseline justify-between mb-5">
        <div className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-warm-border">
          SOURCES
        </div>
        <div className="text-[11px] text-warm-2">
          showing {sources.length} of {totalResults}
        </div>
      </div>

      <ol className="list-none p-0 m-0 space-y-1">
        {sources.map((s, idx) => {
          const isLit = activeSourceId === s.id;
          return (
            <li key={s.id}>
              <button
                type="button"
                onMouseEnter={() => onHover(s.id)}
                onMouseLeave={() => onHover(null)}
                className={`w-full text-left rounded-lg px-3 py-3 transition-all ${
                  isLit
                    ? "bg-white border border-warm-gray-2 shadow-[0_2px_12px_rgba(38,32,28,0.06)]"
                    : "bg-transparent border border-transparent hover:bg-warm-gray-2/40"
                }`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <span
                    className="w-6 h-6 rounded-[8px] text-white text-[10px] font-bold flex items-center justify-center shrink-0"
                    style={{ background: s.authorColor }}
                  >
                    {s.authorInitials}
                  </span>
                  <span className="text-[12.5px] font-medium text-warm-black truncate">
                    {s.authorName}
                  </span>
                  <span className="text-[10.5px] font-medium uppercase tracking-[0.04em] text-warm-border shrink-0">
                    {s.tag}
                  </span>
                  <span className="text-[11px] text-warm-2 ml-auto shrink-0">
                    {s.date}
                  </span>
                </div>
                <p className="text-[12.5px] leading-[1.55] text-warm-2 m-0 line-clamp-3">
                  <span className="text-warm-border font-medium mr-1">
                    {idx + 1}.
                  </span>
                  {s.text}
                </p>
              </button>
            </li>
          );
        })}
      </ol>

      {totalResults > sources.length && (
        <button
          type="button"
          className="mt-3 w-full inline-flex items-center justify-center gap-1.5 h-9 rounded-lg text-[12.5px] font-medium text-warm-2 hover:text-warm-black hover:bg-warm-gray-2/40 transition-colors"
        >
          <span>Show {totalResults - sources.length} more</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      )}
    </div>
  );
}

/* ============================================================
 * Composer + ladder push
 * ============================================================ */

function FlowComposer({
  value,
  onChange,
  onSend,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  onSend: () => void;
  placeholder: string;
}) {
  return (
    <div
      className="rounded-3xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] p-4"
      style={{
        backgroundImage:
          "linear-gradient(180deg, rgb(255,255,255) 0%, rgb(254,254,253) 33%, rgb(253,253,252) 66%, rgb(252,252,250) 100%)",
      }}
    >
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        rows={1}
        placeholder={placeholder}
        className="w-full bg-transparent text-[15px] leading-6 outline-none resize-none text-warm-black placeholder:text-warm-2"
      />
      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-1.5">
          <ComposerTool title="Add content">
            <Plus className="w-4 h-4" strokeWidth={1.8} />
          </ComposerTool>
          <ComposerTool title="AI suggestions">
            <Sparkles className="w-4 h-4" strokeWidth={1.8} />
          </ComposerTool>
        </div>
        <SendButton onClick={onSend} disabled={!value.trim()} />
      </div>
    </div>
  );
}

function ComposerTool({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      title={title}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-warm-gray-2 bg-transparent text-warm-2 hover:bg-warm-gray-2/40 hover:text-warm-black transition-colors"
    >
      {children}
    </button>
  );
}

function SendButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title="Send"
      aria-label="Send"
      className={`inline-flex items-center justify-center w-8 h-8 rounded-full transition-all duration-150 ${
        disabled
          ? "bg-warm-gray-2 text-warm-2 cursor-not-allowed"
          : "bg-warm-black text-white hover:bg-[#15110d] hover:-translate-y-[1px] shadow-[0_2px_6px_rgba(38,32,28,0.18)]"
      }`}
    >
      <ArrowUp className="w-4 h-4" strokeWidth={2.2} />
    </button>
  );
}

function FlowLadderActions({ statusStep }: { statusStep: number }) {
  const canSave = statusStep >= 3;
  const canAgent = statusStep >= 4;
  return (
    <div className="mt-3 flex items-center gap-2 text-[12px] text-warm-2">
      <span className="text-[10.5px] font-medium uppercase tracking-[0.06em] text-warm-border mr-1">
        PUSH THIS FORWARD
      </span>
      <button
        type="button"
        disabled={!canSave}
        className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border transition-colors ${
          canSave
            ? "border-warm-gray-2 text-warm-black hover:bg-warm-base"
            : "border-warm-gray-2/60 text-warm-border cursor-not-allowed"
        }`}
      >
        <Bookmark className="w-3.5 h-3.5" strokeWidth={1.8} />
        <span>Save as SOP</span>
      </button>
      <button
        type="button"
        disabled={!canAgent}
        className={`inline-flex items-center gap-1.5 h-7 px-2.5 rounded-full border transition-colors ${
          canAgent
            ? "border-warm-gray-2 text-warm-black hover:bg-warm-base"
            : "border-warm-gray-2/60 text-warm-border cursor-not-allowed"
        }`}
      >
        <Workflow className="w-3.5 h-3.5" strokeWidth={1.8} />
        <span>Make it an agent task</span>
      </button>
      <span className="ml-auto inline-flex items-center gap-1.5">
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981]"
          aria-hidden
        />
        <span>Tanka is on this flow.</span>
      </span>
    </div>
  );
}
