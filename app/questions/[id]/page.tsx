"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase-config";
import { Question } from "@/app/types";

export default function QuestionDetailPage() {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchQuestion = async () => {
      setLoading(true);
      const docRef = doc(db, "questions", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setQuestion({ id: docSnap.id, ...docSnap.data() } as Question);
      }

      setLoading(false);
    };

    fetchQuestion();
  }, [id]);

  if (loading) return <p className="text-center">Loading...</p>;
  if (!question) return <p className="text-center">질문을 찾을 수 없습니다.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">{question.question}</h1>
      <p className="mt-4 text-lg text-gray-700">{question.answer}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {question.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1 bg-blue-200 text-blue-800 rounded-lg text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      <div className="mt-4 text-sm text-gray-500">
        카테고리: <span className="font-semibold">{question.category}</span> |
        난이도:{" "}
        <span className="font-semibold capitalize">{question.difficulty}</span>
      </div>

      <a
        href="/questions"
        className="mt-6 inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        🔙 질문 목록으로 돌아가기
      </a>
    </div>
  );
}
