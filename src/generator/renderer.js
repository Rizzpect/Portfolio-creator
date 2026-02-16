/**
 * Portfolio Renderer - Creates GitHub-compatible markdown with rich features
 */

export class PortfolioGenerator {
  constructor(config = {}) {
    this.config = config;
    this.username = '';
  }

  /**
   * Generate the complete portfolio markdown
   * @param {Object} userData - User profile data
   * @returns {Promise<string>} Complete markdown
   */
  async generate(userData) {
    this.username = userData.username || '';
    
    const sections = [];
    
    // Header with banner
    sections.push(this.renderHeader(userData));
    
    // About section
    if (userData.bio || userData.title) {
      sections.push(this.renderAbout(userData));
    }
    
    // Social links
    if (userData.social && userData.social.length > 0) {
      sections.push(this.renderSocialLinks(userData.social));
    }
    
    // Custom sections
    if (userData.sections && userData.sections.length > 0) {
      for (const section of userData.sections) {
        sections.push(this.renderSectionByType(section.type, section.content, section.title));
      }
    }
    
    // Footer
    sections.push(this.renderFooter());
    
    return sections.join('\n');
  }

  /**
   * Render the header with banner and profile info
   */
  renderHeader(userData) {
    const name = userData.name || 'Your Name';
    const title = userData.title || '';
    
    let header = `# 👋 Hi, I'm ${name}!\n\n`;
    
    if (title) {
      header += `> ${title}\n\n`;
    }
    
    // Badges row
    header += `<p align="left">\n`;
    
    // Location badge (if provided)
    if (userData.location) {
      header += `  <a href="#">\n    <img src="https://img.shields.io/badge/-${encodeURIComponent(userData.location)}-blue?style=flat&logo=map-pin&logoColor=white&color=0077b6" alt="${userData.location}" />\n  </a>\n`;
    }
    
    // Email badge
    if (userData.email) {
      header += `  <a href="mailto:${userData.email}">\n    <img src="https://img.shields.io/badge/-Email-red?style=flat&logo=gmail&logoColor=white&color=EA4335" alt="Email" />\n  </a>\n`;
    }
    
    header += `</p>\n\n`;
    
    header += `---\n\n`;
    
    return header;
  }

  /**
   * Render about section
   */
  renderAbout(userData) {
    let about = `## 📝 About Me\n\n`;
    
    if (userData.bio) {
      about += `${userData.bio}\n\n`;
    }
    
    // Quick stats
    about += `###  Quick Stats\n\n`;
    about += `| ⭐ Stars | 👀 Views | 🍴 Forks |\n`;
    about += `|:---:|:---:|:---:|\n`;
    about += `| 0 | 0 | 0 |\n\n`;
    
    return about;
  }

  /**
   * Render social links
   */
  renderSocialLinks(socials) {
    if (!socials || socials.length === 0) return '';
    
    let links = `## 🔗 Connect With Me\n\n`;
    
    const iconMap = {
      github: '🐙',
      linkedin: '💼',
      twitter: '🐦',
      youtube: '📺',
      website: '🌐',
      email: '📧'
    };
    
    for (const social of socials) {
      const icon = iconMap[social.platform] || '🔗';
      links += `- ${icon} [${this.capitalize(social.platform)}](${social.url})\n`;
    }
    
    links += '\n';
    return links;
  }

  /**
   * Render a section by its type
   */
  renderSectionByType(type, content, title = '') {
    switch (type) {
      case 'achievements':
        return this.renderAchievements(content);
      case 'experience':
        return this.renderExperience(content);
      case 'education':
        return this.renderEducation(content);
      case 'skills':
        return this.renderSkills(content);
      case 'projects':
        return this.renderProjects(content);
      case 'blog':
        return this.renderBlog(content);
      case 'stats':
        return this.renderStats(content);
      case 'languages':
        return this.renderLanguages(content);
      case 'funfacts':
        return this.renderFunFacts(content);
      case 'contact':
        return this.renderContact(content);
      case 'custom':
        return this.renderCustom(title, content);
      default:
        return '';
    }
  }

