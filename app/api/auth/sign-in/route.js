import { auth, signInWithEmailAndPassword } from "../../../../firebase.js";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { email, password } = await req.json();
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const userRef = doc(db, "users", user.uid);

    // Retrieve the user data from Firestore
    const savedUserDoc = await getDoc(userRef);
    const userData = savedUserDoc.data();

    if (!userDoc.exists()) {
      return new NextResponse.json(
        { error: "User data not found in Firestore" },
        { status: 404 }
      );
    }

    return NextResponse.json({ userData }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
