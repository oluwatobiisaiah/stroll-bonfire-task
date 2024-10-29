import { Request,Response } from "express";
import { httpStatusCodes } from "../../utils/helpers/httpStatusCodes";

export const notFound = (req:Request, res:Response) => {
  return res.status(httpStatusCodes.NOT_FOUND).json({
    statusCode: 404,
    message: "This path exists somewhere in space time but not here",
    data: null,
  });
};
