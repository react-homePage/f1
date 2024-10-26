/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/self-closing-comp */
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {editUser} from '../store/userSlice';
import {useNavigation} from '@react-navigation/native';

const CustomModal = ({modalVisible, setModalVisible, item}) => {
  const navigation = useNavigation();
  const oldArray = useSelector(state => state.userData.userDataArray);
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState(item.fullName);
  const [city, setCity] = useState(item.city);
  const [email, setEmail] = useState(item.email);

  const handleSave = myItem => {
    const findIndexValue = oldArray.findIndex(
      item => item.email === myItem.email,
    );
    console.log('index', findIndexValue);

    const newObject = {...item, fullName, city, email};
    console.log('new object', newObject);

    dispatch(editUser({newObject, findIndexValue}));

    setTimeout(() => {
      setModalVisible(prev => !prev);
      navigation.navigate('DisplayDetails');
    }, 500);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 16, color: 'black', textAlign: 'left'}}>
              Name
            </Text>
            <TextInput
              style={styles.textInputBox}
              value={fullName}
              onChangeText={value => setFullName(value)}></TextInput>
            <Text style={{fontSize: 16, color: 'black'}}>city</Text>
            <TextInput
              style={styles.textInputBox}
              value={city}
              onChangeText={value => setCity(value)}></TextInput>
            <Text style={{fontSize: 16, color: 'black'}}>email</Text>
            <TextInput
              style={styles.textInputBox}
              value={email}
              onChange={value => setEmail(value)}></TextInput>

            <View style={{flexDirection: 'row', columnGap: 10, marginTop: 20}}>
              <TouchableOpacity
                style={{backgroundColor: 'blue'}}
                onPress={() => handleSave(item)}>
                <Text
                  style={{
                    fontSize: 20,
                    padding: 10,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{backgroundColor: 'red'}}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text
                  style={{
                    fontSize: 20,
                    padding: 10,
                    color: 'white',
                    fontWeight: 'bold',
                  }}>
                  cancel
                </Text>
              </TouchableOpacity>
            </View>
            {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  textInputBox: {
    height: 40,
    width: 270,
    color: 'black',
    borderWidth: 2,
    borderColor: 'black',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 500,
    backgroundColor: 'red',
  },
  modalView: {
    height: 400,
    width: 300,
    marginHorizontal: 10,
    marginRight: 150,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    rowGap: 10,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default CustomModal;
