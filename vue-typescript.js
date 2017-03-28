import { Meteor } from 'meteor/meteor';
import { TypeScriptCompiler } from 'meteor/barbatus:typescript-compiler';
import fs from 'fs';
import meteorProjectPath from 'meteor-project-path';
import PartialInputFile from './partial-input-file';

global.vue = global.vue || {}
global.vue.lang = global.vue.lang || {}
const typescriptCompiler = new TypeScriptCompiler({ module: 'ES6' });
global.vue.lang.typescript = Meteor.wrapAsync(typescriptHandler);

function typescriptHandler({ source, inputFile }, cb) {
  try {
    // console.log('pre process\n', source);
    const partialInputFile = new PartialInputFile({ contents: source }, inputFile);
    const filesToProcess = [partialInputFile];
    const tsConfigPath = `${meteorProjectPath}/tsconfig.json`;
    if (fs.existsSync(Plugin.convertToOSPath(tsConfigPath))) {
      const tsConfigFile = new PartialInputFile({
        contents: Plugin.fs.readFileSync(tsConfigPath),
        filePath: 'tsconfig.json',
      }, inputFile);
      filesToProcess.push(tsConfigFile);
    }

    typescriptCompiler.processFilesForTarget(filesToProcess);
    const result = Promise.await(partialInputFile.processingPromise);
    // console.log('data\n', result.data);
    cb(null, {
      script: result.data,
      map: result.sourceMap,
      useBabel: true
    });
  } catch (err) {
    cb(err);
  }
}
