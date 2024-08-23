import { auth, db } from "../../../../firebase.js";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST() {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);

    // Check if the user already exists in Firestore
    const userDoc = await getDoc(userRef);

    //If user does not exist, create a new document
    if (!userDoc.exists()) {
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        profilePicture: user.photoURL,
        fullName: user.displayName || "",
        createdAt: new Date(),
      });
    }

    // Retrieve the user data from Firestore
    const savedUserDoc = await getDoc(userRef);
    const userData = savedUserDoc.data();

    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
