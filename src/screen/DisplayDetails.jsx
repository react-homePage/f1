import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import RenderFlatList from '../component/RenderFlatList';
import CustomModal from '../component/CustomModal';
import {clearArray, editUser} from '../store/userSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DisplayDetails = ({route, navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);
  const userData = useSelector(state => state.userData.userDataArray);
  const dispatch = useDispatch();
  console.log('array', userData);

  const handleEdit = item => {
    setItemToEdit(item);
    setModalVisible(prev => !prev);
  };

  const handleData = () => {
    dispatch(clearArray());
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={24} color="white" />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: 'black',
      },
    });
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: 'black', paddingHorizontal: 10}}>
      <Text style={styles.textStyle}>DisplayDetails</Text>
      {userData && (
        <FlatList
          data={userData}
          keyExtractor={item => item.email}
          renderItem={({item}) => (
            <RenderFlatList item={item} handleEdit={() => handleEdit(item)} />
          )}
        />
      )}
      {modalVisible && (
        <View style={{height: 800}}>
          <CustomModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            item={itemToEdit}
          />
        </View>
      )}
    </View>
  );
};

export default DisplayDetails;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
});
