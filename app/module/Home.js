import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  StatusBar,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Animated,
  ScrollView,
  FlatList,
} from 'react-native';
import {LinearTextGradient} from 'react-native-text-gradient';
import {Storage, ApiHelpers, MyHelpers} from '@helpers';

import LinearGradient from 'react-native-linear-gradient';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';

import Map from '../assets/map.png';

const SCREEN_WIDTH = Dimensions.get('window').width;
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const STYLES = ['default', 'dark-content', 'light-content'];
const TRANSITIONS = ['fade', 'slide', 'none'];

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      darkMode: true,
      arrWeather: [],
      mainWeather: [],
      arrTemp: [],
      arrForecast: [],
      cloudy: 'https://cdn-icons-png.flaticon.com/512/1146/1146869.png',
      rainy: 'https://cdn-icons-png.flaticon.com/512/615/615469.png',
      sunny:
        'https://cdn-icons.flaticon.com/png/512/1959/premium/1959304.png?token=exp=1648801776~hmac=203bf767635b3cea6bcd87276b59288d',
      thunder:
        'https://cdn-icons.flaticon.com/png/512/2864/premium/2864448.png?token=exp=1648801833~hmac=0eb90e264e7ef97e5f4f8d450f258d71',
      wind: 'https://cdn-icons-png.flaticon.com/512/2204/2204364.png',
      drizzle:
        'https://cdn-icons.flaticon.com/png/512/2524/premium/2524402.png?token=exp=1648830428~hmac=3fd764230885e00ec353cbedcfa2c971',
      snow: 'https://cdn-icons.flaticon.com/png/512/2315/premium/2315309.png?token=exp=1648830545~hmac=98e6f0996fc0f55ab43ff6b0b50aac35',
      clear: 'https://cdn-icons-png.flaticon.com/512/6320/6320087.png',
      date: moment().format('MMMM Do YYYY'),
      startdate: moment().add(1, 'd').format('MMMM Do YYYY'),
      tab: 'today',
    };
  }

  componentDidMount() {
    // this._unsubscribe = this.props.navigation.addListener('focus', () => {
    this.getWeather();
    // console.log(this.state.startdate);
    // });
  }

  componentWillUnmount() {
    // this._unsubscribe();
  }

  getWeather = async () => {
    this.setState({isLoading: true});
    let arrData = [];
    let response = await ApiHelpers.get(
      this.props.navigation,
      'weather?q=yogyakarta,id&appid=369e44bfc49814ce03a67c66461007a7&units=metric',
    );
    if (response.status === 200) {
      this.setState({isLoading: false});
      arrData = response;
    } else {
      this.setState({isLoading: false});
      arrData = response;
    }
    console.log('Weather', response);

    this.setState({
      arrWeather: response,
      mainWeather: response.weather[0],
      arrTemp: response.main,
    });
    console.log(this.state.arrWeather);
    this.getForecast();
  };

  getForecast = async () => {
    this.setState({isLoading: true});

    let arrData = [];
    let response = await ApiHelpers.get(
      this.props.navigation,
      'forecast?q=Yogyakarta, id&units=metric&APPID=369e44bfc49814ce03a67c66461007a7&units=metric',
    );
    if (response.status === 200) {
      this.setState({isLoading: false});

      arrData = response;
    } else {
      this.setState({isLoading: false});
    }
    console.log('Weather', response);

    this.setState({
      arrForecast: response,
    });
    console.log('arrForecast', this.state.arrForecast);
  };

  render() {
    return (
      <View
        style={[
          styles.container,
          {backgroundColor: this.state.darkMode === true ? '#101014' : '#fff'},
        ]}>
        {this.state.arrWeather.cod === 200
          ? this.BodyContent()
          : this.ErrorData()}
      </View>
    );
  }

  BodyContent() {
    return (
      <View>
        <StatusBar
          animated={true}
          backgroundColor={this.state.darkMode === true ? '#101014' : '#fff'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '300',
                fontSize: 17,
                lineOfHeight: 24,
                // textAlign: 'center',
              }}>
              {moment().format('LLL')}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Icons
                name={'map-marker'}
                size={20}
                color={this.state.darkMode === true ? '#fff' : '#59595A'}
              />
              <Text
                style={{
                  color: this.state.darkMode === true ? '#fff' : '#59595A',
                  fontWeight: '300',
                  fontSize: 17,
                  lineOfHeight: 24,
                  fontWeight: 'bold',
                  marginLeft: 10,
                }}>
                {this.state.arrWeather.name}{' '}
              </Text>
              <Text
                style={{
                  color: this.state.darkMode === true ? '#fff' : '#59595A',
                  fontWeight: '300',
                  fontSize: 17,
                  lineOfHeight: 24,
                  // fontWeight: 'bold',
                  // marginLeft: 10,
                }}>
                {/* , {this.state.arrWeather.sys.sunrise} */}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: '#CECECE',
              borderRadius: 50,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor:
                  this.state.darkMode == false ? '#F9D65D' : '#101014',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                // marginLeft: 10,
              }}
              onPress={() => this.setState({darkMode: false})}>
              <Icons
                name={'white-balance-sunny'}
                color={this.state.darkMode == false ? '#fff' : '#CECECE'}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({darkMode: true})}
              style={{
                width: 30,
                height: 30,
                backgroundColor:
                  this.state.darkMode == true ? '#F9D65D' : '#fff',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Icons
                name={'weather-night'}
                color={this.state.darkMode == true ? '#FFF' : '#CECECE'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ImageBackground source={Map} resizeMode="contain" style={styles.image}>
          {this.state.isLoading === true ? (
            <ShimmerPlaceHolder
              // visible={this.state.isLoading}
              style={{
                width: 120,
                height: 120,
                borderRadius: 75,
                alignSelf: 'center',
              }}
            />
          ) : (
            <Image
              source={{
                uri:
                  this.state.mainWeather.main === 'Clouds'
                    ? this.state.cloudy
                    : this.state.mainWeather.main === 'Rain'
                    ? this.state.rainy
                    : this.state.mainWeather.main === 'Thunderstorm'
                    ? this.state.thunder
                    : this.state.drizzle,
                // === 'Clouds' && this.state.cloudy,
              }}
              style={{
                width: 150,
                height: 150,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          )}

          {this.state.isLoading === true ? (
            <View>
              <ShimmerPlaceHolder
                // visible={this.state.isLoading}
                style={{
                  width: 80,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />
              <ShimmerPlaceHolder
                // visible={this.state.isLoading}
                style={{
                  width: 100,
                  borderRadius: 10,
                  alignSelf: 'center',
                  marginTop: 20,
                }}
              />
            </View>
          ) : (
            <View>
              <Text
                style={{
                  color: this.state.darkMode === true ? '#fff' : '#59595A',
                  fontWeight: '300',
                  fontSize: 22,
                  lineOfHeight: 24,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  marginTop: 20,
                }}>
                {this.state.mainWeather.main}
              </Text>
              <Text
                style={{
                  color: this.state.darkMode === true ? '#fff' : '#59595A',
                  // fontWeight: '300',
                  fontSize: 18,
                  lineOfHeight: 24,
                  // fontWeight: 'bold',
                  textAlign: 'center',
                  // marginTop: 20,
                }}>
                {this.state.mainWeather.description}
              </Text>
            </View>
          )}
        </ImageBackground>
        {this.state.isLoading === true ? (
          <ShimmerPlaceHolder
            // visible={this.state.isLoading}
            style={{
              width: 100,
              borderRadius: 10,
              alignSelf: 'center',
              marginTop: 20,
            }}
          />
        ) : (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: -80,
            }}>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '300',
                fontSize: 100,
                lineOfHeight: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
                marginLeft: 40,
              }}>
              {Math.round(this.state.arrTemp.temp)}
            </Text>
            <Text
              style={{
                color: '#FEED07',
                fontWeight: '300',
                fontSize: 70,
                lineOfHeight: 24,
                fontWeight: 'bold',
                textAlign: 'center',
                marginTop: 20,
              }}>
              °
            </Text>
          </View>
        )}

        <Animated.ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{flexDirection: 'row', marginTop: 20}}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                date: moment().format('MMMM Do YYYY'),
                tab: 'today',
              })
            }
            style={{
              paddingVertical: 7,
              paddingHorizontal: 12,
              backgroundColor:
                this.state.tab === 'today'
                  ? 'rgba(249, 214, 93, 1)'
                  : 'rgba(198,198,198, 0.1)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '300',
                fontSize: 17,
                lineOfHeight: 24,
                // textAlign: 'center',
              }}>
              Today
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                date: moment().add(1, 'd').format('MMMM Do YYYY'),
                tab: 'tomorrow',
              })
            }
            style={{
              paddingVertical: 7,
              paddingHorizontal: 12,
              backgroundColor:
                this.state.tab === 'tomorrow'
                  ? 'rgba(249, 214, 93, 1)'
                  : 'rgba(198,198,198, 0.1)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '300',
                fontSize: 17,
                lineOfHeight: 24,
                // textAlign: 'center',
              }}>
              Tomorrow
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                date: moment().add(2, 'd').format('MMMM Do YYYY'),
                tab: '2 days',
              })
            }
            style={{
              paddingVertical: 7,
              paddingHorizontal: 12,
              backgroundColor:
                this.state.tab === '2 days'
                  ? 'rgba(249, 214, 93, 1)'
                  : 'rgba(198,198,198, 0.1)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '300',
                fontSize: 17,
                lineOfHeight: 24,
                // textAlign: 'center',
              }}>
              Two days later
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                date: moment().add(3, 'd').format('MMMM Do YYYY'),
                tab: '3 days',
              })
            }
            style={{
              paddingVertical: 7,
              paddingHorizontal: 12,
              backgroundColor:
                this.state.tab === '3 days'
                  ? 'rgba(249, 214, 93, 1)'
                  : 'rgba(198,198,198, 0.1)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 5,
            }}>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '300',
                fontSize: 17,
                lineOfHeight: 24,
                // textAlign: 'center',
              }}>
              Three days later
            </Text>
          </TouchableOpacity>
        </Animated.ScrollView>
        {this.state.isLoading === true ? (
          <View>
            <ShimmerPlaceHolder
              // visible={this.state.isLoading}
              style={{
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
                height: 160,
                width: 90,
                marginTop: 20,
              }}
            />
          </View>
        ) : (
          <FlatList
            style={{marginTop: 20}}
            horizontal={true}
            data={this.state.arrForecast.list}
            renderItem={({item: rowData, index}) => (
              <View>
                {moment(rowData.dt_txt).format('MMMM Do YYYY') ===
                  this.state.date && (
                  <View
                    style={{
                      padding: 15,
                      backgroundColor: 'rgba(198,198,198, 0.1)',
                      borderRadius: 15,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                    }}>
                    <Image
                      source={{
                        uri:
                          rowData.weather[0].main === 'Clouds'
                            ? this.state.cloudy
                            : rowData.weather[0].main === 'Rain'
                            ? this.state.rainy
                            : owData.weather[0].main === 'Thunderstorm'
                            ? this.state.thunder
                            : this.state.drizzle,
                      }}
                      style={{width: 60, height: 60}}
                    />

                    <Text
                      style={{
                        color:
                          this.state.darkMode === true ? '#fff' : '#CECECE',
                        marginVertical: 15,
                      }}>
                      {moment(rowData.dt_txt).format('LT')}
                    </Text>

                    <Text
                      style={{
                        color:
                          this.state.darkMode === true ? '#fff' : '#484848',
                        fontWeight: '700',
                        fontSize: 18,
                      }}>
                      {Math.round(rowData.main.temp)}°
                    </Text>
                  </View>
                )}
              </View>
            )}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            onEndReached={this.onLoadMore}
            onEndThreshold={300}
          />
        )}

        {/* <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 30,
          }}>
          <View
            style={{
              padding: 15,
              backgroundColor: 'rgba(198,198,198, 0.1)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3445/3445718.png',
              }}
              style={{width: 60, height: 60}}
            />
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#CECECE',
                marginVertical: 15,
              }}>
              01:00 PM
            </Text>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '700',
                fontSize: 18,
              }}>
              11°
            </Text>
          </View>
          <View
            style={{
              padding: 15,
              backgroundColor: 'rgba(198,198,198, 0.1)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3445/3445718.png',
              }}
              style={{width: 60, height: 60}}
            />
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#CECECE',
                marginVertical: 15,
              }}>
              01:00 PM
            </Text>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '700',
                fontSize: 18,
              }}>
              11°
            </Text>
          </View>
          <View
            style={{
              padding: 15,
              backgroundColor: 'rgba(198,198,198, 0.1)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3445/3445718.png',
              }}
              style={{width: 60, height: 60}}
            />
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#CECECE',
                marginVertical: 15,
              }}>
              01:00 PM
            </Text>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '700',
                fontSize: 18,
              }}>
              11°
            </Text>
          </View>
          <View
            style={{
              padding: 15,
              backgroundColor: 'rgba(198,198,198, 0.1)',
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 10,
            }}>
            <Image
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/512/3445/3445718.png',
              }}
              style={{width: 60, height: 60}}
            />
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#CECECE',
                marginVertical: 15,
              }}>
              01:00 PM
            </Text>
            <Text
              style={{
                color: this.state.darkMode === true ? '#fff' : '#484848',
                fontWeight: '700',
                fontSize: 18,
              }}>
              11°
            </Text>
          </View>
        </View> */}
      </View>
    );
  }
  ErrorData() {
    return (
      <View>
        <StatusBar
          animated={true}
          backgroundColor={this.state.darkMode === true ? '#101014' : '#fff'}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 5,
              }}>
              <Icons
                name={'map-marker'}
                size={20}
                color={this.state.darkMode === true ? '#fff' : '#59595A'}
              />
            </View> */}
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderWidth: 1,
              borderColor: '#CECECE',
              borderRadius: 50,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                width: 30,
                height: 30,
                backgroundColor:
                  this.state.darkMode == false ? '#F9D65D' : '#101014',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                // marginLeft: 10,
              }}
              onPress={() => this.setState({darkMode: false})}>
              <Icons
                name={'white-balance-sunny'}
                color={this.state.darkMode == false ? '#fff' : '#CECECE'}
                size={20}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({darkMode: true})}
              style={{
                width: 30,
                height: 30,
                backgroundColor:
                  this.state.darkMode == true ? '#F9D65D' : '#fff',
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                marginLeft: 10,
              }}>
              <Icons
                name={'weather-night'}
                color={this.state.darkMode == true ? '#FFF' : '#CECECE'}
                size={20}
              />
            </TouchableOpacity>
          </View>
        </View>

        <ImageBackground source={Map} resizeMode="contain" style={styles.image}>
          <Image
            source={{
              uri: 'https://cdn-icons.flaticon.com/png/512/4380/premium/4380631.png?token=exp=1648831555~hmac=a592b04357264052a1113278044a7b03',
            }}
            style={{
              width: 150,
              height: 150,
              resizeMode: 'contain',
              alignSelf: 'center',
            }}
          />

          <Text
            style={{
              color: this.state.darkMode === true ? '#fff' : '#59595A',
              // fontWeight: '300',
              fontSize: 20,
              lineOfHeight: 24,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 20,
            }}>
            Internal Server Error
          </Text>
          <Text
            style={{
              color: this.state.darkMode === true ? '#fff' : '#59595A',
              // fontWeight: '300',
              fontSize: 16,
              lineOfHeight: 24,
              // fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 10,
            }}>
            The Server has been deserted for a while. Please be patient and try
            again or check your connection.
          </Text>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
    width: SCREEN_WIDTH - 30,
    height: 400,
    // marginTop: -50,
  },
});
