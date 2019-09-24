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
      return Object.keys(data.data).map(key => data.data[key]);
    });
  },
  update (data) {
    return Service.post('content.objects', {
      action: 'update',
      jsonModels: JSON.stringify(data)
    }, (status, data) => {
      return Object.keys(data.data).map(key => data.data[key]);
    });
  },
  create (data) {
    return Service.post('content.templates.streets.objects', {
      action: 'create',
      jsonModels: JSON.stringify(data)
    }, (status, data) => {
      return Object.keys(data.data).map(key => data.data[key]);
    });
  },
  delete (ids) {
    return Service.post('content.objects', {
      action: 'delete',
      'ref[]': ids
    }, (status, data) => {
      return Object.keys(data.data).map(key => key);
    });
  }
};
