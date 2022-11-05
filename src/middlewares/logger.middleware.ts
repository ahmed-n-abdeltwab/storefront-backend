import morgan from 'morgan';
import fs from 'fs';
// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream('access.log', { flags: 'a' });

// setup the logger
export default morgan('combined', { stream: accessLogStream });
