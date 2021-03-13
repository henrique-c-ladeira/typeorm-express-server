import { NextFunction, Request, Response } from 'express'
import { getRepository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import { Token } from '../entity/Token'
import _ from 'lodash'

export const verifyJWT = async (req: Request, res: Response, next: NextFunction): NextFunction => {
  try {
    const token = req.headers.authorization
    if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' })

    const decoded = await jwt.verify(token, process.env.JWT_PRIVATE)

    const tokenRepository = getRepository(Token)
    const invalidatedToken = await tokenRepository.findOne({ id: token })
    if (!_.isEmpty(invalidatedToken)) { return res.status(401).json({ auth: false, message: 'Failed to authenticate token.' }) }

    req.userId = decoded.id
    req.token = token
    return next()
  } catch (err) {
    return res.status(500).json({ auth: false, message: 'Failed to authenticate token.', error: err })
  }
}
