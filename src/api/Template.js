import Service from './Service';

export default {
  getAll () {
    return Service.post('content.templates', 'all=1', (status, data) => {
      return Object.keys(data.data).map(key => data.data[key]);
    });
  }
};
