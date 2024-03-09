//APIs for V1

import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from '~/routes/v1/boardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs V1 are ready to use.'})
})

// To reuse boards APIs
Router.use('/boards', boardRoute)

export const APIs_V1 = Router