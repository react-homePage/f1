import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {deleteUser} from '../store/userSlice';

const RenderFlatList = ({item, handleEdit}) => {
  const dispatch = useDispatch();

  const handledelete = itemId => {
    dispatch(deleteUser(itemId));
  };
  return (
    <View style={styles.box}>
      <View style={{width: '70%'}}>
        <Text style={styles.textStyle}>Name:{item?.fullName}</Text>
        <Text style={styles.textStyle}>email:{item?.email}</Text>
        <Text style={styles.textStyle}>city:{item?.city}</Text>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10, columnGap: 10}}>
        <TouchableOpacity onPress={() => handledelete(item.email)}>
          <Ionicons name="trash-outline" color="red" size={35} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEdit}>
          <Ionicons name="create-outline" color="red" size={35} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RenderFlatList;

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 18,
    color: 'brown',
    fontWeight: 'bold',
  },
  box: {
    backgroundColor: '#D3D3D3',
    marginTop: 20,
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 150,
  },
});
