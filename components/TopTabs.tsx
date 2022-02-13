import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { v4 as uuidv4 } from 'uuid';
import Colors from '../constants/Colors';

export default function TopTabs({
  screen,
  clickTab,
  tabs,
}: {
  screen: {
    title: string;
    link: string;
  };
  clickTab: (tab: { title: string; link: string }) => void;
  tabs: { title: string; link: string }[];
}) {
  return (
    <View style={styles.topTabBar}>
      {tabs.map((tab) => {
        return (
          <TouchableOpacity
            style={styles.tabButton}
            key={uuidv4()}
            onPress={() => clickTab(tab)}
          >
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
    // padding: 10,
    height: '7%',
  },
  tabText: {
    color: 'black',
    fontSize: 15,
    textAlign: 'center',
  },
  selectedTabText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  tabButton: {
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
