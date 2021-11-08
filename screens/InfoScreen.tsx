import * as React from 'react';
import { memo, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { Text, View } from '../components/Themed';
import Descriptions from '../constants/Descriptions';

export function InfoScreen({ navigation, infoType }) {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <Text>Info</Text>
      {infoType ? (
        <Text>{Descriptions[infoType].description}</Text>
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const mapStateToProps = (state) => {
  const { infoType } = state.descriptionReducer;
  return { infoType };
};

export default connect(mapStateToProps)(memo(InfoScreen));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
