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
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import { GetComponentProps } from '../types';

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

// * The Component['props'] syntax only works for class components
// * Custom type GetComponentProps works for functional and class components
export type TextProps = ThemeProps & DefaultText['props'];
export type ViewProps = ThemeProps & DefaultView['props'];
export type CheckBoxProps = ThemeProps &
  GetComponentProps<typeof DefaultCheckBox>;
export type InputProps = ThemeProps & GetComponentProps<typeof DefaultInput>;

export function Text(props: TextProps) {
  const { children, style, lightColor, darkColor } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  return <DefaultText style={[{ color }, style]}>{children}</DefaultText>;
}

export function View(props: ViewProps) {
  const { children, style, lightColor, darkColor } = props;
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  return (
    <DefaultView style={[{ backgroundColor }, style]}>{children}</DefaultView>
  );
}

export function Card(props: ViewProps) {
  const { children, style, lightColor, darkColor } = props;
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
    >
      {children}
    </DefaultCard>
  );
}

export function Separator(props: ViewProps) {
  const { children, style, lightColor, darkColor } = props;
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
    >
      {children}
    </View>
  );
}

export function CheckBox(props: CheckBoxProps) {
  const { checked, checkedTitle, title, style, lightColor, darkColor } = props;
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
      checkedColor={Colors.themeColor}
      checked={checked}
      checkedTitle={checkedTitle}
      title={title}
    />
  );
}

export const Input = (props: InputProps) => {
  const {
    label,
    value,
    placeholder,
    pointerEvents,
    multiline,
    style,
    inputStyle,
    inputContainerStyle,
    lightColor,
    darkColor,
    onChangeText,
  } = props;
  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );

  return (
    <DefaultInput
      label={label}
      value={value}
      placeholder={placeholder}
      pointerEvents={pointerEvents}
      multiline={multiline}
      style={style}
      inputStyle={{ color: textColor, ...inputStyle }}
      inputContainerStyle={[inputContainerStyle]}
      onChangeText={onChangeText}
    />
  );
};

export const Calendar = (props: any) => {
  const { markedDates, markingType, style, lightColor, darkColor } = props;
  const calendarBackground = useThemeColor(
    { light: lightColor, dark: darkColor },
    'background'
  );

  const textColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'text'
  );
  const textDisabledColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    'strongMutedText'
  );

  return (
    <DefaultCalendar
      style={style}
      theme={{
        calendarBackground,
        arrowColor: Colors.themeColor,
        textSectionTitleColor: textColor,
        monthTextColor: textColor,
        dayTextColor: textColor,
        textDisabledColor,
      }}
      markedDates={markedDates}
      markingType={markingType}
    />
  );
};
