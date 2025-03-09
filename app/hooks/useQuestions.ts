import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useQuery } from "@tanstack/react-query";
import { Question } from "@/app/types";

export const useQuestions = () => {
  return useQuery<Question[], Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Question[];
    },
  });
};
