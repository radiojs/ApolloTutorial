import log4js from 'log4js';

const LOG_DIR = process.env.LOG_DIR || './log';
const filePath = `${LOG_DIR}/apollo_tutorial/error.log`;

log4js.configure({
  appenders: {
    out: { type: 'stdout' },
    app: { type: 'file', filename: filePath }
  },
  categories: {
    default: { appenders: [ 'out', 'app' ], level: 'info' }
  }
});
