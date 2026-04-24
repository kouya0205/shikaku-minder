import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ScheduleTimeline } from "@/components/schedule-timeline";
import { AffiliateSection } from "@/components/affiliate-section";
import { fetchAllExams, fetchExamWithSchedules } from "@/lib/notion";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shikaku-minder.pages.dev";

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
  if (!exam) return { title: "資格が見つかりません" };

  const title = `${exam.name} 試験日程・申込期間`;
  const description = `${exam.name}の最新試験日・申込締切日を確認。${exam.description}`;
  const url = `${SITE_URL}/exams/${id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      images: [{ url: "/img/shikaku-minder-ogp.png", width: 2563, height: 1354, alt: exam.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/img/shikaku-minder-ogp.png"],
    },
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

  const nextSchedule = exam.schedules[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: exam.name,
    description: exam.description,
    url: exam.official_url,
    provider: { "@type": "Organization", name: "シカクマインダー", url: SITE_URL },
    ...(nextSchedule && {
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: nextSchedule.is_cbt ? "online" : "onsite",
        startDate: nextSchedule.exam_date,
        endDate: nextSchedule.exam_date,
      },
    }),
  };

  return (
    <div className="flex flex-col gap-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