  /**
   * Render achievements section
   */
  renderAchievements(achievements) {
    if (!achievements || achievements.length === 0) return '';
    
    let section = `## 🏆 Achievements & Awards\n\n`;
    
    for (const item of achievements) {
      section += `### 🎖️ ${item.title}\n\n`;
      if (item.description) {
        section += `${item.description}\n\n`;
      }
      if (item.date) {
        section += `*${item.date}*\n\n`;
      }
    }
    
    return section;
  }

  /**
   * Render experience section
   */
  renderExperience(experiences) {
    if (!experiences || experiences.length === 0) return '';
    
    let section = `## 💼 Work Experience\n\n`;
    
    for (const exp of experiences) {
      section += `### 🏢 ${exp.role}\n`;
      section += `**${exp.company}**`;
      if (exp.duration) {
        section += ` | ${exp.duration}`;
      }
      section += `\n\n`;
      
      if (exp.description) {
        // Convert newlines to bullet points
        const descLines = exp.description.split(/[.\n]/).filter(d => d.trim());
        for (const line of descLines) {
          if (line.trim()) {
            section += `- ${line.trim()}\n`;
          }
        }
        section += '\n';
      }
    }
    
    return section;
  }

  /**
   * Render education section
   */
  renderEducation(education) {
    if (!education || education.length === 0) return '';
    
    let section = `## 🎓 Education\n\n`;
    
    section += `| 🎓 Degree | 🏫 Institution | 📅 Year |\n`;
    section += `|:---|:---|:---|\n`;
    
    for (const edu of education) {
      section += `| ${edu.degree || '-'} | ${edu.school || '-'} | ${edu.year || '-'} |\n`;
    }
    
    section += '\n';
    return section;
  }

  /**
   * Render skills section with shields.io badges
   */
  renderSkills(skills) {
    if (!skills || Object.keys(skills).length === 0) return '';
    
    let section = `## 🛠️ Skills & Technologies\n\n`;
    
    // Programming Languages
    if (skills.languages && skills.languages.length > 0) {
      section += `### 💻 Programming Languages\n\n`;
      for (const lang of skills.languages) {
        const badge = this.createSkillBadge(lang);
        section += `${badge} `;
      }
      section += '\n\n';
    }
    
    // Frameworks
    if (skills.frameworks && skills.frameworks.length > 0) {
      section += `### 🧩 Frameworks & Libraries\n\n`;
      for (const fw of skills.frameworks) {
        const badge = this.createSkillBadge(fw);
        section += `${badge} `;
      }
      section += '\n\n';
    }
    
    // Tools
    if (skills.tools && skills.tools.length > 0) {
      section += `### 🔧 Tools & Software\n\n`;
      for (const tool of skills.tools) {
        const badge = this.createSkillBadge(tool);
        section += `${badge} `;
      }
      section += '\n\n';
    }
    
    // Databases
    if (skills.databases && skills.databases.length > 0) {
      section += `### 🗄️ Databases\n\n`;
      for (const db of skills.databases) {
        const badge = this.createSkillBadge(db);
        section += `${badge} `;
      }
      section += '\n\n';
    }
    
    return section;
  }

  /**
   * Create a skill badge using shields.io
   */
  createSkillBadge(skill) {
    const encodedSkill = encodeURIComponent(skill);
    // Use a generic skill badge with different colors based on hash
    const colors = ['007acc', 'e34c26', '563d7c', '2b7489', '1572b6', 'ff6b6b', '4a154b', '0db7ed'];
    const colorIndex = skill.length % colors.length;
    
    return `![${skill}](https://img.shields.io/badge/${encodedSkill}-${colors[colorIndex]}?style=flat&logo=${encodedSkill}&logoColor=white)`;
  }

  /**
   * Render projects section
   */
  renderProjects(projects) {
    if (!projects || projects.length === 0) return '';
    
    let section = `## 📂 Featured Projects\n\n`;
    
    for (const project of projects) {
      section += `### 📁 ${project.name}\n\n`;
      
      if (project.description) {
        section += `${project.description}\n\n`;
      }
      
      // Tech stack badges
      if (project.tech && project.tech.length > 0) {
        for (const t of project.tech) {
          section += `![${t}](https://img.shields.io/badge/${encodeURIComponent(t)}-gray?style=flat&color=gray) `;
        }
        section += '\n\n';
      }
      
      // Links
      const links = [];
      if (project.github) {
        links.push(`[🐙 Code](${project.github})`);
      }
      if (project.link) {
        links.push(`[🚀 Live Demo](${project.link})`);
      }
      
      if (links.length > 0) {
        section += links.join(' | ') + '\n\n';
      }
    }
    
    return section;
  }

