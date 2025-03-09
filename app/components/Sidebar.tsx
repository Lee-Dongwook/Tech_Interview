"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-100 p-4 border border-gray-700">
      <h2 className="text-xl font-bold mb-4">📚 메뉴</h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/questions"
            className="block p-2 rounded-lg hover:bg-gray-300"
          >
            질문 목록
          </Link>
        </li>
        <li>
          <Link
            href="/mypage"
            className="block p-2 rounded-lg hover:bg-gray-300"
          >
            마이페이지
          </Link>
        </li>
      </ul>
    </aside>
  );
}
