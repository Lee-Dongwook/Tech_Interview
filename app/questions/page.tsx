"use client";

import React from "react";
import { useQuestions } from "@/app/hooks/useQuestions";
import { Question } from "@/app/types";

export default function QuestionList() {
  const { data: questions, isLoading } = useQuestions();

  if (isLoading) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 면접 질문 목록</h1>
      {questions?.map((q: Question) => (
        <div key={q.id} className="p-4 border rounded-lg shadow-md mb-4">
          <h3 className="text-lg font-semibold">{q.question}</h3>
          <p className="text-gray-600">{q.answer}</p>
          <span className="text-sm text-blue-500">{q.category}</span>
        </div>
      ))}
    </div>
  );
}
