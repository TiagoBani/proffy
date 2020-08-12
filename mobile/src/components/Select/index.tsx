import React, { useState } from 'react';
import { Picker, Text, View } from 'react-native';

import styles from './styles'

interface SelectProps {
    label: string,
    items: { option: string, value: string }[],
    setValue: React.Dispatch<React.SetStateAction<string>>
}

const Select: React.FC<SelectProps> = ({ label, setValue, items }) => {
    const [selectedValue, setSelectedValue] = useState("java");
    return (<>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.input}>
            <Picker
                selectedValue={selectedValue}
                onValueChange={setSelectedValue}
                style={{ width: 150, height: 150 }}
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