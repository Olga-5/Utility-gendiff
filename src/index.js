import _ from 'lodash';
import fs from 'fs';

const action = [
  {
    name: 'unchangedNode',
    check: (value1, value2) => value1 === value2,
    diff: (key, value1) => `    ${key}: ${value1}`,
  },
  {
    name: 'deletedNode',
    check: (value1, value2) => !value2,
    diff: (key, value1) => `  - ${key}: ${value1}`,
  },
  {
    name: 'addedNode',
    check: value1 => !value1,
    diff: (key, value1, value2) => `  + ${key}: ${value2}`,
  },
  {
    name: 'changedNode',
    check: (value1, value2) => value2 !== 'undefined' && value1 !== value2,
    diff: (key, value1, value2) => `  + ${key}: ${value2}\n  - ${key}: ${value1}`,
  },
];

const getAction = (value1, value2) => action.find(({ check }) => check(value1, value2));

export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');
  const contentFile1 = JSON.parse(file1);
  const contentFile2 = JSON.parse(file2);
  const keysFile1 = _.keys(contentFile1);
  const keysFile2 = _.keys(contentFile2);
  const jointKeys = _.union(keysFile1, keysFile2);
  const outputDiff = jointKeys.reduce((acc, key) => {
    const valueContentFile1 = contentFile1[key];
    const valueContentFile2 = contentFile2[key];
    const { diff } = getAction(valueContentFile1, valueContentFile2);
    return [...acc, diff(key, valueContentFile1, valueContentFile2)];
  }, []).join('\n');
  return `{\n${outputDiff}\n}`;
};
