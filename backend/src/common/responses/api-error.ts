export class ApiError {
  success: boolean;
  message: string;
  error: string;
  timestamp: string;

  constructor(message: string, error: string) {
    this.success = false;
    this.message = message;
    this.error = error;
    this.timestamp = new Date().toISOString();
  }
}
