import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Colors from '../constants/Colors';

export default function TopTabs({ tabName: tab }) {
  return (
    <View style={styles.topTabBar}>
      <TouchableOpacity style={styles.background}>
        <Text>Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.background}>
        <Text>Test</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.background}>
        <Text>Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.happyGreen,
    // flex: 1
  },
  background: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
