const { createLogger, format, transports } = require('winston');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }),
    format.json()
  ),
  transports: [
    new transports.Console(), // Mostra logs no console durante o desenvolvimento
    new transports.File({ filename: 'logs/error.log', level: 'error' }), // Logs de erro
    new transports.File({ filename: 'logs/combined.log' }), // Todos os logs
  ],
});

module.exports = logger;
