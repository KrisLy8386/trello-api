//Board Controllers

import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {

  try {
    console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query)
    // console.log('req.params: ', req.params)
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)
    res.status(StatusCodes.CREATED).json({ message: 'POST from board Controller: API creates new board.' })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      //new error to return only string of error message
      errors: error.message
    })
  }
}

export const boardController = {
  createNew
}