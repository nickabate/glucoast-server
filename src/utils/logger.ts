import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, errors, colorize } = format;

// Define a custom log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return stack
        ? `${timestamp} ${level}: ${message} - ${stack}`
        : `${timestamp} ${level}: ${message}`;
});

// Create a logger instance
const logger = createLogger({
    level: 'info', // Default log level
    format: combine(
        timestamp(), // Add timestamp to logs
        errors({ stack: true }), // Capture stack traces for errors
        logFormat // Use the custom log format defined above
    ),
    transports: [
        new transports.Console({
            format: combine(colorize(), logFormat), // Colorize console logs
        }),
        new transports.File({ filename: 'combined.log' }) // Logs will be saved to this file
    ],
});

// Optional: Add a logging level for debugging in development
if (process.env.NODE_ENV === 'development') {
    logger.add(new transports.Console({ level: 'debug' }));
}

export default logger;
