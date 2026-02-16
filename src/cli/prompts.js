import inquirer from 'inquirer';
import chalk from 'chalk';
import ora from 'ora';

/**
 * Interactive questionnaire module for collecting user portfolio information
 */

/**
 * Main function to run the interactive questionnaire
 * @returns {Promise<Object>} User profile data
 */
export async function runInteractiveMode() {
  console.log(chalk.blue('\n👋 Welcome! Let\'s create your amazing portfolio!\n'));
  console.log(chalk.gray('Answer what you can, skip what you don\'t know.\n'));

  const spinner = ora({
    text: 'Loading questions...',
    spinner: 'dots'
  });

  const userData = {
    sections: []
  };

  // Step 1: Basic Info
  const basicInfo = await askBasicInfo();
  Object.assign(userData, basicInfo);

  // Step 2: Ask about sections they want to add
  const sectionsToAdd = await askWhatSections();
  
  // Step 3: Collect each section
  for (const sectionType of sectionsToAdd) {
    const section = await collectSection(sectionType);
    if (section) {
      userData.sections.push(section);
    }
  }

  // Step 4: Social links
  const socialLinks = await askSocialLinks();
  if (socialLinks && socialLinks.length > 0) {
    userData.social = socialLinks;
  }

  return userData;
}

/**
 * Ask for basic user information
 */
async function askBasicInfo() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: '👤 What\'s your name?',
      validate: (input) => input.trim().length > 0 || 'Please enter your name'
    },
    {
      type: 'input',
      name: 'username',
      message: '🔗 What\'s your GitHub username?',
      validate: (input) => input.trim().length > 0 || 'Please enter your GitHub username'
    },
    {
      type: 'input',
      name: 'bio',
      message: '📝 A short bio (what you do, your passion)?'
    },
    {
      type: 'input',
      name: 'avatar',
      message: '🖼️ Avatar/Profile image URL (optional)?'
    },
    {
      type: 'input',
      name: 'title',
      message: '💼 Your title/role (e.g., Full Stack Developer)?'
    }
  ]);

  return answers;
}

/**
 * Ask what sections the user wants to add
 */
async function askWhatSections() {
  const availableSections = [
    { name: '🏆 Achievements & Awards', value: 'achievements' },
    { name: '💼 Work Experience', value: 'experience' },
    { name: '🎓 Education', value: 'education' },
    { name: '🛠️ Skills & Technologies', value: 'skills' },
    { name: '📂 Projects', value: 'projects' },
    { name: '📝 Blog / Writing', value: 'blog' },
    { name: '📊 GitHub Stats', value: 'stats' },
    { name: '🌐 Languages', value: 'languages' },
    { name: '💬 Fun Facts', value: 'funfacts' },
    { name: '📫 Contact Info', value: 'contact' },
    { name: '➕ Custom Section', value: 'custom' }
  ];

  const answer = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'sections',
      message: '✨ What would you like to include in your portfolio? (Select all that apply)',
      choices: availableSections,
      pageSize: 15
    }
  ]);

  return answer.sections;
}

/**
 * Collect data for a specific section type
 * @param {string} sectionType - Type of section to collect
 */
async function collectSection(sectionType) {
  switch (sectionType) {
    case 'achievements':
      return await collectAchievements();
    case 'experience':
      return await collectExperience();
    case 'education':
      return await collectEducation();
    case 'skills':
      return await collectSkills();
    case 'projects':
      return await collectProjects();
    case 'blog':
      return await collectBlog();
    case 'stats':
      return await collectStats();
    case 'languages':
      return await collectLanguages();
    case 'funfacts':
      return await collectFunFacts();
    case 'contact':
      return await collectContact();
    case 'custom':
      return await collectCustom();
    default:
      return null;
  }
}

/**
 * Collect achievements/awards
 */
async function collectAchievements() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '🏆 Add Achievements & Awards section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const achievements = [];
  let addMore = true;

  while (addMore) {
    const item = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: '🏆 Achievement title:'
      },
      {
        type: 'input',
        name: 'description',
        message: '📋 Description:'
      },
      {
        type: 'input',
        name: 'date',
        message: '📅 Date (optional):'
      }
    ]);

    if (item.title) {
      achievements.push(item);
    }

    const more = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addMore',
        message: '➕ Add another achievement?',
        default: false
      }
    ]);
    addMore = more.addMore;
  }

  return {
    title: '🏆 Achievements & Awards',
    type: 'achievements',
    content: achievements
  };
}

/**
 * Collect work experience
 */
