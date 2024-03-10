//Board Controllers

import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {

  try {
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query)
    // console.log('req.params: ', req.params)
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR,'broke')
    // res.status(StatusCodes.CREATED).json({ message: 'POST from board Controller: API creates new board.' })
  } catch (error) {
    //this will direct the flow to error handler middleware defined in server.js
    next(error)
  }
}

export const boardController = {
  createNew
}
