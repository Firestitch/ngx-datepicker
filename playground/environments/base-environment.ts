declare function require(moduleName: string): any;

const pkg = require('../../package.json');

export const baseEnvironment = {
  githubUrl: pkg.repository.url,
  npmUrl: 'https://www.npmjs.com/package/' + pkg.name,
  title: pkg.title
};
