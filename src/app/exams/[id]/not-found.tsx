import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-20 text-center">
      <h2 className="text-xl font-semibold text-zinc-900">
        資格が見つかりません
      </h2>
      <p className="text-sm text-zinc-500">
        お探しの資格は削除されたか、URLが変更された可能性があります。
      </p>
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
      >
        資格一覧に戻る
      </Link>
    </div>
  );
}
