import fs from 'fs';
import _ from 'lodash';
import parseFile from './parsers';
import render from './renders';

const action = [
  {
    type: 'nested',
    check: (valueOld, valueNew) => _.isObject(valueOld) && _.isObject(valueNew),
    process: (valueOld, valueNew, f) => ({ children: f(valueOld, valueNew) }),
  },
  {
    type: 'unchanged',
    check: (valueOld, valueNew) => valueOld === valueNew,
    process: (valueOld, valueNew) => ({ valueOld, valueNew }),
  },
  {
    type: 'deleted',
    check: (valueOld, valueNew) => valueNew === undefined,
    process: (valueOld, valueNew) => ({ valueOld, valueNew }),
  },
  {
    type: 'added',
    check: valueOld => valueOld === undefined,
    process: (valueOld, valueNew) => ({ valueOld, valueNew }),
  },
  {
    type: 'changed',
    check: (valueOld, valueNew) => valueNew !== undefined && valueOld !== valueNew,
    process: (valueOld, valueNew) => ({ valueOld, valueNew }),
  },
];
const getAction = (valueOld, valueNew) => action.find(({ check }) => check(valueOld, valueNew));

export const buildAst = (obj1, obj2) => {
  const keysObj1 = _.keys(obj1);
  const keysObj2 = _.keys(obj2);
  const mergedKeys = _.union(keysObj1, keysObj2);
  return mergedKeys.map((key) => {
    const valueOld = obj1[key];
    const valueNew = obj2[key];
    const { type, process } = getAction(valueOld, valueNew);
    return { type, key, ...process(valueOld, valueNew, buildAst) };
  });
};


export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');
  const obj1 = parseFile(file1, pathToFile1);
  const obj2 = parseFile(file2, pathToFile2);
  const ast = buildAst(obj1, obj2);
  const spacesCount = 2;
  const diff = render(ast, spacesCount);
  return `{\n${diff}\n}`;
};
