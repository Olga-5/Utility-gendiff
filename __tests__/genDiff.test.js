import fs from 'fs';
import genDiff from '../src';

test('gendiff', () => {
  const result = fs.readFileSync('./__tests__/__fixtures__/result.txt', 'utf8');
  expect(genDiff('./__tests__/__fixtures__/before.json', './__tests__/__fixtures__/after.json'))
    .toBe(result);
});
