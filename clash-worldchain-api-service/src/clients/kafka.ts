import { Kafka } from 'kafkajs';
import { KAFKA_BROKERS, KAFKA_CA, KAFKA_CLIENT_ID, KAFKA_PASSWORD, KAFKA_USERNAME } from '../config/env';

export const kafkaClient = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  sasl: {
    mechanism: 'plain',
    username: KAFKA_USERNAME,
    password: KAFKA_PASSWORD,
  },
  brokers: String(KAFKA_BROKERS).split(','),
  ssl: {
    ca: KAFKA_CA,
  },
});

const producer = kafkaClient.producer();

export const produceMessage = async (messageObject: any, topic: string) => {
  await producer.connect();
  await producer.send({
    topic: topic,
    messages: [
      {
        value: JSON.stringify(messageObject),
      },
    ],
  });

  await producer.disconnect();
};