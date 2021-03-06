import { Colors } from "react-native/Libraries/NewAppScreen";
import { ICalendarDataType } from "../../../types";

export const calendarDataSelectedDayOnlyResult: ICalendarDataType = {
  '2021-01-01': {
    selected: true,
    color: Colors.iosBlue,
    startingDay: true,
    endingDay: true,
  },
};

export const calendarDataMultipleDaysWithSelectedDayResult: ICalendarDataType =
  {
    '2021-01-01': {
      selected: true,
      color: Colors.iosBlue,
      startingDay: true,
      endingDay: true,
    },
    '2021-01-02': {
      selected: true,
      color: Colors.happyGreen,
      startingDay: true,
      endingDay: true,
    },
    '2021-01-03': {
      selected: true,
      color: Colors.sadRed,
      startingDay: true,
      endingDay: true,
    },
    '2020-04-30': {
      selected: true,
      color: Colors.neutralYellow,
      startingDay: true,
      endingDay: true,
    },
  };
