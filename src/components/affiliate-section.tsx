import { Badge } from "@/components/ui/badge";
import type { AffiliateConfig } from "@/lib/types";

const kindLabel: Record<"book" | "course" | "service", string> = {
  book: "書籍",
  course: "講座",
  service: "サービス",
};

export function AffiliateSection({ config }: { config: AffiliateConfig }) {
  if (!config.items.length) return null;

  return (
    <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-5">
      <div className="mb-4 flex items-center gap-2">
        <h2 className="text-sm font-semibold text-zinc-900">
          推奨学習リソース
        </h2>
        <span className="text-xs text-zinc-500">(PR)</span>
      </div>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {config.items.map((item) => (
          <li key={item.title}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="flex h-full flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center gap-2">
                <Badge tone="neutral">{kindLabel[item.kind]}</Badge>
                <span className="text-xs text-zinc-500">{item.vendor}</span>
              </div>
              <span className="text-sm font-medium text-zinc-900">
                {item.title}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
