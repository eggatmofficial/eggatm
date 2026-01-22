class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.success = statusCode < 400;
    this.timestamp = new Date().toISOString();
  }

  // Static method for success responses (optional)
  static success(data, message = "Success", statusCode = 200) {
    return new ApiResponse(statusCode, data, message);
  }

  // Static method for error responses (optional)
  static error(message = "Error", statusCode = 500, data = null) {
    return new ApiResponse(statusCode, data, message);
  }
}

module.exports = ApiResponse;