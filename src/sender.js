const { ServiceBusClient } = require("@azure/service-bus");

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

// Define connection string and related Service Bus entity names here
const queueName = process.env.AZURE_SERVICE_QUEUE_NAME;
const sbClient = ServiceBusClient.createFromConnectionString(process.env.AZURE_SERVICE_CONNECTION_STRING);

const listOfScientists = [
  { name: "Einstein", firstName: "Albert" },
  { name: "Heisenberg", firstName: "Werner" },
  { name: "Curie", firstName: "Marie" },
  { name: "Hawking", firstName: "Steven" },
  { name: "Newton", firstName: "Isaac" },
  { name: "Bohr", firstName: "Niels" },
  { name: "Faraday", firstName: "Michael" },
  { name: "Galilei", firstName: "Galileo" },
  { name: "Kepler", firstName: "Johannes" },
  { name: "Kopernikus", firstName: "Nikolaus" }
];

async function sendMsg() {
  // If using Topics & Subscription, use createSubscriptionClient to peek from the subscription
  const queueClient = sbClient.createQueueClient(queueName);
  const sender = queueClient.createSender();

  try {
    for (let index = 0; index < listOfScientists.length; index++) {
      const scientist = listOfScientists[index];
      const message = {
        body: `${scientist.firstName} ${scientist.name}`,
        label: "Scientist"
      };

      console.log(`Sending message: ${message.body} - ${message.label}`);
      await sender.send(message);
    }

    await queueClient.close();
  } finally {
    await sbClient.close();
  }
}

exports.sendMsg = sendMsg;