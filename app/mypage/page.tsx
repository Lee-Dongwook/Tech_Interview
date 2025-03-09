"use client";

import { useEffect, useState } from "react";
import { auth, db } from "@/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useUser } from "@/app/hooks/useUser";
import { useRouter } from "next/navigation";
import { uploadProfileImage } from "@/app/utils/uploadProfileImage";
import { Doughnut } from "react-chartjs-2";
import { useAnwserStats } from "@/app/hooks/useAnswerStats";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function MyPage() {
  const router = useRouter();
  const { userProfile, updateUserProfile } = useUser();
  const { answerStats } = useAnwserStats();
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (userProfile) {
      setName(userProfile.name || "");
    }
  }, [userProfile]);

  const chartData = {
    labels: ["맞힌 문제", "틀린 문제"],
    datasets: [
      {
        data: [answerStats?.correct, answerStats?.incorrect],
        backgroundColor: ["#4CAF50", "#FF5252"],
      },
    ],
  };

  const handleUpdateProfile = async () => {
    await updateUserProfile.mutateAsync({ name });
  };

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!image) return;
    setUploading(true);
    try {
      const imageUrl = await uploadProfileImage(image);
      await updateUserProfile.mutateAsync({ profileImage: imageUrl });
    } catch (error) {
      console.error("프로필 사진 업로드 실패", error);
    }
    setUploading(false);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
      <p className="mb-4">이메일: {userProfile?.email}</p>

      <div className="mb-4 text-center">
        <img
          src={
            userProfile?.profileImage && userProfile.profileImage !== ""
              ? userProfile.profileImage
              : "/default-avatar.png"
          }
          alt="프로필 사진"
          className="w-24 h-24 rounded-full mx-auto border"
        />
      </div>

      <p className="mb-2">총 푼 문제: {answerStats?.total || 0}</p>
      <Doughnut data={chartData} />

      <div className="mb-4">
        <input
          type="file"
          onChange={handleImageChange}
          accept="image/*"
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          disabled={!image || uploading}
          className="w-full bg-green-600 text-white py-2 rounded-lg disabled:bg-gray-400"
        >
          {uploading ? "업로드 중..." : "프로필 사진 업로드 완료"}
        </button>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />
      <button
        onClick={handleUpdateProfile}
        className="w-full bg-blue-600 text-white py-2 rounded-lg mb-4"
      >
        프로필 업데이트
      </button>

      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded-lg"
      >
        로그아웃
      </button>
    </div>
  );
}
