import { FastifyInstance } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { worldchainService } from "../services/worldchain-service";
import { logger } from "../shared/services";
import { CLAIM_KEY, CLAIM_PERMIT_KEY } from "../config/env";
import { z } from "zod";

export function worldchainApiContext(server: FastifyInstance, _opts: unknown, done: () => void) {
    server.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/claim/',
        schema: {
            body: z.object({
                new: z.object({
                    block$: z.number(),
                    block_number: z.string(),
                    contract_id: z.string(),
                    id: z.string(),
                    timestamp: z.string(),
                    transaction_hash: z.string(),
                    user: z.string(),
                    vid: z.string(),
                }),
            }),
            response: {
                200: z.object({
                    message: z.string(),
                }),
            }
        },
        handler: async (req) => {
            logger.info(`Claim webhook received: ${JSON.stringify(req.body)}`);

            const key = req.headers['goldsky-webhook-secret'] as string;
            if (key !== CLAIM_KEY) {
                logger.error(`Invalid key: ${key}`);
                return { message: 'Invalid key' };
            }

            try {
                await worldchainService.handleClaim({
                    user: req.body.new.user,
                    transactionHash: req.body.new.transaction_hash,
                    withPermit: false,
                });
            } catch (error) {
                logger.error(`Error handling claim for user ${req.body.new.user} with transaction hash ${req.body.new.transaction_hash} and with permit ${false}`);
                throw error;
            }

            return { message: 'Webhook received' };
        }
    })

    // TODO: check schema
    server.withTypeProvider<ZodTypeProvider>().route({
        method: 'POST',
        url: '/claim-permit/',
        schema: {
            body: z.object({
                new: z.object({
                    block$: z.number(),
                    block_number: z.string(),
                    contract_id: z.string(),
                    id: z.string(),
                    timestamp: z.string(),
                    transaction_hash: z.string(),
                    user: z.string(),
                    vid: z.string(),
                }),
            }),
            response: {
                200: z.object({
                    message: z.string(),
                }),
            }
        },
        handler: async (req) => {
            logger.info(`Claim webhook received: ${JSON.stringify(req.body)}`);

            const key = req.headers['goldsky-webhook-secret'] as string;
            if (key !== CLAIM_PERMIT_KEY) {
                logger.error(`Invalid key: ${key}`);
                return { message: 'Invalid key' };
            }

            try {
                await worldchainService.handleClaim({
                    user: req.body.new.user,
                    transactionHash: req.body.new.transaction_hash,
                    withPermit: true,
                });
            } catch (error) {
                logger.error(`Error handling claim for user ${req.body.new.user} with transaction hash ${req.body.new.transaction_hash} and with permit ${true}`);
                throw error;
            }

            return { message: 'Webhook received' };
        }
    })

    done()
}