import * as React from 'react';
import { ButtonProps } from 'react-native';
import { Button } from 'react-native-elements';
import { Colors } from '../constants';

export default function ThemeButton(props: ButtonProps) {
  const { title, onPress } = props;

  return (
    <Button
      buttonStyle={{
        backgroundColor: props.color ? props.color : Colors.themeColor,
        padding: 10,
      }}
      containerStyle={[
        {
          width: '90%',
          borderRadius: 8,
        },
      ]}
      title={title}
      onPress={onPress}
    />
  );
}
