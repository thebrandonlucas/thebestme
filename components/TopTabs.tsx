import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Colors from '../constants/Colors';

export default function TopTabs({
  screen,
  setScreen,
  tabs,
}: {
  screen: {
    title: string;
    link: string;
  };
  setScreen: React.Dispatch<
    React.SetStateAction<{
      title: string;
      link: string;
    }>
  >;
  tabs: { title: string; link: string }[];
}) {
  function clickTab(tab) {
    setScreen(tab);
  }
  return (
    <View style={styles.topTabBar}>
      {tabs.map((tab) => {
        return (
          <TouchableOpacity key={uuidv4()} onPress={() => clickTab(tab)}>
            <Text
              style={
                tab.title === screen.title
                  ? styles.selectedTabText
                  : styles.tabText
              }
            >
              {tab.title}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  topTabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: Colors.happyGreen,
    padding: 10,
  },
  tabText: {
    color: 'black',
  },
  selectedTabText: {
    color: 'white',
  },
  background: {
    borderColor: 'red',
    borderWidth: 1,
  },
});
