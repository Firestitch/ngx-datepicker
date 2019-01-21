declare function require(moduleName: string): any;


export const baseEnvironment = {
  githubUrl: require('../../package.json').repository.url,
  npmUrl: 'https://www.npmjs.com/package/' + require('../../package.json').name
};
