import { serializerCompiler, validatorCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import fastifySwagger from '@fastify/swagger'

import fastify from 'fastify'
import { apiContext } from './routes'
import { errorHandler } from './shared/handlers'

import { PORT } from './config/env'
import { logger } from './shared/services'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.log.info('Start app')

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
    openapi: {
        info: {
            title: 'clash-worldchain-api-service',
            version: '1.0.0',
        },
        servers: [],
    },
    transform: jsonSchemaTransform,
})

app.after(() => {
    app.register(apiContext, { prefix: '/api' })
})

app.listen({ host: '0.0.0.0', port: PORT })

process.on('uncaughtException', function (err) {
    logger.error(err)
})