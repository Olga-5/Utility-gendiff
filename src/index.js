import _ from 'lodash';
import fs from 'fs';

const action = [
  {
    name: 'unchangedNode',
    check: (arg, file1, file2) => file1[arg] === file2[arg],
    output: (arg, file1) => `    ${arg}: ${file1[arg]}\n`,
  },
  {
    name: 'addedNode',
    check: (arg, file1) => !_.has(file1, arg),
    output: (arg, file1, file2) => `  + ${arg}: ${file2[arg]}\n`,
  },
  {
    name: 'changedNode',
    check: (arg, file1, file2) => _.has(file2, arg) && file1[arg] !== file2[arg],
    output: (arg, file1, file2) => `  + ${arg}: ${file2[arg]}\n  - ${arg}: ${file1[arg]}\n`,
  },
  {
    name: 'deletedNode',
    check: (arg, file1, file2) => !_.has(file2, arg),
    output: (arg, file1) => `  - ${arg}: ${file1[arg]}\n`,
  },
];

const getAction = (arg, file1, file2) => action.find(({ check }) => check(arg, file1, file2));

export default (pathToFile1, pathToFile2) => {
  const decodedFile1 = fs.readFileSync(pathToFile1, 'utf8');
  const decodedFile2 = fs.readFileSync(pathToFile2, 'utf8');
  const file1 = JSON.parse(decodedFile1);
  const file2 = JSON.parse(decodedFile2);
  const keysFile1 = _.keys(file1);
  const keysFile2 = _.keys(file2);
  const jointKeys = _.union(keysFile1, keysFile2);
  const buildOutput = jointKeys.reduce((acc, key) => {
    const { output } = getAction(key, file1, file2);
    return `${acc}${output(key, file1, file2)}`;
  }, '');
  return `{\n${buildOutput}}`;
};
