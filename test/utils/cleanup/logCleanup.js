const fsextra = require('fs-extra');

const pathToErrorLog = 'test/logs/errorLogger.log';
const pathToCombinedLog = 'test/logs/combinedLogger.log';
fsextra.removeSync(pathToErrorLog);
fsextra.removeSync(pathToCombinedLog);
