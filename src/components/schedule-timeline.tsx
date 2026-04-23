import { Badge } from "@/components/ui/badge";
import { ScheduleStatusBadge } from "@/components/schedule-status-badge";
import { ScheduleActions } from "@/components/schedule-actions";
import {
  daysUntilDeadline,
  formatJp,
  getStatus,
  todayIso,
} from "@/lib/date";
import type { Exam, Schedule } from "@/lib/types";

export function ScheduleTimeline({
  exam,
  schedules,
}: {
  exam: Exam;
  schedules: Schedule[];
}) {
  const today = todayIso();

  if (schedules.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-zinc-200 bg-white px-6 py-10 text-center text-sm text-zinc-500">
        現在登録されているスケジュールはありません。
      </div>
    );
  }

  return (
    <ol className="flex flex-col gap-4">
      {schedules.map((schedule) => {
        const status = getStatus(schedule, today);
        const daysLeft = daysUntilDeadline(schedule, today);

        return (
          <li
            key={schedule.id}
            className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base font-semibold text-zinc-900">
                {schedule.term_label}
              </h3>
              <ScheduleStatusBadge status={status} />
              {schedule.is_cbt && <Badge tone="muted">CBT</Badge>}
            </div>

            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <TimelineField
                label="申込開始"
                value={formatJp(schedule.app_start)}
              />
              <TimelineField
                label="申込締切"
                value={formatJp(schedule.app_end)}
                hint={
                  status === "open" || status === "closing"
                    ? `あと ${daysLeft} 日`
                    : undefined
                }
                highlight={status === "closing"}
              />
              <TimelineField
                label="試験日"
                value={formatJp(schedule.exam_date)}
                highlight
              />
            </div>

            <div className="mt-5 border-t border-zinc-100 pt-4">
              <ScheduleActions exam={exam} schedule={schedule} />
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function TimelineField({
  label,
  value,
  hint,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div>
      <dt className="text-xs text-zinc-500">{label}</dt>
      <dd
        className={`mt-1 text-sm font-semibold ${
          highlight ? "text-indigo-700" : "text-zinc-900"
        }`}
      >
        {value}
      </dd>
      {hint && (
        <p className="mt-0.5 text-xs font-medium text-indigo-700">{hint}</p>
      )}
    </div>
  );
}
