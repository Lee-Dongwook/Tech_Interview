import { auth, db } from "@/firebase-config";
import { doc, updateDoc, getDoc } from "firebase/firestore";

export const updateUserStats = async (isCorrect: boolean) => {
  if (!auth.currentUser) throw new Error("로그인이 필요합니다.");

  const userId = auth.currentUser.uid;
  const userDocRef = doc(db, "users", userId);

  try {
    const userSnap = await getDoc(userDocRef);

    if (!userSnap.exists()) {
      console.error("❌ 유저 데이터 없음");
      return;
    }

    const userData = userSnap.data();
    console.log("📊 Firestore에서 가져온 데이터:", userData);

    const currentStats = userData?.answerStats ?? {
      total: 0,
      correct: 0,
      incorrect: 0,
    };

    console.log("✅ 기존 정답 통계:", currentStats);

    const updatedStats = {
      total: currentStats.total + 1,
      correct: currentStats.correct + (isCorrect ? 1 : 0),
      incorrect: currentStats.incorrect + (!isCorrect ? 1 : 0),
    };

    console.log("🔄 업데이트된 정답 통계:", updatedStats);

    await updateDoc(userDocRef, { answerStats: updatedStats });

    console.log("✅ Firestore 업데이트 완료!");
  } catch (error) {
    console.error("🔥 Firestore 업데이트 중 오류 발생:", error);
  }
};
