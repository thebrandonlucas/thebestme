import React from 'react'; 
import Colors from '../../constants/Colors'; 
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'; 
import useColorScheme from '../../hooks/useColorScheme'; 
import { Alert } from 'react-native'; 

export default function MyCircleButton() {
    const colorScheme = useColorScheme();
    return (
        <TouchableOpacity onPress={myCircleAlert}>
        <Ionicons 
            name='alert-circle' 
            size={30} 
            style={{ marginLeft: 30 }} 
            color={Colors[colorScheme].themeColor} 
        />
        </TouchableOpacity>
    );
}

function myCircleAlert() {
    Alert.alert(
        "MyCircle",
        "Send Help alert to all your friends?",
        [
            {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            {
                text: "Choose Friends", 
                onPress: () => console.log("Choose Friends Pressed"), 
                style: "cancel", 
            }, 
            { 
                text: "Send to All", 
                onPress: () => console.log("OK Pressed"), 
                style: "cancel"
            }
        ],
        { cancelable: false }
    );
}