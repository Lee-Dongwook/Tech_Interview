"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "@/firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState(auth.currentUser);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  return (
    <nav className="flex justify-between p-4 bg-gray-800 text-white">
      <Link href="/" className="font-bold text-lg">
        면접 대비
      </Link>
      <div className="space-x-4">
        <Link href="/questions">질문 목록</Link>
        {user ? (
          <>
            <Link href="/mypage">마이페이지</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-4 py-2 rounded-lg"
            >
              로그아웃
            </button>
          </>
        ) : (
          <>
            <Link href="/login">로그인</Link>
            <Link href="/signup">회원가입</Link>
          </>
        )}
      </div>
    </nav>
  );
}
