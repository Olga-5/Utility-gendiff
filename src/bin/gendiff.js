#!/usr/bin/env node
import commander from 'commander';
import genDiff from '..';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .arguments('<firstConfig> <secondConfig>')
  .option('-f, --format [type]', 'Output format', 'tree')
  .action((firstConfig, secondConfig, cmd) => {
    const diff = genDiff(firstConfig, secondConfig, cmd.format);
    console.log(diff);
  })
  .parse(process.argv);
