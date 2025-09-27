import {FastifyError, FastifyReply, FastifyRequest} from 'fastify'
import {ZodError} from 'zod'
import {HttpError} from '../classes'
import { logger } from '../services'
export function errorHandler(
    error: FastifyError,
    req: FastifyRequest,
    reply: FastifyReply
): FastifyReply {
    if (error instanceof ZodError) {
        return reply.status(422).send({error: error.errors})
    } else if (error instanceof HttpError) {
        const status = error.statusCode ?? 500
        return reply.status(status).send({
            success: false,
            message: error.message,
        })
    }

    logger.error(error, 'An unexpected error occurred {500}')
    return reply.status(500).send({
        error: error.message,
    })
}