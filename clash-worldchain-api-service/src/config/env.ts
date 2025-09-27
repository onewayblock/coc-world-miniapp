import { config } from 'dotenv'
import { expand } from 'dotenv-expand'

const getEnv = (name: string, defaultValue?: any) => {
    if (!process.env[name]) {
        if (typeof defaultValue !== 'undefined') {
            return defaultValue!
        }
        throw new Error(`.env ${name} is undefined`)
    }
    return process.env[name]!
}

const cfg = config()
expand(cfg)

// Node environment
export const NODE_ENV = getEnv('NODE_ENV', 'prod')

export const IS_DEV = NODE_ENV === 'dev'

// Server
export const PORT = parseInt(getEnv('PORT'))

// Database
export const DB_USER = getEnv('DB_USER') as string
export const DB_PASSWORD = getEnv('DB_PASSWORD') as string
export const DB_HOST = getEnv('DB_HOST') as string
export const DB_PORT = parseInt(getEnv('DB_PORT'))
export const DB_NAME = getEnv('DB_NAME') as string

// Logging
export const LOG_LEVEL = getEnv('LOG_LEVEL', 'debug') as string
export const LOG_PRETTY = getEnv('LOG_PRETTY', false) as boolean

// Kafka
export const KAFKA_BROKERS = getEnv('KAFKA_BROKERS') as string
export const KAFKA_CA = getEnv('KAFKA_CA') as string
export const KAFKA_CLIENT_ID = getEnv('KAFKA_CLIENT_ID') as string
export const KAFKA_PASSWORD = getEnv('KAFKA_PASSWORD') as string
export const KAFKA_USERNAME = getEnv('KAFKA_USERNAME') as string

// KAFKA TOPICS
export const DEV_KAFKA_TOPIC = getEnv('DEV_KAFKA_TOPIC') as string
export const PROD_KAFKA_TOPIC = getEnv('PROD_KAFKA_TOPIC') as string

// GOLD SKY WEBHOOK SECRET
export const CLAIM_KEY = getEnv('CLAIM_KEY') as string
export const CLAIM_PERMIT_KEY = getEnv('CLAIM_PERMIT_KEY') as string