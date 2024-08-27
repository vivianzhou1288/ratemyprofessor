import { NextResponse } from "next/server";
import { db } from "../../../../firebase.js";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

export async function POST(req) {
  try {
    const { conversationId, userId, updatedConversation } = await req.json();

    if (!conversationId || !userId || !updatedConversation) {
      return NextResponse.json(
        {
          error: "Missing conversationId, userId, updatedConversation",
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

    const conversationDoc = await getDoc(conversationDocRef);

    if (!conversationDoc.exists()) {
      return NextResponse.json(
        { error: "Conversation not found" },
        { status: 404 }
      );
    }

    const existingConversation = conversationDoc.data().conversation || [];

    // Append the new message to the existing conversation array
    const uptodateConversation = [
      ...existingConversation,
      ...updatedConversation,
    ];

    await updateDoc(conversationDocRef, {
      conversation: uptodateConversation,
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
