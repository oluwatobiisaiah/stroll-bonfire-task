import { Request, Response } from "express" 
import { httpStatusCodes } from "../utils/helpers/httpStatusCodes";
import { errorResponse, successResponse } from "../utils/helpers/responseTraits";
 
export default class BaseController { 
    public successResponse = (res: Response, message: string, data?: any, status = httpStatusCodes.OK) => { 
        res.status(status).json(successResponse({statusCode:status,data,message})); 
    }; 
 
  public errorResponse = (res: Response, message: string, data?: any, status = httpStatusCodes.BAD_REQUEST) => { 
    res.status(status).json(errorResponse({statusCode:status,data,message})) 
  } 
   

  paginateQueryLogic(responseData: any[], req:any) { 
    const { page = 1, pageSize = 10 } = req.query 
 
    try { 
      const totalItems = responseData.length 
      const totalPages = Math.ceil(totalItems / pageSize) 
 
      const startIndex = (page - 1) * pageSize 
      const endIndex = page * pageSize 
 
      const paginatedItems = responseData.slice(startIndex, endIndex) 
 
      const paginationInfo = { 
        totalItems, 
        totalPages, 
        currentPage:Number(page), 
      } 
 
      return { 
        paginatedItems, 
        meta: paginationInfo, 
      } 
    } catch (error) { 
      throw error 
    } 
  } 
 
 
}