import amqp from "amqplib";

export const sendToRabbitMQ = async (message) => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

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
