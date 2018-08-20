import renderTree from './renderTree';
import renderPlain from './renderPlain';

const renderers = [
  {
    name: 'tree',
    render: (ast) => {
      const spacesCount = 2;
      return `{\n${renderTree(ast, spacesCount)}\n}`;
    },
  },
  {
    name: 'plain',
    render: (ast) => {
      const arrKeys = [];
      return renderPlain(ast, arrKeys);
    },
  },
];

export default (format) => {
  const render = renderers.find(({ name }) => format === name);
  if (render) {
    return render;
  }
  return renderers.find(({ name }) => name === 'tree');
};
