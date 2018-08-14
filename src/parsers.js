import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';
import fs from 'fs';

const parsers = new Map([
  ['.json', JSON.parse],
  ['.yaml', yaml.safeLoad],
  ['.yml', yaml.safeLoad],
  ['.ini', ini.parse],
]);

export default (pathToFile) => {
  const fileFormat = path.extname(pathToFile);
  const file = fs.readFileSync(pathToFile, 'utf8');
  const parser = parsers.get(fileFormat);
  return parser(file);
};
