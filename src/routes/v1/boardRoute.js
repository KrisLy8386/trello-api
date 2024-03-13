import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardValidation } from '~/validations/boardValidation'
import { boardController } from '~/controllers/boardController'

const Router = express.Router()

Router.route('/')
  .get((req, res) => {
    res.status(StatusCodes.OK).json({ message: 'GET: API get boards list.' })
  })
  .post(boardValidation.createNew, boardController.createNew)

//Parameter using here
Router.route('/:id')
  .get(boardController.getDetails)
  .put() //Update
export const boardRoute = Router