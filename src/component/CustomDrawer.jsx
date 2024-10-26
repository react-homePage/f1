/* eslint-disable react-native/no-inline-styles */
import {
  Button,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from '@react-navigation/drawer';
import {DrawerActions, useNavigation} from '@react-navigation/native';

const CustomDrawer = props => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <View
          style={{
            flexDirection: 'row',
            padding: 30,
            backgroundColor: 'green',
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/img1.png')}
            style={{height: 100, width: 100}}
          />
        </View>

        <View style={{padding: 20}}>
          <DrawerItem
            label="Help"
            onPress={() => Linking.openURL('https://mywebsite.com/help')}
          />
        </View>
        <View></View>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({});
