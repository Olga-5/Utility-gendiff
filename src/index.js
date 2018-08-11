import _ from 'lodash';
import fs from 'fs';

export default (pathToFile1, pathToFile2) => {
  const datafile1 = fs.readFileSync(pathToFile1, 'utf8');
  const datafile2 = fs.readFileSync(pathToFile2, 'utf8');
  const file1 = JSON.parse(datafile1);
  const file2 = JSON.parse(datafile2);
  const keysFile1 = Object.keys(file1);
  const keysFile2 = Object.keys(file2);
  const deletedRows = keysFile1
    .filter(key => !_.has(file2, key))
    .reduce((acc, key) => [...acc, `  - ${key}: ${file1[key]}\n`], [])
    .join('');
  const AddedRows = keysFile2
    .filter(key => !_.has(file1, key))
    .reduce((acc, key) => [...acc, `  + ${key}: ${file2[key]}\n`], [])
    .join('');
  const unchangedRows = keysFile1
    .filter(key => file1[key] === file2[key])
    .reduce((acc, key) => [...acc, `    ${key}: ${file1[key]}\n`], [])
    .join('');
  const changedValue = keysFile1
    .filter(key => _.has(file2, key))
    .filter(key => file1[key] !== file2[key])
    .reduce((acc, key) => [...acc, `  + ${key}: ${file2[key]}\n  - ${key}: ${file1[key]}\n`], [])
    .join('');
  return `{\n${unchangedRows}${changedValue}${AddedRows}${deletedRows}}`;
};
