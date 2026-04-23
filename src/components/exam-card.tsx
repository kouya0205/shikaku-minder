import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ScheduleStatusBadge } from "@/components/schedule-status-badge";
import type { ExamWithSchedules } from "@/lib/types";
import {
  daysUntilDeadline,
  formatJp,
  getStatus,
  todayIso,
} from "@/lib/date";

export function ExamCard({ exam }: { exam: ExamWithSchedules }) {
  const today = todayIso();
  const nextSchedule =
    exam.schedules.find((s) => {
      const st = getStatus(s, today);
      return st === "open" || st === "closing" || st === "upcoming";
    }) ?? exam.schedules[0];

  const status = nextSchedule ? getStatus(nextSchedule, today) : "done";
  const daysLeft = nextSchedule ? daysUntilDeadline(nextSchedule, today) : 0;

  return (
    <Link
      href={`/exams/${exam.id}`}
      className="group block focus-visible:outline-none"
    >
      <Card className="h-full transition-shadow hover:shadow-md group-focus-visible:ring-2 group-focus-visible:ring-indigo-500">
        <div className="flex h-full flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge tone="neutral">{exam.category}</Badge>
            {nextSchedule && <ScheduleStatusBadge status={status} />}
            {nextSchedule?.is_cbt && <Badge tone="muted">CBT</Badge>}
          </div>

          <h3 className="text-base font-semibold tracking-tight text-zinc-900">
            {exam.name}
          </h3>

          <p className="line-clamp-2 text-sm text-zinc-600">
            {exam.description}
          </p>

          {nextSchedule ? (
            <dl className="mt-auto grid grid-cols-2 gap-x-3 gap-y-1 rounded-lg bg-zinc-50 p-3 text-xs">
              <dt className="text-zinc-500">次回試験日</dt>
              <dd className="text-right font-medium text-zinc-900">
                {formatJp(nextSchedule.exam_date)}
              </dd>
              <dt className="text-zinc-500">申込締切</dt>
              <dd className="text-right font-medium text-zinc-900">
                {status === "upcoming" ? (
                  <span>{formatJp(nextSchedule.app_start)} 開始</span>
                ) : status === "open" || status === "closing" ? (
                  <span
                    className={
                      status === "closing"
                        ? "font-semibold text-indigo-700"
                        : undefined
                    }
                  >
                    あと {daysLeft} 日
                  </span>
                ) : (
                  <span>{formatJp(nextSchedule.app_end)}</span>
                )}
              </dd>
            </dl>
          ) : (
            <div className="mt-auto rounded-lg bg-zinc-50 p-3 text-xs text-zinc-500">
              次回スケジュール未定
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}
