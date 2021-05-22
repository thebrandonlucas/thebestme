/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from 'react';
import { Text as DefaultText, View as DefaultView } from 'react-native';
import { Calendar as DefaultCalendar } from 'react-native-calendars';
import {
  Card as DefaultCard,
  CheckBox as DefaultCheckBox,
  Input as DefaultInput,
} from 'react-native-elements';
import Colors, { themeColor }, {themeColor} from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } 
    return Colors[theme][colorName];
  
}

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type CheckBoxProps = ThemeProps & DefaultCheckBox['props'];
export type InputProps = ThemeProps & typeof DefaultInput;

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]} {...otherProps} />;
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return <DefaultView style={[{ backgroundColor }, style]} {...otherProps} />;
}

export function Card(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'card'
  );

  return (
    <DefaultCard
      containerStyle={[
        { backgroundColor },
        { borderWidth: 0, width: '95%', borderRadius: 10, alignSelf: 'center' },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function Separator(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'separator'
  );

  return (
    <View
      style={[
        { backgroundColor },
        {
          height: 1,
          width: '80%',
        },
        style,
      ]}
      {...otherProps}
    />
  );
}

export function CheckBox(props: any) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );

  return (
    <DefaultCheckBox
      containerStyle={[
        { backgroundColor: 'transparent' },
        { borderWidth: 0, width: '95%', marginLeft: 30, padding: 0 },
        style,
      ]}
      textStyle={{ color: textColor }}
      checkedColor={themeColor}
      {...otherProps}
    />
  );
}

// TODO: figure out typescript and change "any"
export const Input = (props: any) => {
  const {
    inputStyle,
    inputContainerStyle,
    lightColor,
    darkColor,
    ...otherProps
  } = props;
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );

  return (
    <DefaultInput
      inputContainerStyle={[inputContainerStyle]}
      inputStyle={{ color: textColor, ...inputStyle }}
      {...otherProps}
    />
  );
};

export const Calendar = (props: any) => {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const calendarBackground = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  let textColor = useThemeColor({ light: lightColor, dark: darkColor }, 'text');
  let textDisabledColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'strongMutedText'
  );
  return (
    <DefaultCalendar
      style={style}
      theme={{
        calendarBackground,
        arrowColor: themeColor,
        textSectionTitleColor: textColor,
        monthTextColor: textColor,
        dayTextColor: textColor,
        textDisabledColor,
      }}
      {...otherProps}
    />
  );
};
