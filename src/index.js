import _ from 'lodash';
import fs from 'fs';
import parseFile from './parsers';


const action = [
  {
    type: 'unchangedNode',
    check: (value1, value2) => value1 === value2,
    process: (key, value1, value2, indents) => `  ${indents}${key}: ${value1}`,
  },
  {
    type: 'deletedNode',
    check: (value1, value2) => !value2 && !_.isBoolean(value2),
    process: (key, value1, value2, indents) => `${indents}- ${key}: ${value1}`,
  },
  {
    type: 'addedNode',
    check: value1 => !value1,
    process: (key, value1, value2, indents) => `${indents}+ ${key}: ${value2}`,
  },
  {
    type: 'changedNode',
    check: (value1, value2) => value2 !== 'undefined' && value1 !== value2,
    process: (key, value1, value2, indents) => `${indents}+ ${key}: ${value2}\n${indents}- ${key}: ${value1}`,
  },
];


const getAction = (value1, value2) => action.find(({ check }) => check(value1, value2));
const getChidren = (value1, value2) => (_.isObject(value1) && _.isObject(value2)
  ? [value1, value2] : []);
const getProcess = typeNode => action.find(({ type }) => type === typeNode);

const parseAst = (obj1, obj2) => {
  const keysObj1 = _.keys(obj1);
  const keysObj2 = _.keys(obj2);
  const mergedKeys = _.union(keysObj1, keysObj2);
  return mergedKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];
    const { type } = getAction(value1, value2);
    const children = getChidren(value1, value2);
    const hasChildren = children.length > 0;
    return [
      ...acc, {
        type: hasChildren ? 'unchangedNode' : type, key, children: parseAst(children[0], children[1]), value1, value2,
      },
    ];
  }, []);
};

const stringify = (value, indents) => {
  if (_.isObject(value)) {
    const keys = _.keys(value);
    const str = keys.map(key => `  ${key}: ${value[key]}`).join('\n');
    return `{\n${indents}    ${str}\n${indents}  }`;
  }
  return value;
};


const render = (ast, indents) => ast.map((node) => {
  const {
    type, key, value1, value2, children,
  } = node;
  const { process } = getProcess(type);
  if (children.length === 0) {
    return process(key, stringify(value1, indents), stringify(value2, indents), indents);
  }
  return `  ${indents}${key}: {\n${render(children, `${indents}    `)}\n${indents}  }`;
}).join('\n');


export default (pathToFile1, pathToFile2) => {
  const file1 = fs.readFileSync(pathToFile1, 'utf8');
  const file2 = fs.readFileSync(pathToFile2, 'utf8');
  const obj1 = parseFile(file1, pathToFile1);
  const obj2 = parseFile(file2, pathToFile2);
  const ast = parseAst(obj1, obj2);
  const diff = render(ast, '  ');
  return `{\n${diff}\n}`;
};
