import Service from './Service';

export default {
  fetchAll () {
    return Service.post('content.objects', { all: 1 }, (status, data) => {
      return Object.keys(data.data).map(key => data.data[key]);
    });
  },
  fetchByTemplates (...ids) {
    return Service.post('content.objects', {
      all: 1,
      jsonQuery: JSON.stringify({
        templateId: {
          '$in': [...ids]
        }
      })
    }, (status, data) => {
      return Object.keys(data.data).map(key => data.data[key]);
    });
  },
  fetchByParam (templateId, paramId, paramValue) {
    return Service.post(`content.templates.${templateId}.objects`, {
      all: 1,
      jsonQuery: JSON.stringify({
        [`values.${paramId}`]: paramValue
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
  create (templateId, data) {
    return Service.post(`content.templates.${templateId}.objects`, {
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
