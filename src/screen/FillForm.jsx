/* eslint-disable react-native/no-inline-styles */
import {KeyboardAvoidingView, ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';
import * as yup from 'yup';
import {Controller, useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {View, Button, TextInput} from 'react-native';
import {RadioButton} from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import {Picker} from '@react-native-picker/picker';
import {useDispatch} from 'react-redux';
import {addUser} from '../store/userSlice';
import CountryCodePicker from '../component/CountryCodePicker';

const FillForm = ({navigation}) => {
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    email: yup.string().required('Email is required').email('Invalid email'),
    fullName: yup
      .string()
      .trim()
      .required('name must contain at least 8 characters')
      .min(8, 'name must contain at least 8 characters')
      .matches(/^[A-Za-z\s]*$/, 'Please enter a valid name contains alphabets'),
    gender: yup.string().required('select atleast one option'),
    password: yup
      .string()
      .required()
      .min(8, 'minimum 8 characters need to  be entered')
      .max(12, 'max 12 character can be entered')
      .matches(RegExp('(.*[a-z].*)'), ' use Lowercase')
      .matches(RegExp('(.*[A-Z].*)'), ' use Uppercase')
      .matches(RegExp('(.*\\d.*)'), ' use Number')
      .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'use Special character'),
    phoneNumber: yup
      .string()
      .min(10, 'valid phoneNumber contains 10 digits only')
      .matches(
        /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
        {message: 'Please enter a valid phone number'}, // custom message
      ),
    houseNumber: yup.string().required('enter house number'),
    city: yup.string().required('select city'),
    technologies: yup
      .array()
      .min(1, 'You must select at least one technology.')
      .required('Please select at least one technology.'),
  });

  const {
    control,

    handleSubmit,
    formState: {errors},
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      phoneNumber: '',

      technologies: [],
      houseNumber: '',
      city: '',
    },
  });

  const onSubmit = data => {
    console.log('data from form', data);
    // dispatch(clearArray());
    dispatch(addUser(data));
    navigation.navigate('DisplayDetails');
  };
  const Technology = [
    {label: 'JavaScript', values: 'javascript'},
    {label: 'Python', values: 'python'},
    {label: 'Java', values: 'java'},
  ];

  const country = [
    {label: 'India', value: 'india'},
    {label: 'New York', value: 'newYork'},
    {label: 'London', value: 'london'},
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior={'position'}>
      <ScrollView>
        <View style={{flex: 1, padding: 14, backgroundColor: '#FFFFF8'}}>
          <Text
            style={{
              color: 'black',
              fontSize: 30,
              textAlign: 'center',
              fontWeight: 'bold',
              marginBottom: 10,
            }}>
            Enter your Details
          </Text>

          <Text style={{color: 'black', fontSize: 20}}>Full Name</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.textInputstyle}
                placeholder="FullName"
                onChangeText={onChange}
                value={value}
                placeholderTextColor="black"
              />
            )}
            name="fullName"
          />
          {errors.fullName && (
            <Text style={{color: 'red'}}>{errors.fullName.message}</Text>
          )}

          <Text style={{color: 'black', fontSize: 20, marginTop: 10}}>
            Email adress
          </Text>
          <Controller
            control={control}
            rules={{
              maxLength: 100,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={styles.textInputstyle}
                placeholder="enter email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="black"
              />
            )}
            name="email"
          />
          {errors.email && (
            <Text style={{color: 'red'}}>{errors.email.message}</Text>
          )}

          <Text style={{color: 'black', fontSize: 20, marginTop: 10}}>
            Gender
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <RadioButton.Group
                onValueChange={newValue => onChange(newValue)}
                value={value}>
                <View style={{flexDirection: 'row'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <RadioButton value="male" />
                    <Text style={{color: 'black'}}>Male</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <RadioButton value="female" />
                    <Text style={{color: 'black'}}>Female</Text>
                  </View>
                </View>
              </RadioButton.Group>
            )}
            name="gender"
          />
          {errors.gender && (
            <Text style={{color: 'red'}}>{errors.gender.message}</Text>
          )}

          <Text style={{color: 'black', fontSize: 20}}>Password</Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.textInputstyle}
                placeholder="Passward"
                onChangeText={onChange}
                value={value}
                keyboardType="default"
                placeholderTextColor="black"
              />
            )}
            name="password"
          />
          {errors.password && (
            <Text style={{color: 'red'}}>{errors.password.message}</Text>
          )}
          <Text style={{color: 'black', fontSize: 20, marginTop: 10}}>
            Phone Number
          </Text>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({field: {onChange, value}}) => (
              <TextInput
                style={styles.textInputstyle}
                placeholder="phone Number"
                onChangeText={onChange}
                value={value}
                keyboardType="number-pad"
                placeholderTextColor="black"
              />
            )}
            name="phoneNumber"
          />
          {errors.phoneNumber && (
            <Text style={{color: 'red'}}>{errors.phoneNumber.message}</Text>
          )}
          <Text style={{color: 'black', fontSize: 20, marginTop: 10}}>
            Technology
          </Text>

          <View style={{padding: 20}}>
            <Controller
              control={control}
              name="technologies"
              render={({field: {onChange, value}}) => {
                const selectedValues = Array.isArray(value) ? value : [];

                return (
                  <View style={{flexDirection: 'row', columnGap: 10}}>
                    {Technology.map(({label, values}) => (
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}
                        key={label}>
                        <CheckBox
                          value={selectedValues.includes(values)}
                          onValueChange={() => {
                            if (selectedValues.includes(values)) {
                              onChange(
                                selectedValues.filter(val => val !== values),
                              );
                            } else {
                              onChange([...selectedValues, values]);
                            }
                          }}
                          tintColors={{true: 'blue', false: 'red'}}
                        />
                        <Text style={{color: 'black'}}>{label}</Text>
                      </View>
                    ))}
                  </View>
                );
              }}
            />
            {errors.technologies && (
              <Text style={{color: 'red', marginTop: 10}}>
                {errors.technologies.message}
              </Text>
            )}
          </View>

          <Text style={{color: 'black', fontSize: 20, marginTop: 2}}>
            Address
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View>
              <Text style={{color: 'black', fontSize: 16, marginTop: 10}}>
                House Number
              </Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    style={[styles.textInputstyle, {width: 100}]}
                    placeholder="houeseNo."
                    onChangeText={onChange}
                    value={value}
                    placeholderTextColor="black"
                  />
                )}
                name="houseNumber"
              />
              {errors.houseNumber && (
                <Text style={{color: 'red'}}>{errors.houseNumber.message}</Text>
              )}
            </View>
            <View style={{flexDirection: 'row', columnGap: 10}}>
              <Text style={{color: 'black', fontSize: 16, marginTop: 10}}>
                city
              </Text>

              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({field: {onChange, value}}) => (
                  <Picker
                    style={{
                      height: 40,
                      width: 160,
                      borderWidth: 2,
                      borderColor: 'black',
                      backgroundColor: 'red',
                    }}
                    selectedValue={value}
                    onValueChange={itemValue => onChange(itemValue)}>
                    <Picker.Item label="choose city" value={value} />
                    <Picker.Item label="Lucknow" value="lucknow" />
                    <Picker.Item label="Delhi" value="delhi" />
                    <Picker.Item label="Mumbai" value="mumbai" />
                  </Picker>
                )}
                name="city"
              />
            </View>
          </View>
          <View style={{alignSelf: 'flex-end'}}>
            {errors.city && (
              <Text style={{color: 'red'}}>{errors.city.message}</Text>
            )}
          </View>
          <View>
            <Text style={{color: 'black', fontSize: 20}}>Select country</Text>
            <CountryCodePicker />
          </View>

          <View style={{marginTop: 20}}>
            <Button title="Submit" onPress={handleSubmit(onSubmit)} />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default FillForm;

const styles = StyleSheet.create({
  textInputstyle: {
    borderWidth: 2,
    borderColor: 'black',
    height: 40,
    width: '100%',
    color: 'black',
    padding: 5,
  },
});
