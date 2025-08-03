import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_AI_API_KEY);

export const generateSummaryforjob = async (
  role,
  company,
  startDate,
  endDate,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";

    if (role && company && startDate && endDate) {
      prompt = `Write a 2-3 line resume summary for the role of "${role}" at "${company}" from ${startDate} to ${endDate}. 
Each point should be on a new line as a standalone sentence. 
Do NOT use any bullets, dashes, asterisks, or numbering at the beginning of the lines. 
Just return clean plain lines.`;
    } else {
      prompt = `Write a general 3-4 line resume summary for a candidate with unspecified role and company. 
Each point should be on a new line as a standalone sentence. 
Do NOT use any bullets, dashes, asterisks, or numbering at the beginning of the lines. 
Just return clean plain lines.`;
    }

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating summary:", error);
    throw new Error("Failed to generate summary");
  } finally {
    setIsLoading(false);
  }
};

export const generateSummaryForEducation = async (
  degree,
  institution,
  startDate,
  endDate,
  setIsLoading
) => {
  try {
    setIsLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";

    if (degree && institution && startDate && endDate) {
      prompt = `Write a 1 line resume summary for education in "${degree}" at "${institution}" from ${startDate} to ${endDate}. 
Focus on academic achievements, coursework, leadership roles, or other relevant accomplishments.
Each point should be on a new line as a standalone sentence. 
Do NOT use any bullets, dashes, asterisks, or numbering at the beginning of the lines. 
Just return clean plain lines.`;
    } else {
      prompt = `Write a general 3-4 line resume education summary. 
Focus on academic achievements, relevant coursework, or leadership in school/college.
Each point should be on a new line as a standalone sentence. 
Do NOT use any bullets, dashes, asterisks, or numbering at the beginning of the lines. 
Just return clean plain lines.`;
    }

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating education summary:", error);
    throw new Error("Failed to generate education summary");
  } finally {
    setIsLoading(false);
  }
};

export const generateSummaryForProject = async (title, setIsLoading) => {
  try {
    setIsLoading(true);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    let prompt = "";

    if (title) {
      prompt = `Write a 2-3 line resume description for a project titled "${title}". 
Focus on key features, technologies used, and the impact or outcome. 
Each line should be a complete standalone sentence. 
Do NOT use bullets, numbers, dashes, or asterisks. 
Return plain text lines only.`;
    } else {
      prompt = `Write a general 3-4 line resume project description for an unspecified software project. 
Highlight common features, development practices, and potential impact. 
Each line must be a standalone sentence without bullets, numbers, or symbols.`;
    }

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error("Error generating project summary:", error);
    throw new Error("Failed to generate project summary");
  } finally {
    setIsLoading(false);
  }
};
