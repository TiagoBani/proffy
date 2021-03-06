import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { BorderlessButton, RectButton, ScrollView } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import DateTimePicker from '../../components/DateTimePicker'
import Select from '../../components/Select';

import api from '../../services/api';
import { Teacher } from '../../components/TeacherItem/index';

import styles from './styles';

const TeacherList: React.FC = () => {

    const [teachers, setTeachers] = useState([])

    const [favorites, setFavorites] = useState<number[]>([])

    const [isFiltersVisible, setIsFiltersVisible] = useState(false)

    const [time, setTime] = useState('00:00')
    const [subject, setSubject] = useState('')
    const [week_day, setWeekDay] = useState('1')


    function loadFavorites() {
        AsyncStorage.getItem('favorites').then(response => {
            if (response) {
                const favoritedTeachers = JSON.parse(response)
                const favoritedTeachersIds = favoritedTeachers.map((favoritedTeacher: Teacher) => favoritedTeacher.id)
                setFavorites(favoritedTeachersIds)
            }
        })
    }

    function handleIsFilterVisible() {
        setIsFiltersVisible(!isFiltersVisible)
    }

    async function handleFiltersSubmit() {
        loadFavorites()

        const result = await api.get('classes', {
            params: {
                subject,
                time,
                week_day
            }
        })
        setTeachers(result.data)
        handleIsFilterVisible()
    }

    return (
        <View style={styles.container}>
            <PageHeader tittle="Proffys disponíveis." headerRight={(
                <BorderlessButton onPress={handleIsFilterVisible}>
                    <Feather name="filter" size={20} color="#FFF" />
                </BorderlessButton>
            )}>
                {isFiltersVisible && (
                    <View style={styles.searchForm}>

                        <Select value={subject} label='Matéria' setValue={setSubject} items={[
                            { option: 'Artes', value: 'Artes' },
                            { option: 'Biologia', value: 'Biologia' },
                            { option: 'Matematica', value: 'Matematica' },
                            { option: 'Portuges', value: 'Portuges' },
                            { option: 'Quimica', value: 'Quimica' },
                            { option: 'Fisica', value: 'Fisica' }
                        ]} />

                        <View style={styles.inputGroup}>
                            <View style={styles.inputBlock}>
                                <Select
                                    value={week_day}
                                    label='Dia da semana'
                                    setValue={setWeekDay}
                                    items={[
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

                        <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                            <Text style={styles.submitButtonText}>Filtrar</Text>
                        </RectButton>
                    </View>
                )}
            </PageHeader>

            <ScrollView
                style={styles.teacherList}
                contentContainerStyle={{
                    paddingHorizontal: 16,
                    paddingBottom: 16,
                }}
            >
                {teachers.map((teacher: Teacher) => {
                    return (
                        <TeacherItem
                            key={teacher.id}
                            teacher={teacher}
                            favorited={favorites.includes(teacher.id)}
                        />
                    )
                })}
            </ScrollView>
        </View>
    )
}

export default TeacherList