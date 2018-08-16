import _ from 'lodash';

const action = [
  {
    type: 'nested',
    process: (key, value1, value2, indents, f, ch) => `  ${indents}${key}: {\n${f(ch, `${indents}    `)}\n${indents}  }`,
  },
  {
    type: 'unchanged',
    process: (key, value1, value2, indents) => `  ${indents}${key}: ${value1}`,
  },
  {
    type: 'deleted',
    process: (key, value1, value2, indents) => `${indents}- ${key}: ${value1}`,
  },
  {
    type: 'added',
    process: (key, value1, value2, indents) => `${indents}+ ${key}: ${value2}`,
  },
  {
    type: 'changed',
    process: (key, value1, value2, indents) => `${indents}+ ${key}: ${value2}\n${indents}- ${key}: ${value1}`,
  },
];


const stringify = (value, indents) => {
  if (_.isObject(value)) {
    const keys = _.keys(value);
    const str = keys.map(key => `  ${key}: ${value[key]}`).join('\n');
    return `{\n${indents}    ${str}\n${indents}  }`;
  }
  return value;
};

const getAction = typeNode => action.find(({ type }) => type === typeNode);

const render = (ast, indents) => ast.map((node) => {
  const {
    type, key, value1, value2, children,
  } = node;
  const { process } = getAction(type);
  return process(key,
    stringify(value1, indents),
    stringify(value2, indents),
    indents,
    render,
    children);
}).join('\n');

export default render;
