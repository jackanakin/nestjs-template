export default interface HttpExceptionObject {
  status: number;
  host: string;
  userAgent: string;
  userId?: number;
  message: string;
}
