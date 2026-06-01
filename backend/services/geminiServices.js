const axios = require('axios');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function analyzeIssue(description) {

  const prompt = `
Analyze this infrastructure complaint.

Complaint:
${description}

Respond ONLY with valid JSON.

{
  "category":"CIVIL",
  "severity":"HIGH"
}

Allowed categories:
CIVIL
ELECTRICAL
WATER

Allowed severity:
LOW
MEDIUM
HIGH
CRITICAL

Do not include explanations.
Do not use markdown.
Return JSON only.
`;

  try {

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        contents: [
          {
            parts: [
              {
                text: prompt
              }
            ]
          }
        ]
      }
    );

    return response.data.candidates[0]
      .content.parts[0].text;

  } catch (error) {

    console.error(error.message);

    return null;
  }
}

module.exports = {
  analyzeIssue
};