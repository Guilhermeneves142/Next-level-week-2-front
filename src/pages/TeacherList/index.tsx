import React, { useState, FormEvent } from "react";
import TeacherItem, { Teacher } from "../../components/TeacherItem";
import Input from "../../components/Input";
import Select from "../../components/Select";
import PageHeader from "../../components/PageHeader";

import "./styles.css"
import api from "../../services/api";

function TeacherList() {

  const [teachers, setTeachers] = useState([]);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  async function searchTeachers(e: FormEvent) {
    e.preventDefault();
    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time
      }
    })

    setTeachers(response.data);
  }

  return(
    <div id="page-teacher-list" className="container">
      <PageHeader title="Estes são os proffys disponiveis.">
        <form id="search-teachers" onSubmit={searchTeachers}>
          <Select name="subject"
          label="Matéria"
          value={subject}
          onChange={e => {setSubject(e.target.value)}}
          options={[
            {value: "Artes", label: "Artes"},
            {value: "Matemática", label: "Matemática"},
            {value: "Português", label: "Português"},
            {value: "Biologia", label: "Biologia"},
            {value: "Química", label: "Química"},
            {value: "Física", label: "Física"},   
            {value: "Historia", label: "História"},
            {value: "Geográfia", label: "Geográfia"},
            {value: "Educação fisica", label: "Educação fisica"},
            {value: "Inglês", label: "Inglês"},
            {value: "Espanhol", label: "Espanhol"},
            {value: "Sociologia", label: "Sociologia"},
            {value: "Filosofia", label: "Filosofia"}
            
          ]}/>
          <Select name="week_day"
          label="Dia da semana"
          value={week_day}
          onChange={e => {setWeekDay(e.target.value)}}
          options={[
            {value: "0", label: "Domingo"},
            {value: "1", label: "Segunda"},
            {value: "2", label: "Terça"},
            {value: "3", label: "Quarta"},
            {value: "4", label: "Quinta"},
            {value: "5", label: "Sexta"},   
            {value: "6", label: "Sabado"}
          ]}/>
          <Input 
            type="time"
            name="time"
            value={time}
            onChange={e => {
              setTime(e.target.value)}}
            label="Hora"/>
          <button type="submit">buscar</button>
        </form>
      </PageHeader>

      <main>
        {
          teachers.map((teacher: Teacher) => {
            return <TeacherItem key={teacher.id} teacher={teacher}/>
          })
        }
      </main>
    </div>
  )
}

export default TeacherList;