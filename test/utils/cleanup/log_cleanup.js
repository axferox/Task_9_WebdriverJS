const fsextra = require("fs-extra");
const pathToErrorLog = "test/logs/error.logger.log";
const pathToCombinedLog = "test/logs/combined.logger.log";
fsextra.removeSync(pathToErrorLog);
fsextra.removeSync(pathToCombinedLog);