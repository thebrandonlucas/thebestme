import * as React from 'react'; 
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors'; 
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'; 
import { useNavigation } from '@react-navigation/native';

export default function QuestionButton() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation(); 

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <AntDesign name="questioncircle" size={15} style={{ marginTop: 50 }} color={Colors[colorScheme].tabIconDefault} />
        </TouchableOpacity>
    )
}
  