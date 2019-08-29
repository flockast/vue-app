import axios from 'axios';

function Request (command, data = null) {
  return axios({
    method: 'post',
    url: command,
    data: data
  }).then(response => {
    return response;
  }).catch(error => {
    alert(`${command} request failed`);
    console.log(error);
  }).finally(() => {
    console.log('final');
  });
}

export default Request;
