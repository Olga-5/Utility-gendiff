import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (file, pathToFile) => {
  const fileFormat = path.extname(pathToFile);
  const parse = parsers[fileFormat];
  return parse(file);
};
