import { produceMessage } from "../clients/kafka";
import { DEV_KAFKA_TOPIC, PROD_KAFKA_TOPIC, IS_DEV } from "../config/env";
import { pgPool } from "../clients/pg-pool";
import { logger } from "../shared/services";

type ClaimRequest = {
    user: string;
    transactionHash: string;
    withPermit: boolean;
}

class WorldchainService {
    constructor() {
        this.createTable();
    }

    private async createTable() {
        if (!pgPool) {
            logger.error('Database not available, skipping worldchain claims table creation');
            throw new Error('Database not available');
        }

        const createTableQuery = `
        CREATE TABLE IF NOT EXISTS worldchain_claims (
            id SERIAL PRIMARY KEY,
            user_address VARCHAR(255) NOT NULL,
            transaction_hash VARCHAR(255) NOT NULL,
            with_permit BOOLEAN NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
        `

        try {
            await pgPool.query(createTableQuery);
        } catch (error: any) {
            logger.error(`Error creating worldchain claims table: ${error.message}`);
            throw error;
        }
    }

    public async handleClaim(request: ClaimRequest) {
        logger.info(`Handling claim for user ${request.user} with transaction hash ${request.transactionHash} and with permit ${request.withPermit}`);

        try {
            await this.saveToDatabase(request);
        } catch (error) {
            logger.error(`Error saving claim to database for user ${request.user} with transaction hash ${request.transactionHash} and with permit ${request.withPermit}`);
            throw error;
        }

        try {
            await this.sendToKafka(request);
        } catch (error) {
            logger.error(`Error sending claim to Kafka for user ${request.user} with transaction hash ${request.transactionHash} and with permit ${request.withPermit}`);
            throw error;
        }
    }

    private async sendToKafka(request: ClaimRequest) {
        logger.info(`Sending claim to Kafka for user ${request.user} with transaction hash ${request.transactionHash} and with permit ${request.withPermit}`);
        const topic = IS_DEV ? DEV_KAFKA_TOPIC : PROD_KAFKA_TOPIC;

        try {
            await produceMessage(request, topic);
        } catch (error) {
            logger.error(`Error sending claim to Kafka for user ${request.user} with transaction hash ${request.transactionHash} and with permit ${request.withPermit}`);
            throw error;
        }
    }

    private async saveToDatabase(request: ClaimRequest) {
        logger.info(`Saving claim to database for user ${request.user} with transaction hash ${request.transactionHash} and with permit ${request.withPermit}`);

        const query = `
            INSERT INTO worldchain_claims (user, transaction_hash, with_permit)
            VALUES ($1, $2, $3)
        `;

        try {
            await pgPool.query(query, [request.user, request.transactionHash, request.withPermit]);
        } catch (error) {
            logger.error(`Error saving claim to database for user ${request.user} with transaction hash ${request.transactionHash} and with permit ${request.withPermit}`);
            throw error;
        }
    }
}

export const worldchainService = new WorldchainService();
export type { ClaimRequest };