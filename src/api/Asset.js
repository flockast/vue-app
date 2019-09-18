import Service from './Service';

export default {
  fetchAll () {
    return Service.post('content.objects', { all: 1 }, (status, data) => {
      return Object.keys(data.data).map(key => data.data[key]);
    });
  },
  fetchByTemplates (...ids) {
    return Service.post('content.objects', {
      jsonQuery: JSON.stringify({
        templateId: {
          '$in': [...ids]
        }
      })
    }, (status, data) => {
      return data.data;
    });
  },
  update (data) {
    return Service.post('content.objects', {
      action: 'update',
      jsonModels: JSON.stringify(data)
    }, (status, data) => {
      return data;
    });
  }
};