async function collectExperience() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '💼 Add Work Experience section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const experiences = [];
  let addMore = true;

  while (addMore) {
    const item = await inquirer.prompt([
      {
        type: 'input',
        name: 'role',
        message: '💼 Job title/role:'
      },
      {
        type: 'input',
        name: 'company',
        message: '🏢 Company:'
      },
      {
        type: 'input',
        name: 'duration',
        message: '📅 Duration (e.g., 2020 - Present):'
      },
      {
        type: 'input',
        name: 'description',
        message: '📋 What did you do? (describe your work)'
      }
    ]);

    if (item.role && item.company) {
      experiences.push(item);
    }

    const more = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addMore',
        message: '➕ Add another job?',
        default: false
      }
    ]);
    addMore = more.addMore;
  }

  return {
    title: '💼 Work Experience',
    type: 'experience',
    content: experiences
  };
}

/**
 * Collect education
 */
async function collectEducation() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '🎓 Add Education section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const education = [];
  let addMore = true;

  while (addMore) {
    const item = await inquirer.prompt([
      {
        type: 'input',
        name: 'degree',
        message: '🎓 Degree/Certificate:'
      },
      {
        type: 'input',
        name: 'school',
        message: '🏫 School/University:'
      },
      {
        type: 'input',
        name: 'year',
        message: '📅 Year:'
      },
      {
        type: 'input',
        name: 'description',
        message: '📋 Description (optional):'
      }
    ]);

    if (item.degree && item.school) {
      education.push(item);
    }

    const more = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addMore',
        message: '➕ Add another education?',
        default: false
      }
    ]);
    addMore = more.addMore;
  }

  return {
    title: '🎓 Education',
    type: 'education',
    content: education
  };
}

/**
 * Collect skills
 */
async function collectSkills() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '🛠️ Add Skills & Technologies section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const skills = {};
  
  // Programming Languages
  const langAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '💻 Add Programming Languages?',
      default: true
    }
  ]);
  
  if (langAnswer.add) {
    const langs = await inquirer.prompt([
      {
        type: 'input',
        name: 'list',
        message: '💻 List programming languages (comma separated):',
        filter: (input) => input.split(',').map(s => s.trim()).filter(s => s)
      }
    ]);
    if (langs.list && langs.list.length > 0) {
      skills.languages = langs.list;
    }
  }

  // Frameworks
  const frameworkAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '🧩 Add Frameworks & Libraries?',
      default: true
    }
  ]);
  
  if (frameworkAnswer.add) {
    const frameworks = await inquirer.prompt([
      {
        type: 'input',
        name: 'list',
        message: '🧩 List frameworks (comma separated):',
        filter: (input) => input.split(',').map(s => s.trim()).filter(s => s)
      }
    ]);
    if (frameworks.list && frameworks.list.length > 0) {
      skills.frameworks = frameworks.list;
    }
  }

  // Tools
  const toolsAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '🔧 Add Tools & Software?',
      default: true
    }
  ]);
  
  if (toolsAnswer.add) {
    const tools = await inquirer.prompt([
      {
        type: 'input',
        name: 'list',
        message: '🔧 List tools (comma separated):',
        filter: (input) => input.split(',').map(s => s.trim()).filter(s => s)
      }
    ]);
    if (tools.list && tools.list.length > 0) {
      skills.tools = tools.list;
    }
  }

  // Databases
  const dbAnswer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '🗄️ Add Databases?',
      default: true
    }
  ]);
  
  if (dbAnswer.add) {
    const databases = await inquirer.prompt([
      {
        type: 'input',
        name: 'list',
        message: '🗄️ List databases (comma separated):',
        filter: (input) => input.split(',').map(s => s.trim()).filter(s => s)
      }
    ]);
    if (databases.list && databases.list.length > 0) {
      skills.databases = databases.list;
    }
  }

  return {
    title: '🛠️ Skills & Technologies',
    type: 'skills',
    content: skills
  };
}

/**
 * Collect projects
 */
async function collectProjects() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '📂 Add Projects section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const projects = [];
  let addMore = true;

  while (addMore) {
    const item = await inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: '📂 Project name:'
      },
      {
        type: 'input',
        name: 'description',
        message: '📋 What does it do?'
      },
      {
        type: 'input',
        name: 'tech',
        message: '🛠️ Technologies used (comma separated):'
      },
      {
        type: 'input',
        name: 'link',
        message: '🔗 Project URL (optional):'
      },
      {
        type: 'input',
        name: 'github',
        message: '🐙 GitHub repo URL (optional):'
      }
    ]);

    if (item.name) {
      projects.push({
        ...item,
        tech: item.tech ? item.tech.split(',').map(t => t.trim()).filter(t => t) : []
      });
    }

    const more = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addMore',
        message: '➕ Add another project?',
        default: false
      }
    ]);
    addMore = more.addMore;
  }

  return {
    title: '📂 Featured Projects',
    type: 'projects',
    content: projects
  };
}

