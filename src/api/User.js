import Service from './Service';

const User = {
  auth () {
    return Service.get('api.login?login=root&password=root', (status, data) => {
      return data;
    });
  }
};

export default User;
