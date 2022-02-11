import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import { setDescription } from '../../redux/actions/DescriptionActions';
import { RootState } from '../../redux/store';
import { DescriptionType } from '../../types';
import { Card, Text } from '../Themed';
import DataTutorial from './DataTutorial';
import DayScreenTutorial from './DayScreenTutorial';
import HabitTutorial from './HabitTutorial';
import HomeTutorial from './HomeTutorial';
import JournalTutorial from './JournalTutorial';

export default function TutorialModal() {
  const infoType = useSelector<RootState, DescriptionType>(
    (state) => state.descriptionReducer.infoType
  );

  const [tutorialType, setTutorialType] = useState(<></>);
  const dispatch = useDispatch();

  const isVisible = infoType === 'closed' ? false : true;

  function closeModal() {
    dispatch(setDescription('closed'));
  }

  const infoTypeDescriptionMap = {
    home: 'Home',
    habits: 'Habits',
    journal: 'Journal',
    data: 'Data',
  };

  useEffect(() => {
    switch (infoType) {
      case 'home':
        setTutorialType(<HomeTutorial />);
        break;
      case 'habits':
        setTutorialType(<HabitTutorial />);
        break;
      case 'journal':
        setTutorialType(<JournalTutorial />);
        break;
      case 'data':
        setTutorialType(<DataTutorial />);
        break;
      case 'dayscreen':
        setTutorialType(<DayScreenTutorial />);
      default:
        closeModal();
        break;
    }
  }, [infoType]);

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={closeModal}
      onSwipeComplete={closeModal}
      swipeDirection="down"
      avoidKeyboard
      style={styles.modal}
    >
      <Card style={styles.card}>
        <Text
          style={[styles.journalHeaderLabel, { color: Colors.dark.mutedText }]}
        >
          {infoTypeDescriptionMap[infoType]}
        </Text>
        <Text>{tutorialType}</Text>
      </Card>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    height: '20%',
  },
  card: {
    height: '80%',
  },
  journalHeaderLabel: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: 'bold',
    paddingBottom: 5,
  },
});
