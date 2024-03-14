/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep, reduce } from 'lodash'

const createNew = async (reqBody) => {
  try {
    const newBoard ={
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //call to model to process the new board record to database
    const createdBoard = await boardModel.createNew(newBoard)

    //get the record of the new board
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)

    //return the result. Always return in service
    return getNewBoard
  } catch (error) {throw error}
}

const getDetails = async (boardID) => {
  try {
    //get the record of the new board
    const board = await boardModel.getDetails(boardID)
    if(!board) {
      throw new ApiError(StatusCodes.NOT_FOUND,'Board not found!')
    }

    const resBoard = cloneDeep(board)

    //make card to its right column
    resBoard.columns.forEach(column => {
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
    })

    //remove cards from the initial board record
    delete resBoard.cards

    //return the result. Always return in service
    return resBoard
  } catch (error) {throw error}
}

export const boardService = {
  createNew,
  getDetails
}