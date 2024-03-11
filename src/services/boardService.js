/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

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

export const boardService = {
  createNew
}