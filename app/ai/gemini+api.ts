const PASSPORT_SCHEMA = {
  type: "object",
  properties: {
    fullName: { type: "string" },
    passportNumber: { type: "string" },
    nationality: { type: "string" },
    dateOfBirth: { type: "string", description: "ISO format YYYY-MM-DD" },
    expiryDate: { type: "string", description: "ISO format YYYY-MM-DD" },
  },
  required: [
    "fullName",
    "passportNumber",
    "nationality",
    "dateOfBirth",
    "expiryDate",
  ],
};

const EXTRACTION_PROMPT = `
You are reading the photo page of a passport. Extract exactly these fields
from the printed text and, if present, the MRZ (machine-readable zone) at
the bottom of the page — prefer the MRZ when the two disagree.

Return dates in ISO format (YYYY-MM-DD). If a field is unreadable, return
an empty string for it rather than guessing.
`;

const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent";

export async function POST(request: Request) {
  const { imageBase64, mimeType } = await request.json();

  if (!imageBase64 || !mimeType) {
    return Response.json(
      { error: "imageBase64 and mimeType are required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY ?? "",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { inlineData: { mimeType, data: imageBase64 } },
              { text: EXTRACTION_PROMPT },
            ],
          },
        ],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: PASSPORT_SCHEMA,
        },
      }),
      signal: AbortSignal.timeout(30000), // real, working 30s timeout
    });

    const raw = await response.text();

    if (!response.ok) {
      console.error("Gemini API error:", response.status, raw.slice(0, 500));
      return Response.json(
        { error: "Could not read the image" },
        { status: 502 },
      );
    }

    const body = JSON.parse(raw);
    const text = body.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Gemini returned no text:", JSON.stringify(body, null, 2));
      return Response.json(
        { error: "Could not read the image" },
        { status: 502 },
      );
    }

    return Response.json(JSON.parse(text));
  } catch (err) {
    console.error("Gemini extraction failed:", err);
    return Response.json(
      { error: "Could not read the image" },
      { status: 502 },
    );
  }
}
