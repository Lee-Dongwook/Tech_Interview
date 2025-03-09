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

interface UserProfile {
  uid: string;
  name: string;
  email: string;
  profileImage: string;
  bookmarkedQuestions?: string[];
}

export const useUser = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, []);

  const fetchUserProfile = async () => {
    if (!userId) return null;

    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "==", userId));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return null;

    return {
      id: querySnapshot.docs[0].id,
      ...(querySnapshot.docs[0].data() as UserProfile),
    };
  };

  const { data: userProfile } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => fetchUserProfile(),
    enabled: !!userId,
  });

  const updateUserProfile = useMutation({
    mutationFn: async (updatedData: Partial<UserProfile>) => {
      if (!userId || !userProfile) throw new Error("로그인이 필요합니다");
      const userRef = collection(db, "users");
      const q = query(userRef, where("uid", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        throw new Error("사용자 문서를 찾을 수 없습니다.");
      }

      const userDocRef = querySnapshot.docs[0].ref;
      await updateDoc(userDocRef, { ...updatedData, updatedAt: new Date() });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userProfile", userId] });
    },
  });

  return { userProfile, updateUserProfile };
};
