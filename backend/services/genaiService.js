const axios = require('axios');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const API_KEY = process.env.GEMINI_API_KEY;

// Utility function to format the response for better readability
function formatResponse(response) {
  // We can make adjustments here to add bullet points, headings, etc.
  return response.trim().replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Highlighting bold text
    .replace(/\*(.*?)\*/g, '<em>$1</em>') // Emphasizing italicized text
    .replace(/\n/g, '<br>'); // Ensuring line breaks for readability
}

async function callGemini(prompt) {
  const response = await axios.post(`${GEMINI_API_URL}?key=${API_KEY}`, {
    contents: [{ parts: [{ text: prompt }] }]
  });
  return response.data.candidates[0].content.parts[0].text;
}

// Step 1: Classify Bloom’s Taxonomy level
async function classifyBloomLevel(userQuery) {
  const prompt = `Classify the following question according to Bloom's Taxonomy (Remembering, Understanding, Applying, Analyzing, Evaluating, Creating). Return only the level:\n"${userQuery}"`;
  const level = await callGemini(prompt);
  return formatResponse(level);
}

// Step 2: Personalize query and get response
async function getPersonalizedResponse(originalQuery, level) {
  // const modifyPrompt = `You are an personalized educational assistant. Modify the following query to match the ${level} level of Bloom’s Taxonomy. Provide only one improved version of the query, clear and concise, suitable for a student: "${originalQuery}" \nGive me only the final modified query in response.`;
  const modifyPrompt = `You are a personalized educational assistant. Modify the following student query to match the "${level}" level of Bloom’s Taxonomy. Rewrite it as a clear, concise, and level-appropriate question that encourages deeper understanding. If appropriate, include a example to help illustrate the concept. Provide only the final modified query in your response: "${originalQuery}"`;
  const personalizedQuery = await callGemini(modifyPrompt);
  // console.log(modifyPrompt, "MP");
  // console.log(personalizedQuery, "PQ");
  const answerPrompt = `"${personalizedQuery}"`;
  // console.log(answerPrompt, "AP");
  const finalAnswer = await callGemini(answerPrompt);
  // console.log(finalAnswer, "FA");
  // Return the personalized query and the final answer, both formatted
  return {
    personalizedQuery: formatResponse(personalizedQuery),
    finalAnswer: formatResponse(finalAnswer)
  };
}

module.exports = {
  classifyBloomLevel,
  getPersonalizedResponse
};
