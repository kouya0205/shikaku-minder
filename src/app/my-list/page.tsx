import { MyListView } from "@/components/my-list-view";
import { fetchAllExams, fetchAllSchedules } from "@/lib/notion";

export const metadata = {
  title: "マイリスト | シカクマインダー",
};

export default async function MyListPage() {
  const [exams, schedules] = await Promise.all([
    fetchAllExams(),
    fetchAllSchedules(),
  ]);
  return <MyListView exams={exams} schedules={schedules} />;
}