  /**
   * Render blog section
   */
  renderBlog(blogs) {
    if (!blogs || blogs.length === 0) return '';
    
    let section = `## ✍️ Recent Blog Posts\n\n`;
    
    for (const blog of blogs) {
      section += `- 📝 [${blog.title}](${blog.link})`;
      if (blog.description) {
        section += ` - ${blog.description}`;
      }
      section += '\n';
    }
    
    section += '\n';
    return section;
  }

  /**
   * Render GitHub stats section
   */
  renderStats(statsConfig) {
    if (!statsConfig) return '';
    
    let section = `## 📊 GitHub Stats\n\n`;
    
    // Use GitHub readme-stats
    section += `<p align="center">\n`;
    
    if (statsConfig.showStats !== false && this.username) {
      section += `  <img src="https://github-readme-stats.vercel.app/api?username=${this.username}&show_icons=true&theme=radical&hide_border=true&count_private=true" alt="GitHub Stats" height="180" />\n`;
    }
    
    if (statsConfig.showTopLang !== false && this.username) {
      section += `  <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${this.username}&layout=compact&theme=radical&hide_border=true" alt="Top Languages" height="180" />\n`;
    }
    
    section += `</p>\n\n`;
    
    if (statsConfig.showStreak !== false && this.username) {
      section += `---\n\n`;
      section += `### 🔥 GitHub Streak\n\n`;
      section += `[![GitHub Streak](https://streak-stats.demolab.com/?user=${this.username}&theme=radical&hide_border=true)](https://git.io/streak-stats)\n\n`;
    }
    
    return section;
  }

  /**
   * Render languages section
   */
  renderLanguages(languages) {
    if (!languages || languages.length === 0) return '';
    
    let section = `## 🌐 Languages\n\n`;
    
    const levelEmojis = {
      'Native': '🌟',
      'Fluent': '💯',
      'Advanced': '🔥',
      'Intermediate': '👍',
      'Basic': '📚'
    };
    
    for (const lang of languages) {
      const emoji = levelEmojis[lang.level] || '📖';
      section += `- ${emoji} **${lang.language}** - ${lang.level}\n`;
    }
    
    section += '\n';
    return section;
  }

  /**
   * Render fun facts section
   */
  renderFunFacts(facts) {
    if (!facts || facts.length === 0) return '';
    
    let section = `## 💬 Fun Facts About Me\n\n`;
    
    const emojis = ['🎉', '🚀', '💡', '🎮', '📚', '🎵', '🏃', '🍕', '🌟', '⚡'];
    
    for (let i = 0; i < facts.length; i++) {
      const emoji = emojis[i % emojis.length];
      section += `${emoji} ${facts[i]}\n`;
    }
    
    section += '\n';
    return section;
  }

  /**
   * Render contact section
   */
  renderContact(contact) {
    if (!contact || Object.values(contact).every(v => !v)) return '';
    
    let section = `## 📫 Contact Me\n\n`;
    
    if (contact.email) {
      section += `- 📧 **Email:** [${contact.email}](mailto:${contact.email})\n`;
    }
    if (contact.website) {
      section += `- 🌐 **Website:** [${contact.website}](${contact.website})\n`;
    }
    if (contact.linkedin) {
      section += `- 💼 **LinkedIn:** [Profile](${contact.linkedin})\n`;
    }
    if (contact.twitter) {
      section += `- 🐦 **Twitter:** [${contact.twitter}](${contact.twitter})\n`;
    }
    
    section += '\n';
    return section;
  }

  /**
   * Render custom section
   */
  renderCustom(title, content) {
    if (!title || !content) return '';
    
    let section = `## ${title}\n\n`;
    section += `${content}\n\n`;
    
    return section;
  }

  /**
   * Render footer
   */
  renderFooter() {
    return `---
<div align="center">

### 🤝 Let's Connect!

Feel free to reach out if you're looking for a developer, have a question, or just want to connect!

⭐️ From [${this.username || 'Developer'}](https://github.com/${this.username || ''})

</div>
`;
  }

  /**
   * Helper to capitalize first letter
   */
  capitalize(str) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}
