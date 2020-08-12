import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';

import DateTimePickerModal from "react-native-modal-datetime-picker";

import styles from './styles'

interface DateTimePickerProps {
    label: string,
    pattern: RegExp,
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({ label, pattern, value, setValue }) => {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (dateTime: string) => {
        const formatedTime = pattern.exec(dateTime)?.join(':')

        setValue(formatedTime || '')
        hideDatePicker();
    };

    return (
        <View style={styles.inputBlock}>
            <View >
                <Text style={styles.label}>Horário</Text>
                <RectButton
                    style={styles.input}
                    onPress={showDatePicker}
                >
                    <Text>{value}</Text>
                </RectButton>
            </View>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                is24Hour
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />

        </View>
    );
}

export default DateTimePicker