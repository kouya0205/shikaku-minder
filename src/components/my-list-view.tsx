"use client";

import Link from "next/link";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScheduleStatusBadge } from "@/components/schedule-status-badge";
import {
  daysUntilDeadline,
  formatJp,
  getStatus,
  todayIso,
} from "@/lib/date";
import { removeTracked } from "@/lib/storage";
import { useTracked } from "@/lib/use-tracked";
import type { Exam, Schedule, TrackedItem } from "@/lib/types";

type Row = {
  tracked: TrackedItem;
  exam: Exam;
  schedule: Schedule;
};

export function MyListView({
  exams,
  schedules,
}: {
  exams: Exam[];
  schedules: Schedule[];
}) {
  const items = useTracked();

  const rows = useMemo<Row[]>(() => {
    const examMap = new Map(exams.map((e) => [e.id, e]));
    const scheduleMap = new Map(schedules.map((s) => [s.id, s]));
    return items
      .map((tracked) => {
        const exam = examMap.get(tracked.examId);
        const schedule = scheduleMap.get(tracked.scheduleId);
        if (!exam || !schedule) return null;
        return { tracked, exam, schedule };
      })
      .filter((r): r is Row => r !== null)
      .sort((a, b) =>
        a.schedule.app_end.localeCompare(b.schedule.app_end),
      );
  }, [items, exams, schedules]);

  return (
    <div className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          マイリスト
        </h1>
        <p className="mt-1 text-sm text-zinc-600">
          登録済みの資格スケジュールを申込締切の近い順に表示しています。
          データはこのブラウザにのみ保存されます。
        </p>
      </section>

      {rows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-200 bg-white px-6 py-16 text-center">
          <p className="text-sm text-zinc-500">
            まだマイリストに登録された資格はありません。
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            資格を探しに行く
          </Link>
        </div>
      ) : (
        <ol className="flex flex-col gap-3">
          {rows.map(({ tracked, exam, schedule }) => {
            const today = todayIso();
            const status = getStatus(schedule, today);
            const days = daysUntilDeadline(schedule, today);
            const imminent = status === "closing";

            return (
              <li
                key={`${tracked.examId}-${tracked.scheduleId}`}
                className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex flex-1 flex-col gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone="neutral">{exam.category}</Badge>
                      <ScheduleStatusBadge status={status} />
                      {schedule.is_cbt && <Badge tone="muted">CBT</Badge>}
                    </div>
                    <Link
                      href={`/exams/${exam.id}`}
                      className="text-base font-semibold text-zinc-900 hover:text-indigo-700"
                    >
                      {exam.name}
                    </Link>
                    <p className="text-xs text-zinc-500">
                      {schedule.term_label}
                    </p>
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs sm:grid-cols-3">
                      <dt className="text-zinc-500">申込締切</dt>
                      <dd
                        className={
                          imminent
                            ? "font-semibold text-indigo-700"
                            : "font-medium text-zinc-900"
                        }
                      >
                        {formatJp(schedule.app_end)}
                        {(status === "open" || status === "closing") && (
                          <span className="ml-1">(あと {days} 日)</span>
                        )}
                      </dd>
                      <dt className="text-zinc-500">試験日</dt>
                      <dd className="font-medium text-zinc-900">
                        {formatJp(schedule.exam_date)}
                      </dd>
                    </dl>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      removeTracked(tracked.examId, tracked.scheduleId)
                    }
                    aria-label="マイリストから削除"
                  >
                    削除
                  </Button>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
