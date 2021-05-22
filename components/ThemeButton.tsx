import * as React from 'react';
import { Button } from 'react-native-elements';
import { Colors } from '../constants';

export default function ThemeButton(props: any) {
  const { style, ...otherProps } = props;

  return (
    <Button
      buttonStyle={{
        backgroundColor: Colors.themeColor,
        padding: 10,
      }}
      containerStyle={{
        width: '90%',
        borderRadius: 8,
      }}
      {...otherProps}
    />
  );
}
