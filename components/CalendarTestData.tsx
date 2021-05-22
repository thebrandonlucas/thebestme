import { happyGreen, neutralYellow, sadRed } from '../constants/Colors';

export default {
  '2021-05-15': { marked: true, dotColor: sadRed },
  '2021-05-16': { marked: true, dotColor: sadRed },
  '2021-05-21': { startingDay: true, color: happyGreen },
  '2021-05-22': { color: happyGreen },
  '2021-05-23': { color: happyGreen, marked: true, dotColor: sadRed },
  '2021-05-24': { color: happyGreen },
  '2021-05-25': { endingDay: true, color: happyGreen },
  '2021-05-26': {
    selected: true,
    color: sadRed,
    startingDay: true,
    endingDay: true,
  },
  '2021-05-27': {
    selected: true,
    color: neutralYellow,
    startingDay: true,
    endingDay: true,
  },
};
