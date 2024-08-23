import { auth, signOut } from "../../../../firebase.js";

export async function POST() {
  try {
    await signOut(auth);
    return NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
