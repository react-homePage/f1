import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useLayoutEffect} from 'react';

const HomeScreen = ({navigation}) => {
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  return (
    <View style={styles.mainContainer}>
      <ImageBackground
        style={styles.background}
        source={require('../assets/img1.png')}
      />
      <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity onPress={() => navigation.navigate('FillForm')}>
          <Text style={styles.text}>FillForm</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('DisplayDetails')}>
          <Text style={styles.text}>Display Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 24,
    fontWeight: '700',
    color: 'black',
  },
  background: {
    height: '50%',
    width: '90%',
    alignSelf: 'center',
  },
});
