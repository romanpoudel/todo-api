import developmentLogger from './developmentLogger';
import productionLogger from './productionLogger';
import config from '../config';

let logger:any = null;

if (config.environment === 'development') {
  logger = developmentLogger();
}

if (config.environment === 'production') {
  logger = productionLogger();
}

export default logger;