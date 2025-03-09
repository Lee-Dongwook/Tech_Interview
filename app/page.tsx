export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold text-gray-900">
          🚀 기술 면접 대비 플랫폼
        </h1>
        <p className="mt-4 text-lg text-gray-700">
          프론트엔드, 백엔드, 데이터베이스 등 다양한 기술 면접 질문을 연습하고
          대비하세요.
        </p>
        <div className="mt-6 space-x-4">
          <a
            href="/questions"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700"
          >
            질문 연습하기
          </a>
          <a
            href="/login"
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg text-lg font-semibold hover:bg-gray-300"
          >
            로그인
          </a>
        </div>
      </div>
    </main>
  );
}
