
declare namespace Express {
  interface Response {
    success(statusCode: number, data: any, message: string): Response
    error(statusCode: number, error: any, message: string): Response
  }
}