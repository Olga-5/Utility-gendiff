import _ from 'lodash';

const action = [
  {
    type: 'nested',
    process: (key, valueOld, valueNew, children, f) => f(children, [key]),
  },
  {
    type: 'unchanged',
    process: key => `Property '${key}' was not updated\n`,
  },
  {
    type: 'deleted',
    process: key => `Property '${key}' was removed\n`,
  },
  {
    type: 'added',
    process: (key, valueOld, valueNew) => `Property '${key}' was added with value: ${valueNew}\n`,
  },
  {
    type: 'changed',
    process: (key, valueOld, valueNew) => `Property '${key}' was updated. From ${valueOld} to ${valueNew}\n`,
  },
];

const getAction = typeNode => action.find(({ type }) => type === typeNode);
const conversionValue = (value) => {
  if (_.isBoolean(value)) {
    return value;
  } if (_.isObject(value)) {
    return 'complex value';
  }
  return `'${value}'`;
};

const render = (ast, keyNode) => ast.map((node) => {
  const {
    type, key, valueOld, valueNew, children,
  } = node;
  const path = [...keyNode, key].join('.');
  const { process } = getAction(type);
  const convertedValueOld = conversionValue(valueOld);
  const convertedValueNew = conversionValue(valueNew);
  return process(path, convertedValueOld, convertedValueNew, children, render);
}).join('');

export default render;
