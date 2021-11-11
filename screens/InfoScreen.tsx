import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { memo, useEffect } from 'react';
import {
  ActivityIndicator,
  Button,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { Text, View } from '../components/Themed';
import Descriptions from '../constants/Descriptions';

export function InfoScreen({ navigation, infoType }) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      {infoType ? (
        <ScrollView>
          <Text style={styles.description}>
            {Descriptions[infoType].description}
            {'\n'}
          </Text>
          {Descriptions[infoType].link && (
            <Button
              title="Click here to learn more"
              onPress={() => openLink(Descriptions[infoType].link)}
            />
          )}
        </ScrollView>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

function openLink(link: string) {
  WebBrowser.openBrowserAsync(link);
}

const mapStateToProps = (state) => {
  const { infoType } = state.descriptionReducer;
  return { infoType };
};

export default connect(mapStateToProps)(memo(InfoScreen));

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    width: '90%',
    height: '95%',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    // alignSelf: 'center',
    // textAlign: 'center',
  },
  description: {
    fontSize: 20,
  },
});
