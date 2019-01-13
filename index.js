const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

const slackPostMessageEndPoint = 'https://slack.com/api/chat.postMessage';
const botToken = process.env.BOT_TOKEN;

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
  const token = req.body.token;
  const event = req.body.event;

  if (req.body.type && req.body.type === 'url_verification') {
    const challenge = req.body.challenge;
    res.send(JSON.stringify({ challenge: challenge }));
  } else if (
    event.type &&
    event.type === 'message' &&
    event.bot_id !== 'BFC0LA14M'
  ) {
    res.sendStatus(200);
    axios
      .post(
        slackPostMessageEndPoint,
        { text: 'This is SuperBot', channel: `${event.channel}` },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${botToken}`
          }
        }
      )
      .then(res => null)
      .catch(e => console.log(e));
  }
});

app.listen(port, () => console.log(`server is listening...`));
