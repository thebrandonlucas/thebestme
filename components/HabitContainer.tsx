import * as React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { CheckBox } from './Themed';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors } from '../constants';

export default function HabitContainer(props): JSX.Element {
    // console.log(props)
    return (
        <View style={styles.habitContainer}>
            <CheckBox
                style={styles.checkbox}
                checked={props.habit.checked}
                checkedTitle={props.habit.text}
                title={props.habit.text}
                onPress={() => props.toggleHabit(props.habit.id, props.habit.checked)}
                onLongPress={() => props.clickEdit(props.habit.id, props.habit.text)}
            />
            {!props.isEditingHabit && !props.isAddingHabit &&
                <TouchableOpacity onPress={() => props.clickEdit(props.habit.id, props.habit.text)} style={styles.editIcon}>
                    <FontAwesome5 name="edit" size={24} color={Colors.iosBlue} />
                </TouchableOpacity>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    habitContainer: {
        flexDirection: 'row',
        // FIXME: the backgroundColor property is required to keep background from being black. Why?
        backgroundColor: 'transparent'
    },
    checkbox: {
        flex: 1
    },
    editIcon: {
        alignSelf: 'center'
    }
});