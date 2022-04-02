import AsyncStorage from '@react-native-community/async-storage';

const Storage = {
  getObject: async key => {
    return new Promise(async resolve => {
      await AsyncStorage.getItem(key, (err, res) => {
        if (res == null) resolve(null);
        resolve(JSON.parse(res));
      });
    });
  },
  getString: async key => {
    return new Promise(async resolve => {
      await AsyncStorage.getItem(key, (err, res) => {
        if (res == null) resolve('');
        resolve(res);
      });
    });
  },
  setObject: async (key, obj) => {
    await AsyncStorage.setItem(key, JSON.stringify(obj));
    return true;
  },
  setString: async (key, str) => {
    await AsyncStorage.setItem(key, str);
    return true;
  },
};

export default Storage;
