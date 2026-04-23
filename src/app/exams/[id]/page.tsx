import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScheduleTimeline } from "@/components/schedule-timeline";
import { AffiliateSection } from "@/components/affiliate-section";
import { fetchAllExams, fetchExamWithSchedules } from "@/lib/notion";

export async function generateStaticParams() {
  const exams = await fetchAllExams();
  return exams.map((exam) => ({ id: exam.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exam = await fetchExamWithSchedules(id);
  if (!exam) return { title: "資格が見つかりません | シカクマインダー" };
  return {
    title: `${exam.name} | シカクマインダー`,
    description: exam.description,
  };
}

export default async function ExamDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const exam = await fetchExamWithSchedules(id);
  if (!exam) notFound();

  return (
    <div className="flex flex-col gap-8">
      <nav className="text-sm">
        <Link href="/" className="text-zinc-500 hover:text-indigo-700">
          ← 資格一覧に戻る
        </Link>
      </nav>

      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="neutral">{exam.category}</Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 sm:text-3xl">
          {exam.name}
        </h1>
        <p className="text-sm leading-relaxed text-zinc-700">
          {exam.description}
        </p>
        <a
          href={exam.official_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center gap-1 text-sm font-medium text-indigo-700 hover:underline"
        >
          公式サイトを開く →
        </a>
      </header>

      <section>
        <h2 className="mb-4 text-lg font-semibold tracking-tight text-zinc-900">
          試験日程タイムライン
        </h2>
        <ScheduleTimeline exam={exam} schedules={exam.schedules} />
      </section>

      <AffiliateSection config={exam.affiliate_config} />
    </div>
  );
}
