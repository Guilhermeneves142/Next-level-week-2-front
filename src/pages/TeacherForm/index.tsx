import React, { useState, FormEvent } from "react";
import PageHeader from "../../components/PageHeader";
import { useHistory } from "react-router-dom";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import warningIcon from "../../assets/images/icons/warning.svg";

import "./styles.css"
import api from "../../services/api";

function TeacherForm() {
  const history = useHistory();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [bio, setBio] = useState("");
  const [subject, setSubject] = useState("");
  const [cost, setCost] = useState("");
  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: "", to: ""}
  ]);

  function addNewScheduleItem() {
    setScheduleItems([
      ...scheduleItems,
      { week_day: 0, from: "", to: ""}
    ]);
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault();
    api.post("classes", {
      name,
      avatar,
      whatsapp,
      bio,
      subject,
      cost: Number(cost),
      schedule: scheduleItems
    }).then(
      () => {
        alert("Cadastro realizado com sucesso!");
        history.push("/")
      }
    ).catch(
      () => {
        alert("Erro no cadastro!");
      }
    )
  }

  function setScheduleItemValue(position: number, field: string, value: string){
    const updatedScheduleItem = scheduleItems.map((scheduleItem, index) => {
      if(index === position) {
        return { ...scheduleItem, [field]: value };
      }

      return scheduleItem;
    });
    
    setScheduleItems(updatedScheduleItem);
  }

  
  return(
    <div id="page-teacher-form" className="container">
      <PageHeader 
        description="O primeiro passo, é preencher esse formulário de inscrição"
        title="Que incrivel que você quer dar aulas"/>
      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            <legend>
              Seus dados
            </legend>
            <Input name="name" label="Nome completo" value={name} onChange={(e) => setName(e.target.value)}/>
            <Input name="avatar" label="Avatar" value={avatar} onChange={(e) => setAvatar(e.target.value)}/>
            <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)}/>
            <Textarea name="bio" label="Biografia" value={bio} onChange={(e) => setBio(e.target.value)}/>
          </fieldset>
          <fieldset>
            <legend>
              Sobre a aula
            </legend>
            <Select name="subject"
            label="Matéria"
            value={subject}
            onChange={(e) => {setSubject(e.target.value)}}
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
            <Input 
              name="cost"
              label="Custo da sua hora por aula" 
              value={cost}
              onChange={(e) => {setCost(e.target.value)}}/>
          </fieldset>
          <fieldset>
            <legend>
              Horários disponiveis
              <button type="button" onClick={addNewScheduleItem}>
                + novo Horário
              </button>
            </legend>
            {
              scheduleItems.map((scheduleItem, index) => {
                return (
                  <div className="schedule-item" key={scheduleItem.week_day}>
                  <Select name="week_day"
                  label="Dia da semana"
                  value={scheduleItem.week_day}
                  onChange={e => setScheduleItemValue(index, "week_day", e.target.value)}
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
                    name="from"
                    label="Das"
                    value={scheduleItem.from}
                    onChange={e => setScheduleItemValue(index, "from", e.target.value)}
                    type="time"/>
                  <Input 
                    name="from"
                    label="Até"
                    value={scheduleItem.to}
                    onChange={e => setScheduleItemValue(index, "to", e.target.value)}
                    type="time"
                    />
                </div>
                )
              })
            }
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante"/>
              Importante! <br/>
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherForm;