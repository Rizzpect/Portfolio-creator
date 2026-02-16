#!/usr/bin/env node

import { Command } from 'commander';
import chalk from 'chalk';
import figlet from 'figlet';
import { runInteractiveMode } from './cli/prompts.js';
import { generatePortfolio } from './generator/template.js';
import { savePortfolio } from './utils/formatters.js';

const program = new Command();

/**
 * Main entry point for the portfolio creator CLI
 */
export async function main() {
  // Display banner
  console.log(chalk.cyan(figlet.textSync('Portfolio', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default'
  })));
  
  console.log(chalk.yellow('━'.repeat(50)));
  console.log(chalk.green('✨ Create stunning GitHub portfolios with ease! ✨\n'));

  program
    .name('portfolio-creator')
    .description('A CLI tool to create stunning GitHub portfolio READMEs')
    .version('1.0.0');

  program
    .command('create')
    .description('Create a new portfolio')
    .option('-o, --output <path>', 'Output file path', 'README.md')
    .option('-i, --input <path>', 'Input JSON file with portfolio data')
    .action(async (options) => {
      try {
        let userData;
        
        if (options.input) {
          // Load from JSON file
          const { readFile } = await import('fs/promises');
          const fileContent = await readFile(options.input, 'utf-8');
          userData = JSON.parse(fileContent);
        } else {
          // Run interactive mode
          userData = await runInteractiveMode();
        }
        
        if (!userData || Object.keys(userData).length === 0) {
          console.log(chalk.red('No portfolio data provided. Exiting.'));
          process.exit(1);
        }
        
        // Generate portfolio markdown
        console.log(chalk.blue('\n🎨 Generating your stunning portfolio...\n'));
        const markdown = await generatePortfolio(userData);
        
        // Save to file
        await savePortfolio(markdown, options.output);
        
        console.log(chalk.green(`\n✅ Portfolio created successfully!`));
        console.log(chalk.yellow(`📄 Output: ${options.output}\n`));
        
      } catch (error) {
        console.error(chalk.red(`\n❌ Error: ${error.message}`));
        process.exit(1);
      }
    });

  program
    .command('init')
    .description('Initialize a new portfolio project')
    .action(() => {
      console.log(chalk.blue('\n📦 This will set up a portfolio project in your current directory.\n'));
      console.log(chalk.yellow('Use: portfolio-creator create\n'));
    });

  // Parse arguments
  program.parse(process.argv);
  
  // Show help if no command
  if (process.argv.length === 2) {
    program.help();
  }
}

// Export for testing
export { program };
