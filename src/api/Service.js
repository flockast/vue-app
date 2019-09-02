import axios from 'axios';
import qs from 'querystring';
import store from '../store';
import { baseURL } from '../../cms.config';

class Service {
  constructor () {
    let service = axios.create({
      baseURL: baseURL,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    service.interceptors.request.use((config) => {
      const token = store.getters['user/token'];
      if (config.params === undefined) {
        config.params = {};
      }
      if (token) {
        config.params['setCookie[admin_session]'] = token;
      }
      console.log(config);
      return config;
    }, function (err) {
      return Promise.reject(err);
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);
    this.service = service;
  }

  handleSuccess (response) {
    return response;
  }

  handleError = (error) => {
    return Promise.reject(error);
  }

  get (path, callback) {
    return this.service.get(path).then(
      (response) => callback(response.status, response.data)
    );
  }

  post (path, payload, callback) {
    return this.service.request({
      method: 'POST',
      url: path,
      responseType: 'json',
      data: qs.stringify(payload)
    }).then((response) => callback(response.status, response.data));
  }
}

export default new Service();
