import { writeFile, mkdir } from 'fs/promises';
import { dirname } from 'path';
import chalk from 'chalk';

/**
 * Formatting utilities for portfolio generation
 */

/**
 * Save portfolio markdown to file
 * @param {string} markdown - Generated markdown content
 * @param {string} outputPath - Output file path
 */
export async function savePortfolio(markdown, outputPath = 'README.md') {
  try {
    // Ensure directory exists
    const dir = dirname(outputPath);
    if (dir && dir !== '.') {
      await mkdir(dir, { recursive: true });
    }
    
    // Write the file
    await writeFile(outputPath, markdown, 'utf-8');
    
    return true;
  } catch (error) {
    console.error(chalk.red(`Failed to save portfolio: ${error.message}`));
    throw error;
  }
}

/**
 * Create a banner/header text
 * @param {string} text - Text to convert to banner
 * @param {string} style - Banner style
 * @returns {string} Formatted banner
 */
export function createBanner(text, style = 'default') {
  const styles = {
    default: {
      top: '═'.repeat(text.length + 4),
      bottom: '═'.repeat(text.length + 4),
      side: '║'
    },
    bold: {
      top: '█'.repeat(text.length + 4),
      bottom: '█'.repeat(text.length + 4),
      side: '█'
    },
    dotted: {
      top: '·'.repeat(text.length + 4),
      bottom: '·'.repeat(text.length + 4),
      side: '·'
    }
  };
  
  const s = styles[style] || styles.default;
  
  return `
${s.top}
${s.side} ${text} ${s.side}
${s.bottom}
`;
}

/**
 * Create a skill badge
 * @param {string} skill - Skill name
 * @param {string} color - Badge color (hex)
 * @returns {string} Badge markdown
 */
export function createBadge(skill, color = '007acc') {
  const encoded = encodeURIComponent(skill);
  return `![${skill}](https://img.shields.io/badge/${encoded}-${color}?style=flat)`;
}

/**
 * Create a link with icon
 * @param {string} text - Link text
 * @param {string} url - Link URL
 * @param {string} icon - Icon emoji
 * @returns {string} Formatted link
 */
export function createLink(text, url, icon = '🔗') {
  return `${icon} [${text}](${url})`;
}

/**
 * Create a table row
 * @param {Array} cells - Table cell values
 * @param {Array} alignments - Column alignments ('left', 'center', 'right')
 * @returns {string} Table row
 */
export function createTableRow(cells, alignments = []) {
  const alignMap = {
    left: ':--',
    center: ':--:',
    right: '--:'
  };
  
  const cols = cells.map((cell, i) => {
    const align = alignments[i] || 'left';
    return cell || '';
  });
  
  // Create header row
  let row = '| ' + cols.join(' | ') + ' |\n';
  
  // Create separator row
  const sep = alignments.map(a => alignMap[a] || ':--').join(' | ');
  row += '| ' + sep + ' |\n';
  
  return row;
}

/**
 * Create a stats badge URL
 * @param {string} username - GitHub username
 * @param {string} type - Stats type (stats, languages, streak)
 * @returns {string} Stats image URL
 */
export function createStatsUrl(username, type = 'stats') {
  const baseUrl = 'https://github-readme-stats.vercel.app/api';
  
  switch (type) {
    case 'stats':
      return `${baseUrl}?username=${username}&show_icons=true&theme=radical&hide_border=true&count_private=true`;
    case 'languages':
      return `${baseUrl}/top-langs/?username=${username}&layout=compact&theme=radical&hide_border=true`;
    case 'streak':
      return `https://streak-stats.demolab.com/?user=${username}&theme=radical&hide_border=true`;
    default:
      return '';
  }
}

/**
 * Create a section divider
 * @param {string} style - Divider style
 * @returns {string} Divider
 */
export function createDivider(style = 'default') {
  const dividers = {
    default: '---',
    double: '═══',
    dotted: '···',
    stars: '⭐⭐⭐',
    dashed: '- - -'
  };
  
  return dividers[style] || dividers.default;
}

/**
 * Format a list of items with emojis
 * @param {Array} items - List items
 * @param {Array} emojis - Emojis to use (cycles through)
 * @returns {string} Formatted list
 */
export function formatListWithEmojis(items, emojis = ['•']) {
  return items.map((item, i) => {
    const emoji = emojis[i % emojis.length];
    return `${emoji} ${item}`;
  }).join('\n');
}

/**
 * Create a collapsible section (GitHub markdown)
 * @param {string} title - Section title
 * @param {string} content - Collapsed content
 * @returns {string} Collapsible section
 */
export function createCollapsible(title, content) {
  return `<details>
<summary>${title}</summary>

${content}

</details>`;
}

/**
 * Format social links with icons
 * @param {Object} socials - Social links object
 * @returns {string} Formatted social links
 */
export function formatSocialLinks(socials) {
  const icons = {
    github: '🐙',
    linkedin: '💼',
    twitter: '🐦',
    youtube: '📺',
    website: '🌐',
    email: '📧'
  };
  
  const links = [];
  
  for (const [platform, url] of Object.entries(socials)) {
    if (url && url.trim()) {
      const icon = icons[platform] || '🔗';
      links.push(`- ${icon} [${capitalize(platform)}](${url})`);
    }
  }
  
  return links.join('\n');
}

/**
 * Helper to capitalize string
 */
function capitalize(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}
