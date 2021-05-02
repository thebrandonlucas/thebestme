import * as React from 'react'; 
import { themeColor } from '../constants/Colors'; 
import { Button } from 'react-native-elements'; 

export default function ThemeButton(props: any) {
    const { style, ...otherProps } = props;

    return (
        <Button 
            buttonStyle={{
                backgroundColor: themeColor
            }}
            containerStyle={{
                width: '80%', 
                marginVertical: 10,
                borderRadius: 8
            }}
            { ...otherProps }
        />
    );
}
