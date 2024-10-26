/* eslint-disable react-native/no-inline-styles */
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CountryPicker} from 'react-native-country-codes-picker';
const CountryCodePicker = () => {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={{
          width: '40%',
          height: 60,
          backgroundColor: 'grey',
          padding: 10,
        }}>
        <Text
          style={{
            color: 'black',
            fontSize: 20,
          }}>
          {countryCode}
        </Text>
      </TouchableOpacity>

      <CountryPicker
        show={show}
        style={{
          textInput: {
            height: 80,
            borderRadius: 0,
          },
          dialCode: {
            color: 'black',
          },
          // Country name styles [Text]
          countryName: {
            color: 'black',
          },
        }}
        // when picker button press you will get the country object with dial code
        pickerButtonOnPress={item => {
          setCountryCode(item.dial_code);
          setShow(false);
        }}
      />
    </View>
  );
};

export default CountryCodePicker;

const styles = StyleSheet.create({});
