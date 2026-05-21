"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp,
  Plus,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Pencil,
  MessageSquare,
  Settings2,
  type LucideIcon,
} from "lucide-react";

type Suggestion = {
  id: string;
  icon: LucideIcon;
  eyebrow: string;
  title: string;
  body: string;
  cta: string;
};

const suggestions: Suggestion[] = [
  {
    id: "onboarding",
    icon: MessageSquare,
    eyebrow: "FROM #DESIGN-TEAM · YESTERDAY",
    title: "Sarah's onboarding research is in",
    body: "Completion jumped from 34% to 67% in the revised flow. She set a 10am comp review tomorrow. I can summarize the findings and draft the prep doc now.",
    cta: "Summarize + prep",
  },
  {
    id: "alerts",
    icon: CheckCircle2,
    eyebrow: "SOP · TANKA 监控告警 · 9:00 AM",
    title: "Today's alert sweep, 全绿",
    body: "Daily scan finished. Nothing flagged. The SOP can close this morning, unless you want me to dig into Sunday's brief latency spike for context.",
    cta: "See report",
  },
  {
    id: "launch",
    icon: Pencil,
    eyebrow: "YOUR FOLLOW-UP · LAST WEEK",
    title: "Draft the launch announcement",
    body: "You flagged this for this week. I can pull the latest from design and eng channels and draft a first version in your voice. About ten minutes.",
    cta: "Draft now",
  },
];

const WEEKDAYS = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function formatEyebrow(d: Date) {
  const h = d.getHours();
  const band =
    h < 5 ? "LATE NIGHT" : h < 12 ? "MORNING" : h < 17 ? "AFTERNOON" : h < 22 ? "EVENING" : "LATE NIGHT";
  return `${WEEKDAYS[d.getDay()]} · ${MONTHS[d.getMonth()]} ${d.getDate()} · ${band}`;
}

function formatGreeting(name: string, d: Date) {
  const h = d.getHours();
  if (h < 5) return `Up late, ${name}.`;
  if (h < 12) return `Morning, ${name}.`;
  if (h < 17) return `Afternoon, ${name}.`;
  if (h < 22) return `Evening, ${name}.`;
  return `Up late, ${name}.`;
}

