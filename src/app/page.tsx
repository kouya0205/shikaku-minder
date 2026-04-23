import { SearchView } from "@/components/search-view";
import { fetchAllExamsWithSchedules } from "@/lib/notion";

export default async function Home() {
  const exams = await fetchAllExamsWithSchedules();
  return <SearchView exams={exams} />;
}
