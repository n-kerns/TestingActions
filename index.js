const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');

const constructMessage = () => {
  const pullAuthor = github.context.payload.pull_request.user.login;
  const pullURL = github.context.payload.pull_request.html_url;
  return `:pr: A PR was posted by ${pullAuthor} on the CamtasiaWin repo. Check it out at ${pullURL}`;
}

try {
  const apiToken = core.getInput('flowdock_api_token');
  const organization = core.getInput('organization');
  const flow = core.getInput('flow');

  const messageContent = constructMessage();
  axios.post(`https://${apiToken}@api.flowdock.com/flows/${organization}/${flow}/messages`,
  {
    event: 'message',
    content: messageContent,
    external_user_name: 'CamtasiaWinGitHub'
  }).then(response => {
    if (response.status === 200 || response.status === 202) {
      console.log("SUCCESS! Posted the message to flowdock.");
    }
    else {
      console.warn('We got a weird response...');
      core.setFailed(JSON.stringify(response.data));
    }
  }).catch(error => {
    core.setFailed(error.message);
  });
} catch (error) {
  core.setFailed(error.message);
}