/**
 * Collect blog/writing
 */
async function collectBlog() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '📝 Add Blog/Writing section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const blogs = [];
  let addMore = true;

  while (addMore) {
    const item = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: '📝 Article/Blog title:'
      },
      {
        type: 'input',
        name: 'description',
        message: '📋 Brief description:'
      },
      {
        type: 'input',
        name: 'link',
        message: '🔗 Article URL:'
      }
    ]);

    if (item.title && item.link) {
      blogs.push(item);
    }

    const more = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addMore',
        message: '➕ Add another article?',
        default: false
      }
    ]);
    addMore = more.addMore;
  }

  return {
    title: '✍️ Recent Blog Posts',
    type: 'blog',
    content: blogs
  };
}

/**
 * Collect GitHub stats configuration
 */
async function collectStats() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '📊 Add GitHub Stats?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const stats = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'showStats',
      message: '📊 Show overall GitHub stats (stars, commits, PRs)?',
      default: true
    },
    {
      type: 'confirm',
      name: 'showTopLang',
      message: '📊 Show top languages?',
      default: true
    },
    {
      type: 'confirm',
      name: 'showStreak',
      message: '🔥 Show streak stats?',
      default: true
    }
  ]);

  return {
    title: '📊 GitHub Stats',
    type: 'stats',
    content: stats
  };
}

/**
 * Collect languages
 */
async function collectLanguages() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '🌐 Add Languages section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const languages = [];
  let addMore = true;

  while (addMore) {
    const item = await inquirer.prompt([
      {
        type: 'input',
        name: 'language',
        message: '🌐 Language:'
      },
      {
        type: 'list',
        name: 'level',
        message: '📊 Proficiency level:',
        choices: ['Native', 'Fluent', 'Advanced', 'Intermediate', 'Basic']
      }
    ]);

    if (item.language) {
      languages.push(item);
    }

    const more = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'addMore',
        message: '➕ Add another language?',
        default: false
      }
    ]);
    addMore = more.addMore;
  }

  return {
    title: '🌐 Languages',
    type: 'languages',
    content: languages
  };
}

/**
 * Collect fun facts
 */
async function collectFunFacts() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '💬 Add Fun Facts section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const facts = await inquirer.prompt([
    {
      type: 'input',
      name: 'list',
      message: '💬 List some fun facts about you (comma separated):',
      filter: (input) => input.split(',').map(s => s.trim()).filter(s => s)
    }
  ]);

  return {
    title: '💬 Fun Facts About Me',
    type: 'funfacts',
    content: facts.list || []
  };
}

/**
 * Collect contact information
 */
async function collectContact() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '📫 Add Contact section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const contact = await inquirer.prompt([
    {
      type: 'input',
      name: 'email',
      message: '📧 Email:'
    },
    {
      type: 'input',
      name: 'website',
      message: '🌐 Website:'
    },
    {
      type: 'input',
      name: 'linkedin',
      message: '💼 LinkedIn:'
    },
    {
      type: 'input',
      name: 'twitter',
      message: '🐦 Twitter/X:'
    }
  ]);

  return {
    title: '📫 Contact Me',
    type: 'contact',
    content: contact
  };
}

/**
 * Collect custom section
 */
async function collectCustom() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '➕ Add Custom Section?',
      default: true
    }
  ]);

  if (!answer.add) return null;

  const custom = await inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: '📝 Section title:'
    },
    {
      type: 'input',
      name: 'content',
      message: '📋 What would you like to share?'
    }
  ]);

  return {
    title: custom.title,
    type: 'custom',
    content: custom.content
  };
}

/**
 * Ask for social links
 */
async function askSocialLinks() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'add',
      message: '🔗 Add Social Links? (GitHub, LinkedIn, Twitter, etc.)',
      default: true
    }
  ]);

  if (!answer.add) return [];

  const socials = await inquirer.prompt([
    {
      type: 'input',
      name: 'github',
      message: '🐙 GitHub profile URL:'
    },
    {
      type: 'input',
      name: 'linkedin',
      message: '💼 LinkedIn profile URL:'
    },
    {
      type: 'input',
      name: 'twitter',
      message: '🐦 Twitter/X URL:'
    },
    {
      type: 'input',
      name: 'youtube',
      message: '📺 YouTube channel URL:'
    },
    {
      type: 'input',
      name: 'website',
      message: '🌐 Personal website/blog URL:'
    }
  ]);

  // Filter out empty values
  return Object.entries(socials)
    .filter(([key, value]) => value && value.trim())
    .map(([key, value]) => ({ platform: key, url: value }));
}
