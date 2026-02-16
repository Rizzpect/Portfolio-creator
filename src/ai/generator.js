import { GoogleGenerativeAI } from '@google/generative-ai';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Generate portfolio using Gemini AI
 * @param {string} apiKey - User's Gemini API key
 * @param {string} prompt - User's description of themselves
 * @param {string} username - GitHub username
 * @returns {Promise<string>} Generated markdown portfolio
 */
export async function generateAIPortfolio(apiKey, prompt, username) {
  const spinner = ora({
    text: '🤖 AI is crafting your portfolio...',
    spinner: 'dots'
  });
  
  try {
    spinner.start();
    
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const systemPrompt = `You are a GitHub profile README expert. Create a stunning, professional GitHub profile README in markdown format for a developer based on their description. 

Include these sections when relevant:
- Header with name and title
- About Me section
- Skills (use shields.io badges)
- Projects (with descriptions)
- GitHub Stats (use github-readme-stats.vercel.app)
- Contact/Social links

Make it unique, creative, and professional. Use emojis appropriately.
For badges, use format: ![Skill](https://img.shields.io/badge/SkillName-COLOR?style=flat&logo=SkillName&logoColor=white)

Generate ONLY the markdown, no explanations.`;

    const result = await model.generateContent([
      { text: systemPrompt },
      { text: `GitHub Username: ${username}\n\nAbout me: ${prompt}` }
    ]);
    
    const response = await result.response;
    const markdown = response.text();
    
    spinner.succeed('✨ AI generated your portfolio!');
    
    return markdown;
    
  } catch (error) {
    spinner.fail('❌ AI generation failed');
    throw new Error(`AI Error: ${error.message}`);
  }
}
