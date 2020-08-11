import React, { FormEvent, useState } from 'react';

import api from '../../services/api';

import PageHeader from '../../components/PageHeader';
import TeacherItem from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';
import { Teacher } from '../../components/TeacherItem/index';

import './styles.css';

function TeacherList() {

  const [teachers, setTeachers] = useState([])

  const [subject, setSubject] = useState('')
  const [week_day, setWeekDay] = useState('')
  const [time, setTime] = useState('')

  async function searchTeachers(e: FormEvent) {
    e.preventDefault()
    const response = await api.get('classes', {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data)
  }

  return (
    <div id="page-teachers-list" className="container">
      <PageHeader tittle="Esses são os proffys disponiveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select
            name="subject"
            label="Matéria"
            value={subject}
            onChange={e => { setSubject(e.target.value) }}
            options={[
              { value: 'Artes', label: 'Artes' },
              { value: 'Biologia', label: 'Biologia' },
              { value: 'Ciências', label: 'Ciências' },
              { value: 'Educação Física', label: 'Educação Fisica' },
              { value: 'Matemática', label: 'Matemática' },
              { value: 'Português', label: 'Português' },
            ]}
          />
          <Select
            name="week_day"
            label="Dia da semana"
            value={week_day}
            onChange={e => { setWeekDay(e.target.value) }}
            options={[
              { value: '1', label: 'Domingo' },
              { value: '2', label: 'Segunda-feira' },
              { value: '3', label: 'Terça-feira' },
              { value: '4', label: 'Quarta-feira' },
              { value: '5', label: 'Quinta-feira' },
              { value: '6', label: 'Sexta-feira' },
              { value: '7', label: 'Sábado' },
            ]}
          />
          <Input
            name="time"
            label="Hora"
            type="time"
            value={time}
            onChange={e => { setTime(e.target.value) }}
          />

          <button type="submit">Buscar</button>
        </form>
      </PageHeader>

      <main>
        {teachers.map((teacher: Teacher) => {
          return (
            <TeacherItem key={teacher.id} teacher={teacher} />
          )
        })}

      </main>
    </div>
  );
}

export default TeacherList;
