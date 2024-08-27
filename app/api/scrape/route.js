import { NextResponse } from "next/server";
import axios from "axios";
import * as cheerio from "cheerio";
import { Pinecone } from "@pinecone-database/pinecone";

// const pinecone = new Pinecone({
//   apiKey: process.env.PINECONE_API_KEY,
// });
// const index = pinecone.index("rag").namespace("ns1");

const PINECONE_API_KEY = process.env.PINECONE_API_KEY;
const PINECONE_API_URL = "https://rag-ura4lp2.svc.aped-4627-b74a.pinecone.io";

const scrapeRMPData = async (url) => {
  try {
    const { data } = await axios.get(url);
    console.log(data);
    const $ = cheerio.load(data);
    const professor = $("div.NameTitle__Name-dowf0z-0").text().trim();
    console.log($("div.NameTitle__Name-dowf0z-0").text());
    const stars = $("div.RatingValue__Numerator-qw8sqy-2").text().trim();
    const subject = $("a.TeacherDepartment__StyledDepartmentLink-fl79e8-0")
      .text()
      .trim();

    console.log(
      "TeacherTags HTML:",
      $("div.TeacherTags__TagsContainer-sc-16vhm1y-0").html()
    );
    const comments = [];
    $("div.TeacherTags__TagsContainer-sc-16vhm1y-0 span.Tag-bs9vf4-0").each(
      (index, element) => {
        console.log("Element:", $(element).html());
        comments.push($(element).text().trim());
      }
    );
    return { professor, stars, subject, comments };
  } catch (error) {
    throw new Error("Failed to scrape data: " + error.message);
  }
};

const formatDataForPinecone = (data) => {
  // Implement embedding logic or use the raw text data
  return data.comments.map((comment, i) => ({
    id: `${data.name}_${i}`,
    values: [], // Embed comment here
    metadata: {
      professor: data.professor,
      comment: comment,
      subject: data.subject,
      stars: data.stars,
    },
  }));
};

export async function POST(req) {
  const { url } = await req.json();

  try {
    const data = await scrapeRMPData(url);
    console.log(data);
    const vectors = formatDataForPinecone(data);
    console.log(vectors);

    const response = await axios.post(
      PINECONE_API_URL,
      {
        upserts: vectors,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Api-Key": PINECONE_API_KEY,
        },
      }
    );

    return NextResponse.json({
      message: "Data successfully inserted into Pinecone",
      response: response.data,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
