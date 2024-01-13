import amqp from "amqplib";
import dotenv from "dotenv";

dotenv.config();

export const sendToRabbitMQ = async (message) => {
  try {
    const connection = await amqp.connect(
      `amqp://${process.env.RABBITMQ_DEFAULT_USER}:${process.env.RABBITMQ_DEFAULT_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
    console.log("Connected to RabbitMQ");

    const channel = await connection.createChannel();

    console.log("Channel created");

    // Declare the exchange and queue
    const queueName = "prescription_queue";
    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), { persistent: true });

    console.log("Message sent to RabbitMQ:", message);

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error consuming messages from RabbitMQ:", error);
  }
};
