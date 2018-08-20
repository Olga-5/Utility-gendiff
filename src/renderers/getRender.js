import renderTree from './renderTree';
import renderPlain from './renderPlain';
import renderJson from './renderJson';

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
  {
    name: 'json',
    render: ast => renderJson(ast),
  },
];

export default (format) => {
  const render = renderers.find(({ name }) => format === name);
  if (render) {
    return render;
  }
  return renderers.find(({ name }) => name === 'tree');
};
