import _ from 'lodash';

const action = [
  {
    type: 'nested',
    process: (key, valueOld, valueNew, indents, f, ch, spacesCount) => `  ${indents}${key}: {\n${f(ch, spacesCount + 4)}\n${indents}  }`,
  },
  {
    type: 'unchanged',
    process: (key, valueOld, valueNew, indents) => `  ${indents}${key}: ${valueOld}`,
  },
  {
    type: 'deleted',
    process: (key, valueOld, valueNew, indents) => `${indents}- ${key}: ${valueOld}`,
  },
  {
    type: 'added',
    process: (key, valueOld, valueNew, indents) => `${indents}+ ${key}: ${valueNew}`,
  },
  {
    type: 'changed',
    process: (key, valueOld, valueNew, indents) => `${indents}+ ${key}: ${valueNew}\n${indents}- ${key}: ${valueOld}`,
  },
];


const stringify = (value, indents) => {
  const tab = ' '.repeat(6);
  const keys = _.keys(value);
  const str = keys.map(key => `${key}: ${value[key]}`).join('\n');
  return `{\n${indents}${tab}${str}\n${indents}  }`;
};

const getAction = typeNode => action.find(({ type }) => type === typeNode);
const conversionValue = (value, indents) => (_.isObject(value) ? stringify(value, indents) : value);

const render = (ast, spacesCount) => ast.map((node) => {
  const indents = ' '.repeat(spacesCount);
  const {
    type, key, valueOld, valueNew, children,
  } = node;
  const { process } = getAction(type);
  const convertedValueOld = conversionValue(valueOld, indents);
  const convertedValueNew = conversionValue(valueNew, indents);
  return process(key, convertedValueOld, convertedValueNew, indents, render, children, spacesCount);
}).join('\n');

export default render;
