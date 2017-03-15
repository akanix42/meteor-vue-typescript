import path from 'path';
import hasha from 'hasha';

export default class PartialInputFile {
  constructor({ contents, filePath = null, packageName = null }, inputFile) {
    this.contents = contents;
    this.filePath = filePath;
    this.hash = null;
    this.basename = null;
    this.packageName = packageName;
    this.inputFile = inputFile;
    this.processingPromise = new Promise((resolve, reject) => {
      this.resolve = resolve;
      this.reject = reject;
    });
    this.suppressedReturnWarning = false;
    this.returnWarning = 'A \'return\' statement can only be used within a function body.';

    this._processFilePath();
  }

  _processFilePath() {
    if (!this.filePath) {
      this.basename = null;
      return;
    }

    this.basename = path.basename(this.filePath);
  }

  addJavaScript(result) {
    this.resolve(result);
  }

  error(err) {
    console.log('input file error')
    this.inputFile.error(err);
    this.reject(err);
  }

  getArch() {
    return this.inputFile.getArch();
  }

  getBasename() {
    return `${this.basename || this.inputFile.getBasename()}.ts`;
  }

  getContentsAsString() {
    return this.contents;
  }

  getFileOptions() {
    return {};
  }

  getPackageName() {
    return this.packageName || this.inputFile.getPackageName();
  }

  getPathInPackage() {
    return this.filePath || `${this.inputFile.getPathInPackage()}.ts`;
  }

  getSourceHash() {
    return this.hash || (this.hash = hasha(this.getContentsAsString(), {algorithm: 'sha1'}));
  }

  logError(err) {
    return this.inputFile.logError(err);
  }

  warn(warning) {
    if (warning.message === this.returnWarning) {
      if (!this.suppressedReturnWarning) {
        this.suppressedReturnWarning = true;
        return;
      }
    }
    console.warn(warning.message);
    // this.inputFile.warn(err);
  }

}
