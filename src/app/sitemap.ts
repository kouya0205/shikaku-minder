import type { MetadataRoute } from "next";

export const dynamic = "force-static";
import { fetchAllExams } from "@/lib/notion";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shikaku-minder.pages.dev";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const exams = await fetchAllExams();

  const examUrls: MetadataRoute.Sitemap = exams.map((exam) => ({
    url: `${BASE}/exams/${exam.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    ...examUrls,
  ];
}
