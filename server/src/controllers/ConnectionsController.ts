import { Request, Response } from 'express'
import db from '../database/connection'

class ConnectionsController {
  async index (request: Request, response: Response) {
    const totalConnections = await db('connections').count('* as total')

    const [total] = totalConnections
    return response.json(total)
  }

  async store (request: Request, response: Response) {
    const { user_id } = request.body

    try {
      await db('connections').insert({ user_id })
      return response.status(201).send()
    } catch (e) {
      return response.status(400).json({
        message: 'User id is invalid'
      })
    }
  }
}

export default new ConnectionsController()
