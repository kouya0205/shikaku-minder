"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { ExamCard } from "@/components/exam-card";
import type { ExamCategory, ExamWithSchedules } from "@/lib/types";
import { cn } from "@/lib/cn";

const ALL_CATEGORIES: ExamCategory[] = [
  "IT",
  "ビジネス",
  "語学",
  "法律",
  "金融",
  "医療",
  "技術",
  "デザイン",
  "教育",
  "不動産",
];

export function SearchView({ exams }: { exams: ExamWithSchedules[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ExamCategory | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return exams.filter((exam) => {
      if (category && exam.category !== category) return false;
      if (!q) return true;
      return (
        exam.name.toLowerCase().includes(q) ||
        exam.description.toLowerCase().includes(q) ||
        exam.category.toLowerCase().includes(q)
      );
    });
  }, [exams, query, category]);

  return (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
            資格を探す
          </h1>
          <p className="mt-1 text-sm text-zinc-600">
            国内トップ30資格の最新日程を検索。申込期限をマイリストで管理できます。
          </p>
        </div>

        <div className="relative">
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="資格名・キーワードで検索（例: 簿記、TOEIC、IT）"
            aria-label="資格を検索"
            autoFocus
          />
        </div>

        <div className="-mx-1 flex flex-wrap gap-2 px-1">
          <FilterChip
            active={category === null}
            onClick={() => setCategory(null)}
            label="すべて"
          />
          {ALL_CATEGORIES.map((c) => (
            <FilterChip
              key={c}
              active={category === c}
              onClick={() => setCategory(c === category ? null : c)}
              label={c}
            />
          ))}
        </div>
      </section>

      <section>
        <p className="mb-3 text-xs text-zinc-500">
          {filtered.length} 件の資格が見つかりました
        </p>
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-200 bg-white px-6 py-16 text-center">
            <p className="text-sm text-zinc-500">
              該当する資格が見つかりませんでした。
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((exam) => (
              <ExamCard key={exam.id} exam={exam} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-full px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "bg-indigo-600 text-white"
          : "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50",
      )}
      aria-pressed={active}
    >
      {label}
    </button>
  );
}
