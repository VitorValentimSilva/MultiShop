export interface Response<T> {
  success: boolean;
  data?: T;
  errorCode?: string;
  errors?: Record<string, string[]>;
}
