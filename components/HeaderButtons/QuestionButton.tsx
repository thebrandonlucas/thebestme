import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import { setDescription } from '../../redux/actions/DescriptionActions';
import { QuestionButtonType } from '../../types';

export default function QuestionButton({ infoType }: QuestionButtonType) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  function goToInfoScreen() {
    // FIXME: route.params.infoType not being passed to InfoScreen, why?
    // using redux as workaround
    console.log('asdf', infoType)
    dispatch(setDescription(infoType));
    navigation.navigate('Info', { infoType });
  }

  return (
    <TouchableOpacity onPress={goToInfoScreen}>
      <AntDesign
        name="questioncircle"
        size={20}
        // style={{ marginTop: 50 }}
        style={{ marginRight: 10, marginTop: 5 }}
        color={Colors[colorScheme].tabIconDefault}
      />
    </TouchableOpacity>
  );
}
