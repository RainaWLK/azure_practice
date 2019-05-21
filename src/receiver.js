const { ServiceBusClient, ReceiveMode } = require("@azure/service-bus");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Define connection string and related Service Bus entity names here
const queueName = process.env.AZURE_SERVICE_QUEUE_NAME;
const sbClient = ServiceBusClient.createFromConnectionString(process.env.AZURE_SERVICE_CONNECTION_STRING);


async function receiveMsg() {
  // If receiving from a Subscription, use `createSubscriptionClient` instead of `createQueueClient`
  const queueClient = sbClient.createQueueClient(queueName);

  // To receive messages from sessions, use getSessionReceiver instead of getReceiver or look at
  // the sample in sessions.js file
  const receiver = queueClient.createReceiver(ReceiveMode.peekLock);

  const myMessageHandler = async (message) => {
    // message received
    console.log('got Message!');
    console.log(message.label);
    console.log(message.body);

    // message processing successed, complete it
    await message.complete();
  };
  const myErrorHandler = (error) => {
    console.log(error);
  };
  receiver.registerMessageHandler(myMessageHandler, myErrorHandler);
}

exports.receiveMsg = receiveMsg;