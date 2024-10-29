import { NextFunction, Request, Response } from "express";

interface ResponseParam {
  statusCode: number | string;
  data: unknown;
  message: string;
}
interface ApiResponse extends ResponseParam {
  error: boolean;
}

export const successResponse = (params: ResponseParam): ApiResponse => {
  return {
    error: false,
    ...params,
  };
};

export const errorResponse = (params: ResponseParam): ApiResponse => {
  return {
    error: true,
    ...params,
  };
};

