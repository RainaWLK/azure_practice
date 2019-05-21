const sender = require('./sender.js');
const receiver = require('./receiver.js');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

async function main() {
  try {
    await receiver.receiveMsg();
    console.log('receive msg done');

    await sender.sendMsg();
  }
  catch(err) {
    console.error('receive msg error');
    console.error(err);
  }

}

main().catch((err) => {
  console.log("Error occurred: ", err);
});