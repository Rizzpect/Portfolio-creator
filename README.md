# Portfolio Creator 🎨

A powerful CLI tool to create stunning GitHub portfolio READMEs with emojis, badges, tables, and more!

## Features ✨

- **Interactive CLI** - Answer questions about yourself, skip what you don't know
- **Flexible Sections** - Add only what you want: skills, projects, experience, education, etc.
- **Rich GitHub Features** - Shields.io badges, GitHub stats, tables, and more
- **Beautiful Output** - Clean, professional markdown optimized for GitHub
- **Customizable** - Add your own custom sections

## Installation 🚀

```bash
# Clone the repository
git clone https://github.com/Rizzpect/Portfolio-creator.git

# Navigate to the project
cd portfolio-creator

# Install dependencies
npm install

# Link the CLI
npm link
```

## Usage 💻

```bash
# Create a new portfolio (interactive mode)
portfolio-creator create

# Create with custom output
portfolio-creator create -o my-portfolio.md

# Create from JSON file
portfolio-creator create -i data.json
```

## 🤖 AI Mode (NEW!) 🚀

Use Gemini AI to automatically generate your portfolio! Just describe yourself and AI will create a professional README for you.

### Get Your Free Gemini API Key:
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key (free tier available)
3. Copy the key

### Usage:
```bash
# Create portfolio using AI
portfolio-creator create --ai

# Then enter:
# - Your Gemini API Key
# - Your GitHub username  
# - A description about yourself
```

### Example Prompt:
```
I am a full stack developer who loves React and Node.js. 
I have built several web apps including an e-commerce platform 
and a task management tool. I also contribute to open source.
```

The AI will generate a unique, professional portfolio based on your input!

## Example Output 📄

The tool generates a portfolio like this:

```markdown
# 👋 Hi, I'm Your Name!

> Full Stack Developer

---

## 📝 About Me

Your bio goes here...

## 🛠️ Skills & Technologies

### 💻 Programming Languages
![JavaScript](https://img.shields.io/badge/JavaScript-yellow?style=flat) ![Python](https://img.shields.io/badge/Python-blue?style=flat)

## 📂 Featured Projects

### 📁 Project Name
Project description...

## 📊 GitHub Stats

![Stats](https://github-readme-stats.vercel.app/api?username=yourusername)
```

## Supported Sections 📋

- 🏆 Achievements & Awards
- 💼 Work Experience
- 🎓 Education
- 🛠️ Skills & Technologies
- 📂 Featured Projects
- 📝 Blog / Writing
- 📊 GitHub Stats
- 🌐 Languages
- 💬 Fun Facts
- 📫 Contact Info
- ➕ Custom Section

## Tech Stack 🛠️

- **Node.js** - Runtime
- **Commander** - CLI arguments
- **Inquirer** - Interactive prompts
- **Chalk** - Terminal styling
- **Figlet** - ASCII banners
- **Ora** - Loading spinners

## Contributing 🤝

Contributions are welcome! Please feel free to submit a Pull Request.

## License 📝

MIT License - feel free to use this for your own projects!

