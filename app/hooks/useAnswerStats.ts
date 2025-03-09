import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, db } from "@/firebase-config";
import {
  collection,
  query,
  where,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

interface AnswerStats {
  total: number;
  correct: number;
  incorrect: number;
}

export const useAnwserStats = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const fetchAnswerStats = async (): Promise<AnswerStats | null> => {
    if (!userId) return null;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    return (
      querySnapshot.docs[0].data().answerStats || {
        total: 0,
        correct: 0,
        incorrect: 0,
      }
    );
  };

  const { data: answerStats } = useQuery({
    queryKey: ["answerStats", userId],
    queryFn: () => fetchAnswerStats(),
    enabled: !!userId,
  });

  const updateAnswerStats = useMutation({
    mutationFn: async (isCorrect: boolean) => {
      if (!userId || !answerStats) throw new Error("로그인이 필요합니다");
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("사용자 문서를 찾을 수 없습니다.");
      }

      const userDocRef = querySnapshot.docs[0].ref;
      const updatedStats = {
        total: answerStats.total + 1,
        correct: answerStats.correct + (isCorrect ? 1 : 0),
        incorrect: answerStats.incorrect + (!isCorrect ? 1 : 0),
      };

      await updateDoc(userDocRef, { answerStats: updatedStats });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["answerStats", userId] });
    },
  });

  return { answerStats, updateAnswerStats };
};
