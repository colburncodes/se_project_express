const customConsoleLog = (message, level = "info") => {
  const levels = {
    error: "\x1b[31m", // red text
    warn: "\x1b[33m", // yellow text
    info: "\x1b[36m", // cyan text
    debug: "\x1b[35m", // magenta text
  };

  const formattedMessage = `[${new Date().toISOString()}] [${level.toUpperCase()}] ${message}`;

  console.log(`${levels[level] + formattedMessage}\x1b[0m`); // reset color
};

module.exports = { customConsoleLog };
