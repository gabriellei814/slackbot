'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');

const server = http.createServer(service);

const slackToken = 'xoxp-116563922486-115182110704-115198407600-8133ce87e6540bacd096412e1c08bc14';
const slackLogLevel = 'verbose';

const rtm = slackClient.init(slackToken, slackLogLevel);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
  console.log(`server is listening on ${server.address().port} in ${service.get('env')} mode`);
});