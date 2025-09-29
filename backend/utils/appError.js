class AppError extends Error {
  constructor(message, statusCode) {
    // this is the parent class that is called, already set the message property to the incoming message
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    // Only operational errors you want to send to the client
    this.isOperational = true;

    // need to capture the stacktrace (shows where the error happened)
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
