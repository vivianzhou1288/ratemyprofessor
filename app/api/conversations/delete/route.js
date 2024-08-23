import { NextResponse } from "next/server";
import { db } from "../../../../firebase.js";
import { doc, deleteDoc } from "firebase/firestore";

export async function DELETE(req) {
  try {
    const { conversationId, userId } = await req.json();

    if (!conversationId || !userId) {
      return NextResponse.json(
        { error: "Missing conversationId or userId" },
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

    await deleteDoc(conversationDocRef);

    return NextResponse.json(
      { message: "Conversation deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message || "An error occurred" },
      { status: 500 }
    );
  }
}
