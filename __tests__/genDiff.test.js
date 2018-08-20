import fs from 'fs';
import genDiff from '../src';

const pathToTestFlatFile = './__tests__/__fixtures__/flatFiles/';
const pathToResultFlatFile = `${pathToTestFlatFile}result.txt`;
const resultForFlatFiles = fs.readFileSync(pathToResultFlatFile, 'utf8');
const pathToResultPlainFlatFiles = `${pathToTestFlatFile}resultForFormatPlain.txt`;
const resultPlainForFlatFiles = fs.readFileSync(pathToResultPlainFlatFiles, 'utf8');

const pathToTestTreeFile = './__tests__/__fixtures__/treeFiles/';
const pathToResultTreeFiles = `${pathToTestTreeFile}result.txt`;
const resultForTreeFiles = fs.readFileSync(pathToResultTreeFiles, 'utf8');
const pathToResultPlainTreeFiles = `${pathToTestTreeFile}resultForFormatPlain.txt`;
const resultPlainForTreeFiles = fs.readFileSync(pathToResultPlainTreeFiles, 'utf8');

const formatTree = 'tree';
const formatPlain = 'plain';

test('flat files .json', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.json`;
  const pathToFile2 = `${pathToTestFlatFile}after.json`;
  expect(genDiff(formatTree, pathToFile1, pathToFile2))
    .toBe(resultForFlatFiles);
});

test('flat files .yml', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.yml`;
  const pathToFile2 = `${pathToTestFlatFile}after.yml`;
  expect(genDiff(formatTree, pathToFile1, pathToFile2))
    .toBe(resultForFlatFiles);
});

test('flat files .ini', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.ini`;
  const pathToFile2 = `${pathToTestFlatFile}after.ini`;
  expect(genDiff(formatTree, pathToFile1, pathToFile2))
    .toBe(resultForFlatFiles);
});

test('tree files .json', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.json`;
  const pathToFile2 = `${pathToTestTreeFile}after.json`;
  expect(genDiff(formatTree, pathToFile1, pathToFile2))
    .toBe(resultForTreeFiles);
});

test('tree files .yml', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.yml`;
  const pathToFile2 = `${pathToTestTreeFile}after.yml`;
  expect(genDiff(formatTree, pathToFile1, pathToFile2))
    .toBe(resultForTreeFiles);
});

test('tree files .ini', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.ini`;
  const pathToFile2 = `${pathToTestTreeFile}after.ini`;
  expect(genDiff(formatTree, pathToFile1, pathToFile2))
    .toBe(resultForTreeFiles);
});

test('flat files .json format plain', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.json`;
  const pathToFile2 = `${pathToTestFlatFile}after.json`;
  expect(genDiff(formatPlain, pathToFile1, pathToFile2))
    .toBe(resultPlainForFlatFiles);
});

test('flat files .yml format plain', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.yml`;
  const pathToFile2 = `${pathToTestFlatFile}after.yml`;
  expect(genDiff(formatPlain, pathToFile1, pathToFile2))
    .toBe(resultPlainForFlatFiles);
});

test('flat files .ini format plain', () => {
  const pathToFile1 = `${pathToTestFlatFile}before.ini`;
  const pathToFile2 = `${pathToTestFlatFile}after.ini`;
  expect(genDiff(formatPlain, pathToFile1, pathToFile2))
    .toBe(resultPlainForFlatFiles);
});

test('tree files .json format plain', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.json`;
  const pathToFile2 = `${pathToTestTreeFile}after.json`;
  expect(genDiff(formatPlain, pathToFile1, pathToFile2))
    .toBe(resultPlainForTreeFiles);
});

test('tree files .yml format plain', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.yml`;
  const pathToFile2 = `${pathToTestTreeFile}after.yml`;
  expect(genDiff(formatPlain, pathToFile1, pathToFile2))
    .toBe(resultPlainForTreeFiles);
});

test('tree files .ini format plain', () => {
  const pathToFile1 = `${pathToTestTreeFile}before.ini`;
  const pathToFile2 = `${pathToTestTreeFile}after.ini`;
  expect(genDiff(formatPlain, pathToFile1, pathToFile2))
    .toBe(resultPlainForTreeFiles);
});
