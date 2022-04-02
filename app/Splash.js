import React, {Component} from 'react';
import {
  View,
  StatusBar,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  Text,
  StyleSheet,
  Platform,
  Image,
} from 'react-native';
// import { ColorHelpers } from '@helpers'
import {CommonActions} from '@react-navigation/native';
// import image_bg from './assets/images/bg_splash.png'
import InAppUpdate from './InAppUpdate';

const SCREEN_WIDTH = Dimensions.get('window').width;

export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      haveSession: false,
      loadingMessage: '.. Loading ..',
      fcm_token: '',
    };

    this.initialize();
  }

  initialize = async () => {
    // if (Platform.OS === 'android') {
    //   InAppUpdate.checkUpdate();
    // }
    setTimeout(() => {
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    }, 1500);
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor={'rgba(255,255,255,0.0)'}
          barStyle={'light-content'}
        />
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/1146/1146856.png',
          }}
          style={{width: 200, height: 200, marginBottom: 30}}
        />
        <Text style={{color: '#fff', fontSize: 35, fontWeight: '500'}}>
          Weather
        </Text>
        <Text style={{color: '#fff', fontSize: 35, fontWeight: '500'}}>
          Application
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 20,
            lineOfHeight: 22,
            textAlign: 'center',
            marginTop: 20,
          }}>
          Get to know your weather maps and preception forecast
        </Text>
        <ActivityIndicator
          size="large"
          color="#F9D65D"
          style={{position: 'absolute', bottom: 100}}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
    backgroundColor: '#101014',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
