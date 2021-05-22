import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, useColorScheme } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Separator, Text, View } from '../components/Themed';
import Colors, { themeColor } from '../constants/Colors';
import { getDateString } from '../utils/index';

export default function JournalScreen() {
  const colorScheme = useColorScheme();
  const [text, onChangeText] = useState<string>('');
  const { date } = getDateString();

  return (
    <>
      <View style={styles.headerContainer}>
        <Text>
          <TouchableWithoutFeedback>
            <Text style={[styles.headerText, { color: themeColor }]}>
              {date}
            </Text>
          </TouchableWithoutFeedback>
        </Text>
        <Text>
          <TouchableOpacity>
            <Text style={[styles.headerText, { color: themeColor }]}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.headerText, { color: themeColor }]}>
              Past Entries
            </Text>
          </TouchableOpacity>
        </Text>
      </View>
      <Separator style={styles.separator} />
      <KeyboardAwareScrollView
        style={[
          { borderBottomColor: Colors[colorScheme].separator },
          { borderTopColor: Colors[colorScheme].separator },
        ]}
        keyboardDismissMode="on-drag"
        keyboardShouldPersistTaps="always"
      >
        <Input
          inputContainerStyle={{ borderBottomWidth: 0 }}
          placeholder="What's on your mind?"
          multiline
          onChangeText={onChangeText}
          value={text}
          scrollEnabled={false}
        />
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 15,
    margin: 10,
    // fontWeight: 'bold',
  },
  separator: {
    margin: 5,
    alignSelf: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
