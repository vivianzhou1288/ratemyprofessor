import { NextResponse } from "next/server";
import { db } from "../../../../firebase.js";
import { doc, addDoc, collection, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const { conversation, userId, name } = await req.json();
    if (!conversation || !userId || !name) {
      return NextResponse.json(
        { error: "Missing userId, conversation, or name" },
        { status: 400 }
      );
    }
    const userDocRef = doc(db, "users", userId);
    const conversationRef = await addDoc(
      collection(userDocRef, "conversations"),
      {
        name: name,
        conversation: conversation,
        timestamp: serverTimestamp(),
      }
    );
    return NextResponse.json(
      {
        message: "Conversation added successfully",
        conversationId: conversationRef.id,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
