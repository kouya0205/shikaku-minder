import { Badge } from "@/components/ui/badge";
import type { ScheduleStatus } from "@/lib/types";
import { statusLabel } from "@/lib/date";

export function ScheduleStatusBadge({ status }: { status: ScheduleStatus }) {
  const tone =
    status === "open"
      ? "brand"
      : status === "closing"
        ? "warning"
        : status === "upcoming"
          ? "muted"
          : "neutral";
  return <Badge tone={tone}>{statusLabel(status)}</Badge>;
}
