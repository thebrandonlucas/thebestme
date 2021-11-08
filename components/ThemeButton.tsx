import * as React from 'react';
import { ButtonProps } from 'react-native';
import { Button } from 'react-native-elements';
import { Colors } from '../constants';
import { Styles } from '../types';

type ThemeButtonProps = ButtonProps & {
  buttonStyle?: Styles['viewStyle'];
  containerStyle?: Styles['viewStyle'];
};

export default function ThemeButton(props: ThemeButtonProps) {
  const { title, onPress, buttonStyle, containerStyle, color, ...other } =
    props;
  const backgroundColor = color ? color : Colors.themeColor;
  return (
    <Button
      buttonStyle={
        buttonStyle
          ? { ...buttonStyle as Object, backgroundColor }
          : {
              backgroundColor,
              padding: 10,
            }
      }
      containerStyle={
        containerStyle
          ? containerStyle
          : [
              {
                width: '90%',
                borderRadius: 8,
              },
            ]
      }
      title={title}
      onPress={onPress}
      {...other}
    />
  );
}
