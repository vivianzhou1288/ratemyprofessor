import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

// import fetch from "node-fetch";
// globalThis.fetch = fetch;

const { GoogleGenerativeAI } = require("@google/generative-ai");
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

// const openai = new OpenAI({
//   baseURL: "https://openrouter.ai/api/v1",
//   apiKey: $OPENROUTER_API_KEY,
// });

// try {
//   const { prompt } = await request.json();
//   const completion = await openai.chat.completions.create({
//     model: "meta-llama/llama-3.1-8b-instruct:free",
//     messages: [{ role: "user", content: systemPrompt }],
//   });
//   return NextResponse.json({
//     message: completion.choices[0].message.content,
//   });
// } catch (error) {
//   return NextResponse.json(
//     { error: "Error generating completion" },
//     { status: 500 }
//   );
// }

const systemPrompt = `
You are a Rate My Professor AI agent designed to assist students in finding classes by answering their questions. For every user question, if the user specifies a subject, return the top 3 professors whose subjects align with the one mentioned in the user's question. If the user does not provide a subject, provide recommendations for teachers from a variety of subjects, ensuring the recommendations cover different areas like Business Administration, Math, Literature, Physics, and Art History. Use the professors' information to provide relevant and accurate answers.

`;

export async function POST(req) {
  try {
    const data = await req.json();
    const pc = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY,
    });
    const index = pc.index("rag").namespace("ns1");

    const text = data[data.length - 1].content;

    // Initialize Google Generative AI (Gemini) client
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    // Get the text embedding model
    const model = genAI.getGenerativeModel({ model: "text-embedding-004" });

    // Get the embedding from Gemini
    const result = await model.embedContent(text);
    const embedding = result.embedding.values; // Assuming `values` contains the embedding
    // console.log(result);
    // console.log(embedding);

    // Query Pinecone with the Gemini embedding
    // const results = await index.query({
    //   topK: 5,
    //   includeMetadata: true,
    //   vector: embedding,
    // });

    const results = await index.query({
      topK: 5,
      includeMetadata: true,
      vector: embedding,
    });
    console.log("Pinecone query results:", results);

    // console.log(results);

    // Format the results
    let resultString = "";
    results.matches.forEach((match) => {
      resultString += `
      Returned Results:
      Professor: ${match.id}
      Review: ${match.metadata.review}
      Subject: ${match.metadata.subject}
      Stars: ${match.metadata.stars}
      `;
    });

    // console.log(results);
    const lastMessage = data[data.length - 1];
    // console.log(lastMessage);
    const lastMessageContent = lastMessage.content + resultString;
    // console.log(lastMessageContent);
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);
    // console.log(lastDataWithoutLastMessage);

    const conversationHistory = [
      { role: "system", content: systemPrompt },
      ...lastDataWithoutLastMessage,
      { role: "user", content: lastMessageContent },
    ];
    // console.log(conversationHistory);

    const generateModel = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
    });

    async function run() {
      const prompt = conversationHistory
        .map((message) => `${message.role}: ${message.content}`)
        .join("\n");

      const result = await generateModel.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return text;
    }

    const generatedText = await run();
    console.log("Generated Text to Return:", generatedText);

    return NextResponse.json({ result: generatedText });
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
