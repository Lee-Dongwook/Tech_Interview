import { auth, db } from "@/firebase-config";
import { doc, updateDoc } from "firebase/firestore";

export const uploadProfileImage = async (file: File) => {
  if (!auth.currentUser) throw new Error("로그인이 필요합니다.");

  const userId = auth.currentUser.uid;
  const userDocRef = doc(db, "users", userId);

  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      let base64Image = reader.result as string;

      const img = new Image();
      img.src = base64Image;
      img.onload = async () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const maxSize = 200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxSize) {
            height *= maxSize / width;
            width = maxSize;
          }
        } else {
          if (height > maxSize) {
            width *= maxSize / height;
            height = maxSize;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);
        base64Image = canvas.toDataURL("image/jpeg", 0.7);

        await updateDoc(userDocRef, { profileImage: base64Image });

        resolve(base64Image);
      };
    };
    reader.onerror = (error) => reject(error);
  });
};
