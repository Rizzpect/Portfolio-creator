/**
 * Input validation utilities
 */

/**
 * Validate GitHub username
 * @param {string} username - GitHub username
 * @returns {Object} Validation result
 */
export function validateGitHubUsername(username) {
  if (!username) {
    return { valid: false, error: 'GitHub username is required' };
  }
  
  // GitHub usernames: alphanumeric, hyphens, underscores, 1-39 chars
  const regex = /^[a-zA-Z0-9]([a-zA-Z0-9-_]{0,38}[a-zA-Z0-9])?$/;
  
  if (!regex.test(username)) {
    return { valid: false, error: 'Invalid GitHub username format' };
  }
  
  return { valid: true };
}

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {Object} Validation result
 */
export function validateURL(url) {
  if (!url) {
    return { valid: false, error: 'URL is required' };
  }
  
  try {
    new URL(url);
    return { valid: true };
  } catch {
    return { valid: false, error: 'Invalid URL format' };
  }
}

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {Object} Validation result
 */
export function validateEmail(email) {
  if (!email) {
    return { valid: false, error: 'Email is required' };
  }
  
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!regex.test(email)) {
    return { valid: false, error: 'Invalid email format' };
  }
  
  return { valid: true };
}

/**
 * Validate name (non-empty)
 * @param {string} name - Name to validate
 * @returns {Object} Validation result
 */
export function validateName(name) {
  if (!name || name.trim().length === 0) {
    return { valid: false, error: 'Name is required' };
  }
  
  if (name.trim().length < 2) {
    return { valid: false, error: 'Name must be at least 2 characters' };
  }
  
  if (name.length > 100) {
    return { valid: false, error: 'Name must be less than 100 characters' };
  }
  
  return { valid: true };
}

/**
 * Sanitize input to prevent markdown injection
 * @param {string} input - Input to sanitize
 * @returns {string} Sanitized input
 */
export function sanitizeInput(input) {
  if (!input) return '';
  
  return input
    .replace(/\[/g, '\\[')
    .replace(/\]/g, '\\]')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)')
    .replace(/`/g, '\\`')
    .trim();
}

/**
 * Validate social link platform
 * @param {string} platform - Platform name
 * @returns {Object} Validation result
 */
export function validatePlatform(platform) {
  const validPlatforms = ['github', 'linkedin', 'twitter', 'youtube', 'website', 'email'];
  
  if (!platform) {
    return { valid: false, error: 'Platform is required' };
  }
  
  if (!validPlatforms.includes(platform.toLowerCase())) {
    return { valid: false, error: `Invalid platform. Valid: ${validPlatforms.join(', ')}` };
  }
  
  return { valid: true };
}

/**
 * Validate section type
 * @param {string} type - Section type
 * @returns {Object} Validation result
 */
export function validateSectionType(type) {
  const validTypes = [
    'achievements',
    'experience',
    'education',
    'skills',
    'projects',
    'blog',
    'stats',
    'languages',
    'funfacts',
    'contact',
    'custom'
  ];
  
  if (!type) {
    return { valid: false, error: 'Section type is required' };
  }
  
  if (!validTypes.includes(type.toLowerCase())) {
    return { valid: false, error: `Invalid section type. Valid: ${validTypes.join(', ')}` };
  }
  
  return { valid: true };
}
