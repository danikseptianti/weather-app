/** @format */

import Storage from './Storage';
import {Platform} from 'react-native';
import {CommonActions} from '@react-navigation/native';

// const baseUrl = "https://amila-api.sodapos.com/";
const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const imageUrl = 'https://media.amila.id/image.php';
const Authorization = 'Basic c3VwZXJhZG1pbjphZG1pbg==';

const getHeader = async () => {
  let Token = await Storage.getString('token');
  // console.log('Token-Auth', Token)
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization,
    Token,
  };
};

const generateParams = params => {
  let queryString = '';
  for (let key in params) {
    if (!params.hasOwnProperty(key)) continue;
    if (typeof params[key] == 'object') {
      params[key].forEach((item, index) => {
        for (let keyItem in item) {
          queryString += `${key}[${index}][${keyItem}]=${encodeURI(
            item[keyItem],
          )}&`;
        }
      });
    } else {
      queryString += `${key}=${encodeURIComponent(params[key])}&`;
    }
  }
  return queryString == '' ? '' : `?${queryString.replace(/&+$/, '')}`;
};

const logOut = async props => {
  await Storage.setObject('user_session', null);
  await Storage.setObject('cart_session', null);
  await Storage.setString('token', '');
  props.dispatch(CommonActions.reset({index: 0, routes: [{name: 'Splash'}]}));
};

const ApiHelpers = {
  getGooglePlace: async url => {
    return new Promise(resolve => {
      fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status == 'OK') {
            return resolve(responseData);
          } else {
            return resolve(false);
          }
        })
        .catch(error => {
          return resolve(false);
        });
    });
  },
  get: async (props, url, params) => {
    let Header = await getHeader();
    return new Promise(resolve => {
      let uri = baseUrl + url + generateParams(params);
      fetch(uri, {
        method: 'GET',
        headers: {
          ...Header,
        },
      })
        .then(response => {
          // console.log(response.text())
          if (response.status == '401') {
            // logOut(props);
            // return resolve({
            //     status: 401,
            //     message: 'Anda Belum Login',
            // });
          }
          return response.json();
        })
        .then(responseData => {
          // console.log('data', responseData);
          // semua status code dengan respon data
          return resolve(responseData);
        })
        .catch(error => {
          // semua status code tanpa respon data
          console.log('errorGet, ' + url, error, params);
          return resolve({
            status: 500,
            message: 'Terjadi Kesalahan Server.',
          });
        });
    });
  },
  getError: async (props, url, params) => {
    let Header = await getHeader();
    return new Promise(resolve => {
      let uri = baseUrl + url + generateParams(params);
      fetch(uri, {
        method: 'GET',
        headers: {
          ...Header,
        },
      })
        .then(response => {
          // console.log(response.text())
          if (response.status == '401') {
            logOut(props);
            // return resolve({
            //     status: 401,
            //     message: 'Anda Belum Login',
            // });
          }
          return response.text();
        })
        .then(responseData => {
          // console.log('data', responseData);
          // semua status code dengan respon data
          return resolve(responseData);
        })
        .catch(error => {
          // semua status code tanpa respon data
          console.log('errorGet, ' + url, error, params);
          return resolve({
            status: 500,
            message: 'Terjadi Kesalahan Server.',
          });
        });
    });
  },
  post: async (props, url, body) => {
    let Header = await getHeader();
    return new Promise(resolve => {
      fetch(baseUrl + url, {
        method: 'POST',
        headers: {
          ...Header,
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (response.status == '401') {
            logOut(props);
          }
          return response.json();
        })
        .then(responseData => {
          // semua status code dengan respon data
          return resolve(responseData);
        })
        .catch(error => {
          // semua status code tanpa respon data
          console.log('errorPost, ' + url, error, body);
          return resolve({
            status: 500,
            message: 'Terjadi Kesalahan Server.',
          });
        });
    });
  },
  postError: async (props, url, body) => {
    let Header = await getHeader();
    return new Promise(resolve => {
      fetch(baseUrl + url, {
        method: 'POST',
        headers: {
          ...Header,
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (response.status == '401') {
            logOut(props);
          }
          return response.text();
        })
        .then(responseData => {
          // semua status code dengan respon data
          return resolve(responseData);
        })
        .catch(error => {
          // semua status code tanpa respon data
          console.log('errorPost, ' + url, error, body);
          return resolve({
            status: 500,
            message: 'Terjadi Kesalahan Server.',
          });
        });
    });
  },
  put: async (props, url, body) => {
    let Header = await getHeader();
    return new Promise(resolve => {
      fetch(baseUrl + url, {
        method: 'PUT',
        headers: {
          ...Header,
        },
        body: JSON.stringify(body),
      })
        .then(response => {
          if (response.status == '401') {
            logOut(props);
          }
          return response.json();
        })
        .then(responseData => {
          // semua status code dengan respon data
          return resolve(responseData);
        })
        .catch(error => {
          // semua status code tanpa respon data
          return resolve({
            status: 500,
            message: 'Terjadi Kesalahan Server.',
          });
        });
    });
  },
  uploadImage: async (props, body) => {
    if (Platform.OS !== 'android') {
      body.uri = body.uri.replace('file://', '');
    }

    let localUri = body.uri;
    let filename = body.fileName !== null ? body.fileName : Date() + '.jpg';

    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;

    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('image', {uri: localUri, name: filename, type});
    // console.log({ uri: localUri, name: filename, type });
    // formData.append('Content-Type', type);

    return new Promise(resolve => {
      fetch(imageUrl, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
          Authorization,
        },
      })
        .then(response => {
          if (response.status == '401') {
            logOut(props);
          }
          return response.json();
        })
        .then(responseData => {
          // semua status code dengan respon data
          return resolve(responseData);
        })
        .catch(error => {
          // semua status code tanpa respon data
          return resolve({
            status: 500,
            message: 'Terjadi Kesalahan Server.',
            error,
          });
          // console.log(error)
        });
    });
  },
};

export default ApiHelpers;
