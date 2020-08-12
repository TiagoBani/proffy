import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import DateTimePicker from '../../components/DateTimePicker'

import styles from './styles';
import Select from '../../components/Select';

const TeacherList: React.FC = () => {

    const [time, setTime] = useState('')
    const [subject, setSubject] = useState('')
    const [wee_day, setWeekDay] = useState('')

    return (
        <View style={styles.container}>
            <PageHeader tittle="Proffys disponíveis.">
                <View style={styles.searchForm}>

                    <Select label='Matéria' setValue={setSubject} items={[
                        { option: 'Artes', value: 'Artes' },
                        { option: 'Biologia', value: 'Biologia' },
                        { option: 'Matematica', value: 'Matematica' },
                        { option: 'Portuges', value: 'Portuges' },
                        { option: 'Quimica', value: 'Quimica' },
                        { option: 'Fisica', value: 'Fisica' }
                    ]} />

                    <View style={styles.inputGroup}>
                        <View style={styles.inputBlock}>
                            <Select label='Dia da semana' setValue={setWeekDay} items={[
                                { option: 'Domingo', value: '1' },
                                { option: 'Segunda', value: '2' },
                                { option: 'Terça', value: '3' },
                                { option: 'Quarta', value: '4' },
                                { option: 'Quinta', value: '5' },
                                { option: 'Sexta', value: '6' },
                                { option: 'Sabado', value: '7' },
                            ]} />
                        </View>

                        <DateTimePicker
                            label="Horário"
                            pattern={new RegExp(/\d{2}\:\d{2}/gm)}
                            value={time}
                            setValue={setTime}
                        />
                    </View>
                </View>
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                <TeacherItem />
                <TeacherItem />
                <TeacherItem />
            </ScrollView>
        </View>
    )
}

export default TeacherList