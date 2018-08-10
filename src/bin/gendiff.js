#!/usr/bin/env node
import commander from 'commander';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format')
  .parse(process.argv);
