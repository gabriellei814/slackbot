'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

const slackToken = 'xoxb-115822953155-2qRUrb6BjmTYQNOjP7wshFQk';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
  console.log(`server is listening on ${server.address().port} in ${service.get('env')} mode`);
});