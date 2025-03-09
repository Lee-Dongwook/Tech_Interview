"use client";

import React, { useState } from "react";
import { useQuestions } from "@/app/hooks/useQuestions";
import { Question } from "@/app/types";

const categories = ["all", "frontend", "backend", "database"];
const sortOptions = ["newest", "difficulty"];

export default function QuestionList() {
  const { data: questions, isLoading } = useQuestions();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  if (isLoading) return <p className="text-center">Loading...</p>;

  const filteredQuestions = questions
    ?.filter((q) =>
      selectedCategory === "all" ? true : q.category === selectedCategory
    )
    .filter((q) => q.question.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "newest") {
        return b.id.localeCompare(a.id);
      } else {
        const difficultyOrder = { easy: 1, medium: 2, hard: 3 };
        return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      }
    });

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 면접 질문 목록</h1>

      <input
        type="text"
        placeholder="검색어 입력..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />

      <div className="mb-4 flex space-x-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      >
        {sortOptions.map((option) => (
          <option key={option} value={option}>
            {option === "newest" ? "최신순" : "난이도별"}
          </option>
        ))}
      </select>

      {filteredQuestions?.map((q: Question) => (
        <div key={q.id} className="p-4 border rounded-lg shadow-md mb-4">
          <h3 className="text-lg font-semibold">{q.question}</h3>
          <p className="text-gray-600">{q.answer}</p>
          <span className="text-sm text-blue-500">{q.category}</span>
        </div>
      ))}
    </div>
  );
}
