// TODO: implement end of day notes screen for the multiple journals they will have in the future

// import * as React from 'react';
// import { useEffect } from 'react';
// import { StyleSheet } from 'react-native';
// import { useSelector } from 'react-redux';
// import ThemeButton from '../components/ThemeButton';
// import { Text, View } from '../components/Themed';
// import { RootState } from '../redux/store';
// import { v4 as uuidv4 } from 'uuid';

// function EndOfDayNotesScreen({ navigation, route }) {

//   const endOfDayNotes = useSelector<RootState, string[]>(
//     (state) => state.dayReducer.days[route.params.selectedDay].endOfDayNotes
//   );

//   function goBack() {
//     navigation.goBack();
//   }

//   return (
//     <View>
//       <Text>{route.params.selectedDay}</Text>
//       {endOfDayNotes.map((text) => {
//         return <Text key={uuidv4()}>{text}</Text>;
//       })}
//       <ThemeButton title="Go Back" onPress={goBack} />
//     </View>
//   );
// }

// export default EndOfDayNotesScreen;

// const styles = StyleSheet.create({});
