import { auth, signInWithEmailAndPassword } from "../../../../firebase.js";
import { NextResponse } from "next/server";
import { db } from "../../../../firebase.js";
import { doc, getDoc } from "firebase/firestore";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    // Sign in the user with Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    // Get a reference to the user's document in Firestore
    const userRef = doc(db, "users", user.uid);

    // Retrieve the user data from Firestore
    const savedUserDoc = await getDoc(userRef);

    if (!savedUserDoc.exists()) {
      return NextResponse.json(
        { error: "User data not found in Firestore" },
        { status: 404 }
      );
    }

    const userData = savedUserDoc.data();

    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    console.error("Sign-in error:", error); // Added for debugging
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
