/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { Text as DefaultText, View as DefaultView, Button } from 'react-native';
import { Card as DefaultCard, CheckBox as DefaultCheckBox } from 'react-native-elements'; 

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import {themeColor} from '../constants/Colors'; 

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Card(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'card');

  return <DefaultCard containerStyle={[{ backgroundColor }, { borderWidth: 0, width: '95%', borderRadius: 10 }, style]} {...otherProps} />;
}

export function Separator(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'separator');

  return (
    <View 
      style={[
      { backgroundColor },   
      {
        height: 1,
        width: '80%'
      }, style]}
      {...otherProps}
    />
  )
}

export function CheckBox(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return (
    <DefaultCheckBox 
      containerStyle={[
        {backgroundColor: 'transparent'}, 
        { borderWidth: 0, width: '95%', marginLeft: 30, padding: 0 }, 
        style
      ]}
      textStyle={{color: textColor}}
      checkedColor={themeColor}
      {...otherProps} 
    />
  );
}