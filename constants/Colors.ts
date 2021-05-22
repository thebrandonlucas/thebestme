const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';
export const themeColor = '#039678';
export const happyGreen = '#3eb489';
export const neutralYellow = '#cfb53b';
export const sadRed = '#a32638';

export default {
  light: {
    text: '#000',
    background: '#efefef',
    tint: tintColorLight,
    tabIconDefault: '#ddd',
    tabIconSelected: tintColorLight,
    card: '#fff',
    separator: '#999',
    themeColor,
    mutedText: '#777',
    strongMutedText: '#eee',
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#eee',
    tabIconSelected: tintColorDark,
    card: '#222',
    separator: '#555',
    themeColor,
    mutedText: '#bbb',
    strongMutedText: '#333',
  },
};
