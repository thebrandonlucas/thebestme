import * as React from 'react';
import { ButtonProps } from 'react-native';
import { Button } from 'react-native-elements';
import { Colors } from '../constants';

export default function ThemeButton(props: ButtonProps) {
  const { title } = props;

  return (
    <Button
      buttonStyle={{
        backgroundColor: Colors.themeColor,
        padding: 10,
      }}
      containerStyle={[
        {
          width: '90%',
          borderRadius: 8,
        },
      ]}
      title={title}
    />
  );
}
