//Board Controllers

import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {

  try {
    // console.log('req.body: ', req.body)
    // console.log('req.query: ', req.query)
    // console.log('req.params: ', req.params)
    // console.log('req.files: ', req.files)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    //Go to Board Service
    const createdBoard = await boardService.createNew(req.body)

    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) {
    //this will direct the flow to error handler middleware defined in server.js
    next(error)
  }
}

const getDetails = async (req, res, next) => {

  try {
    // console.log('req.params: ', req.params)

    //Go to Board Service
    const boardID = req.params.id
    const board = await boardService.getDetails(boardID)

    res.status(StatusCodes.CREATED).json(board)
  } catch (error) {
    //this will direct the flow to error handler middleware defined in server.js
    next(error)
  }
}

export const boardController = {
  createNew,
  getDetails
}
