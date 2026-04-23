"use client";

import { Button } from "@/components/ui/button";
import { toggleTracked } from "@/lib/storage";
import { useIsTracked } from "@/lib/use-tracked";

export function TrackButton({
  examId,
  scheduleId,
  size = "md",
}: {
  examId: string;
  scheduleId: string;
  size?: "sm" | "md" | "lg";
}) {
  const tracked = useIsTracked(examId, scheduleId);

  return (
    <Button
      variant={tracked ? "subtle" : "outline"}
      size={size}
      onClick={() => toggleTracked(examId, scheduleId)}
      aria-pressed={tracked}
      suppressHydrationWarning
    >
      <span suppressHydrationWarning>
        {tracked ? "★ マイリスト登録中" : "☆ マイリストに追加"}
      </span>
    </Button>
  );
}
