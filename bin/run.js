'use strict';

const slackClient = require('../server/slackClient');
const service = require('../server/service');
const http = require('http');
const credentials = require('../credentials');

const server = http.createServer(service);

const slackToken = credentials.slackAuth;
const slackLogLevel = 'verbose';

const witToken = credentials.witToken;
const witClient = require('../server/witClient')(witToken);

const rtm = slackClient.init(slackToken, slackLogLevel, witClient);
rtm.start();

slackClient.addAuthenticatedHandler(rtm, () => server.listen(3000));

server.on('listening', function() {
  console.log(`server is listening on ${server.address().port} in ${service.get('env')} mode`);
});