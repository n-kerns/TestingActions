const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

try {
  axios.post(`https://${core.getInput('flowdock_api_token')}@api.flowdock.com/flows/${core.getInput('organization')}/${core.getInput('flow')}/messages`,
  {
    'event': 'message',
    'content': "HOWDY!!!! :smiley:",
    'external_user_name': 'Flowdock TEST'
  }).then(response => {
    console.log(JSON.stringify(response));
  }).catch(error => {
    core.setFailed(error.message);
  });
} catch (error) {
  core.setFailed(error.message);
}