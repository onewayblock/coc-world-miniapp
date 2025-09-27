import { FastifyInstance } from 'fastify'

import { worldchainApiContext } from './worldchain'

export async function apiContext(server: FastifyInstance, _opts: unknown, done: () => void) {
    await server.after()

    server.register(worldchainApiContext, { prefix: '/worldchain' })

    done()
}