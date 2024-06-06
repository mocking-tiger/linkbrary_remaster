export interface ErrorType {
  message?: string;
  response: {
    status: number;
    data: {
      error: {
        message: string;
        name: string;
        status: number;
      };
    };
  };
}
