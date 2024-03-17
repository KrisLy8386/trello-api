/* eslint-disable no-useless-catch */

import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

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

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)

    return updatedBoard
  } catch (error) { throw error }
}

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    // B1: Cập nhật mảng cardOrderIds của Column ban đầu chứa nó (Hiểu bản chất là xóa cái _id của Card ra khỏi mảng)
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now()
    })
    // B2: Cập nhật mảng cardOrderIds của Column tiếp theo (Hiểu bản chất là thêm _id của Card vào mảng)
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now()
    })
    // B3: Cập nhật lại trường columnId mới của cái Card đã kéo
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId
    })

    return { updateResult: 'Successfully!' }
  } catch (error) { throw error }
}

export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn
}
