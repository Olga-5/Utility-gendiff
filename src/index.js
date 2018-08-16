import fs from 'fs';
import * as parsers from './parsers';
import render from './renders';

export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');
  const obj1 = parsers.parseFile(file1, pathToFile1);
  const obj2 = parsers.parseFile(file2, pathToFile2);
  const ast = parsers.buildAst(obj1, obj2);
  const indents = '  ';
  const diff = render(ast, indents);
  return `{\n${diff}\n}`;
};
