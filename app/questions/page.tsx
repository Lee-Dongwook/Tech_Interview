"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuestions } from "@/app/hooks/useQuestions";
import { Question } from "@/app/types";

const categories = ["all", "frontend", "backend", "database"];
const sortOptions = ["newest", "difficulty"];
const QUESTIONS_PER_PAGE = 5;

export default function QuestionList() {
  const { data: questions, isLoading } = useQuestions();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

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

  const totalPages = Math.ceil(
    (filteredQuestions?.length || 0) / QUESTIONS_PER_PAGE
  );

  const paginatedQuestions = filteredQuestions?.slice(
    (currentPage - 1) * QUESTIONS_PER_PAGE,
    currentPage * QUESTIONS_PER_PAGE
  );

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📝 면접 질문 목록</h1>

      <div className="mb-4 flex items-center space-x-2">
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
              className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                selectedCategory === category
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
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

      {paginatedQuestions?.map((q: Question) => (
        <div
          className="p-4 border rounded-lg shadow-md mb-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
          key={q.id}
        >
          <Link href={`/questions/${q.id}`} key={q.id}>
            <h3 className="text-lg font-semibold text-blue-700 mb-2">
              {q.question}
            </h3>
            <p className="text-gray-600 mb-2">{q.answer}</p>
            <span className="px-2 py-1 bg-blue-100 text-sm text-blue-600 rounded">
              {q.category}
            </span>
          </Link>
        </div>
      ))}

      <div className="flex justify-between mt-6 items-center">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          이전 페이지
        </button>

        <span className="text-lg font-semibold">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
            currentPage === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          다음 페이지
        </button>
      </div>
    </div>
  );
}
