//validations for boards
import * as Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {

  const correctCondition = Joi.object({
    //custom message
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (krisly8386)',
      'string.empty': 'Title is not allowed to be empty (krisly8386)',
      'string.min': 'Title length must be at least 3 characters long (krisly8386)',
      'string.max': 'Title length must be less than or equal to 5 characters long (krisly8386)',
      'string.trim': 'Title must not have leading or trailing whitespace (krisly8386)'
    }),

    //default message
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    // console.log('req body ', req.body)

    //validate data to get all the errors
    await correctCondition.validateAsync(req.body, { abortEarly: false })

    //To go to board controller
    next()
  } catch (error) {
    //return middleware error handler
    return next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    // res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
    //   //new error to return only string of error message when working with Joi
    //   errors: new Error(error).message
    // })
  }
}

export const boardValidation = {
  createNew
}
