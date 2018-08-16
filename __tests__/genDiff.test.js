import fs from 'fs';
import genDiff from '../src';

const pathToTestFlatFile = './__tests__/__fixtures__/flatFiles/';
const pathToResultFlatFile = `${pathToTestFlatFile}result.txt`;
const resultForFlatFiles = fs.readFileSync(pathToResultFlatFile, 'utf8');

const pathToTestTreeFile = './__tests__/__fixtures__/treeFiles/';
const pathToResultTreeFiles = `${pathToTestTreeFile}result.txt`;
const resultForTreeFiles = fs.readFileSync(pathToResultTreeFiles, 'utf8');

test('flat files .json', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.json`;
  const pathToFile2 = `${pathToTestFlatFile}after.json`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(resultForFlatFiles);
});

test('flat files .yml', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.yml`;
  const pathToFile2 = `${pathToTestFlatFile}after.yml`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(resultForFlatFiles);
});

test('flat files .ini', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.ini`;
  const pathToFile2 = `${pathToTestFlatFile}after.ini`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(resultForFlatFiles);
});

test('tree files .json', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.json`;
  const pathToFile2 = `${pathToTestTreeFile}after.json`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(resultForTreeFiles);
});

test('tree files .yml', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.yml`;
  const pathToFile2 = `${pathToTestTreeFile}after.yml`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(resultForTreeFiles);
});

test('tree files .ini', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.ini`;
  const pathToFile2 = `${pathToTestTreeFile}after.ini`;
  expect(genDiff(pathToFile1, pathToFile2))
    .toBe(resultForTreeFiles);
});
