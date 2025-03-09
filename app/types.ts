export interface Question {
  id: string;
  question: string;
  answer: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}
