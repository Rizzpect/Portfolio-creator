import { PortfolioGenerator } from './renderer.js';

/**
 * Portfolio template engine
 * Generates the complete markdown portfolio from user data
 * @param {Object} userData - User profile data
 * @param {Object} options - Generator options
 * @returns {Promise<string>} Generated markdown
 */
export async function generatePortfolio(userData, options = {}) {
  const generator = new PortfolioGenerator(options);
  return await generator.generate(userData);
}

/**
 * Generate a section by type
 * @param {string} type - Section type
 * @param {Object} content - Section content
 * @returns {string} Rendered markdown
 */
export function generateSection(type, content) {
  const generator = new PortfolioGenerator({});
  return generator.renderSectionByType(type, content);
}