export default function V2Page() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
  }, []);

  const eyebrow = now ? formatEyebrow(now) : "";
  const greeting = now ? formatGreeting("Yiran", now) : "Afternoon, Yiran.";

  const [input, setInput] = useState("");
  const [acceptedIds, setAcceptedIds] = useState<Set<string>>(new Set());
  const [composerSent, setComposerSent] = useState<string | null>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const visibleSuggestions = useMemo(
    () => suggestions.filter((s) => !acceptedIds.has(s.id)),
    [acceptedIds],
  );

  function pickSuggestion(s: Suggestion) {
    setAcceptedIds((prev) => {
      const next = new Set(prev);
      next.add(s.id);
      return next;
    });
  }

  function undoPick(id: string) {
    setAcceptedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  function handleComposerKey(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleSubmit() {
    if (!input.trim()) return;
    setComposerSent(input.trim());
    setInput("");
  }

  return (
    <div className="h-full w-full overflow-y-auto bg-warm-bg-2">
      <div className="mx-auto w-full max-w-[680px] px-6 pt-20 pb-32">
        {/* Eyebrow + greeting */}
        <div className="text-[11px] font-medium uppercase tracking-[0.04em] text-warm-border min-h-[16px]">
          {eyebrow}
        </div>
        <h1 className="mt-4 text-[36px] leading-[40px] font-semibold tracking-tight text-warm-black">
          {greeting}
        </h1>

        {/* Tanka's opening message */}
        <div className="mt-12 flex items-start gap-4">
          <span
            className="w-8 h-8 rounded-[10px] bg-warm-black text-white text-[11px] font-bold flex items-center justify-center shrink-0 shadow-[0_2px_6px_rgba(38,32,28,0.18)]"
            aria-label="Tanka"
          >
            T
          </span>
          <div className="flex-1 min-w-0 pt-[3px]">
            <p className="text-[15px] leading-[1.6] text-warm-black m-0 max-w-[58ch]">
              Three things look open from this week. Pick one
              <span className="text-warm-2">, or tell me where you&apos;d rather start.</span>
            </p>

            {/* Suggestion list */}
            <div className="mt-5 flex flex-col gap-2.5">
              {suggestions.map((s) => {
                const accepted = acceptedIds.has(s.id);
                if (accepted) {
                  return (
                    <AcceptedRow
                      key={s.id}
                      title={s.title}
                      onUndo={() => undoPick(s.id)}
                    />
                  );
                }
                return (
                  <SuggestionCard key={s.id} item={s} onPick={() => pickSuggestion(s)} />
                );
              })}
            </div>

            {visibleSuggestions.length === 0 && (
              <p className="mt-5 text-[13px] text-warm-2 leading-[1.5]">
                All three picked up. I&apos;ll ping the team thread when each one&apos;s ready.
              </p>
            )}
          </div>
        </div>

        {/* Composer */}
        <div className="mt-12">
          <Composer
            inputRef={inputRef}
            value={input}
            onChange={setInput}
            onKeyDown={handleComposerKey}
            onSubmit={handleSubmit}
            placeholder="Reply, or start something else…"
          />

          {composerSent && (
            <div className="mt-4 flex items-start gap-3 text-[13px] leading-[1.6] text-warm-2">
              <span
                className="w-5 h-5 rounded-[6px] bg-warm-black text-white text-[8px] font-bold flex items-center justify-center shrink-0 mt-[1px]"
                aria-hidden
              >
                T
              </span>
              <span>
                <span className="text-warm-black">Got it.</span> Picking this up now —
                <span className="italic"> &ldquo;{composerSent}&rdquo;</span>. I&apos;ll ping you
                with a first read.
              </span>
            </div>
          )}
        </div>

        {/* Footnote: Tanka's posture */}
        <div className="mt-16 flex items-center gap-2 text-[12px] text-warm-2">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#10b981] shrink-0" aria-hidden />
          <span>
            Tanka is watching{" "}
            <span className="text-warm-black">#design-team</span>,{" "}
            <span className="text-warm-black">#incidents</span>, and{" "}
            <span className="text-warm-black">your follow-ups</span>.
          </span>
          <button
            type="button"
            className="ml-auto inline-flex items-center gap-1 text-warm-2 hover:text-warm-black transition-colors rounded-md px-1.5 py-1 hover:bg-warm-gray-2/60"
          >
            <Settings2 className="w-3.5 h-3.5" strokeWidth={1.7} />
            <span>Adjust</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- Suggestion card ---------- */

function SuggestionCard({
  item,
  onPick,
}: {
  item: Suggestion;
  onPick: () => void;
}) {
  const Icon = item.icon;
  return (
    <article
      className="group/sg rounded-xl border border-warm-gray-2 bg-white shadow-[0_1px_1.5px_rgba(38,32,28,0.02),0_4px_6px_rgba(38,32,28,0.02)] px-4 py-3.5 transition-shadow duration-200 hover:shadow-[0_2px_12px_rgba(38,32,28,0.06)]"
    >
      <div className="flex items-center gap-2 text-warm-border">
        <Icon className="w-3.5 h-3.5" strokeWidth={1.7} />
        <span className="text-[11px] font-medium uppercase tracking-[0.04em]">
          {item.eyebrow}
        </span>
      </div>
      <h3 className="mt-2 text-[14px] font-medium tracking-tight text-warm-black">
        {item.title}
      </h3>
      <p className="mt-1.5 text-[13px] leading-[1.55] text-warm-2 max-w-[54ch]">
        {item.body}
      </p>
      <div className="mt-3 flex items-center justify-between">
        <button
          type="button"
          className="text-[12px] text-warm-2 hover:text-warm-black transition-colors"
        >
          Tell me more
        </button>
        <button
          type="button"
          onClick={onPick}
          className="inline-flex items-center gap-1.5 h-8 px-3.5 rounded-md bg-warm-black text-white text-[13px] font-medium hover:bg-[#15110d] transition-colors"
        >
          <span>{item.cta}</span>
          <ArrowRight className="w-3.5 h-3.5" strokeWidth={2} />
        </button>
      </div>
    </article>
  );
}

/* ---------- Accepted row ---------- */

function AcceptedRow({ title, onUndo }: { title: string; onUndo: () => void }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-warm-bg border border-warm-gray-2/60 text-[13px] text-warm-2">
      <CheckCircle2 className="w-3.5 h-3.5 text-warm-black shrink-0" strokeWidth={2} />
      <span className="truncate">
        <span className="text-warm-black">Picked up.</span> {title}
      </span>
      <button
        type="button"
        onClick={onUndo}
        className="ml-auto text-[12px] text-warm-2 hover:text-warm-black transition-colors"
      >
        Undo
      </button>
    </div>
  );
}

/* ---------- Composer ---------- */

function Composer({
  inputRef,
  value,
  onChange,
  onKeyDown,
  onSubmit,
  placeholder,
}: {
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  value: string;
  onChange: (v: string) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onSubmit: () => void;
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
        ref={inputRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        rows={1}
        placeholder={placeholder}
        className="w-full bg-transparent text-[16px] leading-6 outline-none resize-none placeholder:text-warm-2 text-warm-black"
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
        <SendButton onClick={onSubmit} disabled={!value.trim()} />
      </div>
    </div>
  );
}

function ComposerTool({ children, title }: { children: React.ReactNode; title: string }) {
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

function SendButton({ onClick, disabled }: { onClick: () => void; disabled: boolean }) {
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
