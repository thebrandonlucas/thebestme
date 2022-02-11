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
    dispatch(setDescription(infoType));
    navigation.navigate('Info', { infoType });
  }

  function showInfoModal() {
    console.log('show info modal', infoType)
    dispatch(setDescription(infoType));
  }

  return (
    <TouchableOpacity onPress={showInfoModal}>
      <AntDesign
        name="questioncircle"
        size={25}
        style={{ marginLeft: 30 }}
        color={Colors[colorScheme].tabIconDefault}
      />
    </TouchableOpacity>
  );
}
