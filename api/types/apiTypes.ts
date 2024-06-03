export interface ErrorType {
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
