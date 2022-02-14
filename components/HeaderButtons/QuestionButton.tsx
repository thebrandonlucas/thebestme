import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import useColorScheme from '../../hooks/useColorScheme';
import {
  setDescription,
  setDescriptionIsDisplaying,
  setJournalDescription,
} from '../../redux/actions/DescriptionActions';
import { RootState } from '../../redux/store';
import { DescriptionType } from '../../types';

export default function QuestionButton({
  screenName,
}: {
  screenName: DescriptionType;
}) {
  const colorScheme = useColorScheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const infoType = useSelector<RootState, DescriptionType>(
    (state) => state.descriptionReducer.infoType
  );
  const journalInfoType = useSelector<RootState, 'journal' | 'cbt'>(
    (state) => state.descriptionReducer.journalInfoType
  );
  // TODO: delete once we're sure we're not going the 'screen'
  function goToInfoScreen() {
    // FIXME: route.params.infoType not being passed to InfoScreen, why?
    // using redux as workaround
    dispatch(setDescription(infoType));
    navigation.navigate('Info', { infoType });
  }

  function showInfoModal() {
    // Journal handles it's own description setting
    if (screenName === 'journal') {
      console.log('journalsss', journalInfoType)
      dispatch(setDescription(journalInfoType));
    } else {
      dispatch(setDescription(screenName));
    }
    dispatch(setDescriptionIsDisplaying(true));
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
