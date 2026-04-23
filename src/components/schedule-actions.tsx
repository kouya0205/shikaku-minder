"use client";

import { Button } from "@/components/ui/button";
import { TrackButton } from "@/components/track-button";
import { buildGoogleCalendarUrl, downloadIcs } from "@/lib/calendar";
import type { Exam, Schedule } from "@/lib/types";

export function ScheduleActions({
  exam,
  schedule,
}: {
  exam: Exam;
  schedule: Schedule;
}) {
  const googleUrl = buildGoogleCalendarUrl(exam, schedule, "exam");

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
      <Button
        onClick={() => {
          window.open(googleUrl, "_blank", "noopener,noreferrer");
        }}
      >
        Googleカレンダーに追加
      </Button>
      <Button
        variant="outline"
        onClick={() => downloadIcs(exam, schedule)}
      >
        .ics ダウンロード (Apple/他)
      </Button>
      <TrackButton examId={exam.id} scheduleId={schedule.id} />
    </div>
  );
}
