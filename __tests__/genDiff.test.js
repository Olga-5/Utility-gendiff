import fs from 'fs';
import genDiff from '../src';

const pathToTestFlatFile = './__tests__/__fixtures__/flatFiles/';
const pathToResultFlatFile = `${pathToTestFlatFile}result.txt`;
const pathToResultPlainFlatFiles = `${pathToTestFlatFile}resultForFormatPlain.txt`;
const pathToResultJsonFlatFiles = `${pathToTestFlatFile}resultForFormatJson.txt`;

const pathToTestTreeFile = './__tests__/__fixtures__/treeFiles/';
const pathToResultTreeFiles = `${pathToTestTreeFile}result.txt`;
const pathToResultPlainTreeFiles = `${pathToTestTreeFile}resultForFormatPlain.txt`;
const pathToResultJsonTreeFiles = `${pathToTestTreeFile}resultForFormatJson.txt`;


const pathToFlatFileJson1 = `${pathToTestFlatFile}before.json`;
const pathToFlatFileJson2 = `${pathToTestFlatFile}after.json`;
const pathToFlatFileYml1 = `${pathToTestFlatFile}before.yml`;
const pathToFlatFileYml2 = `${pathToTestFlatFile}after.yml`;
const pathToFlatFileIni1 = `${pathToTestFlatFile}before.ini`;
const pathToFlatFileIni2 = `${pathToTestFlatFile}after.ini`;

const pathToTreeFileJson1 = `${pathToTestTreeFile}before.json`;
const pathToTreeFileJson2 = `${pathToTestTreeFile}after.json`;
const pathToTreeFileYml1 = `${pathToTestTreeFile}before.yml`;
const pathToTreeFileYml2 = `${pathToTestTreeFile}after.yml`;
const pathToTreeFileIni1 = `${pathToTestTreeFile}before.ini`;
const pathToTreeFileIni2 = `${pathToTestTreeFile}after.ini`;


const formatTree = 'tree';
const formatPlain = 'plain';
const formatJson = 'json';

test('format tree', () => {
  const resultForFlatFiles = fs.readFileSync(pathToResultFlatFile, 'utf8');
  expect(genDiff(pathToFlatFileJson1, pathToFlatFileJson2, formatTree))
    .toBe(resultForFlatFiles);

  expect(genDiff(pathToFlatFileYml1, pathToFlatFileYml2, formatTree))
    .toBe(resultForFlatFiles);

  expect(genDiff(pathToFlatFileIni1, pathToFlatFileIni2, formatTree))
    .toBe(resultForFlatFiles);

  const resultForTreeFiles = fs.readFileSync(pathToResultTreeFiles, 'utf8');
  expect(genDiff(pathToTreeFileJson1, pathToTreeFileJson2, formatTree))
    .toBe(resultForTreeFiles);

  expect(genDiff(pathToTreeFileYml1, pathToTreeFileYml2, formatTree))
    .toBe(resultForTreeFiles);

  expect(genDiff(pathToTreeFileIni1, pathToTreeFileIni2, formatTree))
    .toBe(resultForTreeFiles);
});

test('format plain', () => {
  const resultPlainForFlatFiles = fs.readFileSync(pathToResultPlainFlatFiles, 'utf8');
  expect(genDiff(pathToFlatFileJson1, pathToFlatFileJson2, formatPlain))
    .toBe(resultPlainForFlatFiles);

  expect(genDiff(pathToFlatFileYml1, pathToFlatFileYml2, formatPlain))
    .toBe(resultPlainForFlatFiles);

  expect(genDiff(pathToFlatFileIni1, pathToFlatFileIni2, formatPlain))
    .toBe(resultPlainForFlatFiles);

  const resultPlainForTreeFiles = fs.readFileSync(pathToResultPlainTreeFiles, 'utf8');
  expect(genDiff(pathToTreeFileJson1, pathToTreeFileJson2, formatPlain))
    .toBe(resultPlainForTreeFiles);

  expect(genDiff(pathToTreeFileYml1, pathToTreeFileYml2, formatPlain))
    .toBe(resultPlainForTreeFiles);

  expect(genDiff(pathToTreeFileIni1, pathToTreeFileIni2, formatPlain))
    .toBe(resultPlainForTreeFiles);
});

test('format json', () => {
  const resultJsonForFlatFiles = fs.readFileSync(pathToResultJsonFlatFiles, 'utf8');
  expect(genDiff(pathToFlatFileJson1, pathToFlatFileJson2, formatJson))
    .toBe(resultJsonForFlatFiles);

  expect(genDiff(pathToFlatFileYml1, pathToFlatFileYml2, formatJson))
    .toBe(resultJsonForFlatFiles);

  expect(genDiff(pathToFlatFileIni1, pathToFlatFileIni2, formatJson))
    .toBe(resultJsonForFlatFiles);

  const resultJsonForTreeFiles = fs.readFileSync(pathToResultJsonTreeFiles, 'utf8');
  expect(genDiff(pathToTreeFileJson1, pathToTreeFileJson2, formatJson))
    .toBe(resultJsonForTreeFiles);

  expect(genDiff(pathToTreeFileYml1, pathToTreeFileYml2, formatJson))
    .toBe(resultJsonForTreeFiles);

  expect(genDiff(pathToTreeFileIni1, pathToTreeFileIni2, formatJson))
    .toBe(resultJsonForTreeFiles);
});
