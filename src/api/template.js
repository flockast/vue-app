import request from './request';

export default {
  getAll () {
    return request('content.templates');
  }
};
