import { auth, db } from "../../../../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password, fullName } = await req.json();
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      fullName: fullName || "",
      createdAt: new Date(),
    });

    // Retrieve the saved user data from Firestore
    const userDoc = await getDoc(userRef);
    const userData = userDoc.data();

    return NextResponse.json({ userData }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
