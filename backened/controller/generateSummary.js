const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

export const generateSummary = async (req, res) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const { role, company, startDate, endDate } = req.body;

    const prompt = `Generate a 3-4 sentence resume job description for the role of ${role} at ${company} from ${startDate} to ${endDate}. Use bullet points.`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    res.json({ success: true, summary: text });
  } catch (error) {
    console.error("Error generating summary:", error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
