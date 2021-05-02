import * as React from 'react'; 
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors'; 
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'; 
import { useNavigation } from '@react-navigation/native';

export default function SettingsButton() {
    const colorScheme = useColorScheme();
    const navigation = useNavigation(); 

    return (
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Ionicons 
                name='settings-sharp' 
                size={27} 
                style={{ marginRight: 30 }} 
                color={Colors[colorScheme].tabIconDefault} 
            />
        </TouchableOpacity>
    )
}
  