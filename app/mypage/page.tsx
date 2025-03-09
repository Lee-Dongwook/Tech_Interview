"use client";

import { useEffect, useState } from "react";
import { auth } from "@/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function MyPage() {
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/login");
      } else {
        setUser(currentUser);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  if (!user) return <p className="text-center">로딩 중...</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">마이페이지</h1>
      <p className="mb-4">이메일: {user.email}</p>
      <button
        onClick={handleLogout}
        className="w-full bg-red-600 text-white py-2 rounded-lg"
      >
        로그아웃
      </button>
    </div>
  );
}
