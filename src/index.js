import _ from 'lodash';
import fs from 'fs';
import parse from './parsers';


const action = [
  {
    name: 'unchangedNode',
    check: (value1, value2) => value1 === value2,
    process: (key, value1) => `    ${key}: ${value1}`,
  },
  {
    name: 'deletedNode',
    check: (value1, value2) => !value2,
    process: (key, value1) => `  - ${key}: ${value1}`,
  },
  {
    name: 'addedNode',
    check: value1 => !value1,
    process: (key, value1, value2) => `  + ${key}: ${value2}`,
  },
  {
    name: 'changedNode',
    check: (value1, value2) => value2 !== 'undefined' && value1 !== value2,
    process: (key, value1, value2) => `  + ${key}: ${value2}\n  - ${key}: ${value1}`,
  },
];


const getAction = (value1, value2) => action.find(({ check }) => check(value1, value2));

export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');
  const obj1 = parse(file1, pathToFile1);
  const obj2 = parse(file2, pathToFile2);
  const keysFile1 = _.keys(obj1);
  const keysFile2 = _.keys(obj2);
  const jointKeys = _.union(keysFile1, keysFile2);
  const filesDiff = jointKeys.reduce((acc, key) => {
    const valueObj1 = obj1[key];
    const valueObj2 = obj2[key];
    const { process } = getAction(valueObj1, valueObj2);
    const nodesDiff = process(key, valueObj1, valueObj2);
    return [...acc, nodesDiff];
  }, []).join('\n');
  return `{\n${filesDiff}\n}`;
};
