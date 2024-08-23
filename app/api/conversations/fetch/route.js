import { NextResponse } from "next/server";
import { db } from "../../../../firebase.js";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export async function GET(req) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const conversationsRef = collection(db, "users", userId, "conversations");

    const q = query(conversationsRef, orderBy("timestamp", "desc")); //

    const querySnapshot = await getDocs(q);

    const conversations = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ conversations }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
