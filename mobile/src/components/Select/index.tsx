import React from 'react';
import { Picker, Text, View } from 'react-native';

import styles from './styles'

interface SelectProps {
    label: string,
    value: string,
    items: { option: string, value: string }[],
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Select: React.FC<SelectProps> = ({ label, value, setValue, items }) => {
    return (<>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.input}>
            <Picker
                selectedValue={value}
                onValueChange={setValue}
                style={styles.select}
            >
                {items?.map(({ option, value }) => {
                    return (
                        <Picker.Item key={value} label={option} value={value} />
                    )
                })}
            </Picker>
        </View>
    </>
    );
}

export default Select