import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase-config";
import { useQuery } from "@tanstack/react-query";

export const useQuestions = () => {
  return useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const querySnapshot = await getDocs(collection(db, "questions"));
      return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    },
  });
};
