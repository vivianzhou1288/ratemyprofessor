import { NextResponse } from "next/server";
import { db } from "../../../../firebase.js";
import {
  doc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
} from "firebase/firestore";

export async function POST(req) {
  try {
    const { conversationId, userId, updatedConversation, name } =
      await req.json();

    if (!conversationId || !userId || !updatedConversation || !name) {
      return NextResponse.json(
        {
          error: "Missing conversationId, userId, updatedConversation, or name",
        },
        { status: 400 }
      );
    }

    const conversationDocRef = doc(
      db,
      "users",
      userId,
      "conversations",
      conversationId
    );

    await updateDoc(conversationDocRef, {
      conversation: arrayUnion(updatedConversation),
      lastUpdated: serverTimestamp(),
    });

    return NextResponse.json(
      { message: "Conversation updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
