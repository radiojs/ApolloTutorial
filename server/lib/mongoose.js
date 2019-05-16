import Mongoose from 'mongoose';
import log4js from 'log4js';

const connectionURI = process.env.MONGO_URL;
const logger = log4js.getLogger();

Mongoose.Promise = global.Promise;
const db = Mongoose.connection;
db.on('connecting', () => {
  logger.debug('connecting to DB...');
});
db.on('error', (error) => {
  logger.error(`Error in MongoDB connection: ${error}`);
  Mongoose.disconnect();
});
db.on('connected', () => {
  logger.debug('DB connection - success.');
});
db.once('open', () => {
  logger.debug('DB connection - open');
});
db.on('reconnected', () => {
  logger.debug('DB reconnected');
});
db.on('disconnected', () => {
  logger.debug('DB disconnected');
  Mongoose.connect(connectionURI, {
    auto_reconnect: true,
    socketOptions: {
      keepAlive: 1,
      connectTimeoutMS: 30000,
    },
    useNewUrlParser: true,
  });
});

Mongoose.connect(connectionURI, {
  auto_reconnect: true,
  useNewUrlParser: true,
});

const { ObjectId } = Mongoose.Types;
ObjectId.prototype.valueOf = function () {
  return this.toString();
};
