// ValidationErrors.js
class ValidationError extends Error {
    constructor(message, details=[],statusCode=400) {
      super(message.replace(/"/g, ""));
      this.name = 'ValidationError';
      this.details = details;
      this.statusCode = statusCode;
    }
  }
  
  module.exports = ValidationError;