import yaml from 'js-yaml';
import path from 'path';
import ini from 'ini';
import _ from 'lodash';

const parsers = {
  '.json': JSON.parse,
  '.yaml': yaml.safeLoad,
  '.yml': yaml.safeLoad,
  '.ini': ini.parse,
};

export const parseFile = (file, pathToFile) => {
  const fileFormat = path.extname(pathToFile);
  const parse = parsers[fileFormat];
  return parse(file);
};

const action = [
  {
    type: 'nested',
    check: (value1, value2) => _.isObject(value1) && _.isObject(value2),
    children: (value1, value2) => [value1, value2],
    process: (ch, f) => f(_.head(ch), _.last(ch)),
  },
  {
    type: 'unchanged',
    check: (value1, value2) => value1 === value2,
    children: () => [],
    process: _.identity,
  },
  {
    type: 'deleted',
    check: (value1, value2) => !value2 && !_.isBoolean(value2),
    children: () => [],
    process: _.identity,
  },
  {
    type: 'added',
    check: value1 => !value1,
    children: () => [],
    process: _.identity,

  },
  {
    type: 'changed',
    check: (value1, value2) => value2 !== 'undefined' && value1 !== value2,
    children: () => [],
    process: _.identity,
  },
];
const getAction = (value1, value2) => action.find(({ check }) => check(value1, value2));

export const buildAst = (obj1, obj2) => {
  const keysObj1 = _.keys(obj1);
  const keysObj2 = _.keys(obj2);
  const mergedKeys = _.union(keysObj1, keysObj2);
  return mergedKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const { type, children, process } = getAction(value1, value2);
    return [
      ...acc, {
        type,
        key,
        children: process(children(value1, value2), buildAst),
        value1,
        value2,
      },
    ];
  }, []);
};
