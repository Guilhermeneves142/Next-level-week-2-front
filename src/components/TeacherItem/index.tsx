import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import "./styles.css";

function TeacherItem() {
  return (
  <article className="teacher-item">
  <header>
    <img src="https://avatars1.githubusercontent.com/u/54284082?s=460&u=571d9da12bb5894eb1a9d8cfa3f2fe1b7e1dedda&v=4" alt=""/>
    <div>
      <strong>Guilherme Neves Trindade</strong>
      <span>Química</span>
    </div>
  </header>
  <p>
    Entusiasta das melhores tecnologias de matemática avançada.
    <br /> <br />
    Apaixonado por explodir coisas em laboratórios e por mudar a vida das pessoas através de experiências. Mais de 200 mil pessoas foram alvos de suas experiencias.
  </p>
  <footer>
    <p>
      Preço/hora:
      <strong> R$ 100,00</strong>
    </p>
    <button type="button">
      <img src={whatsappIcon} alt="Whatsapp"/>
      Entrar em contato
    </button>
  </footer>
</article>
  )
}

export default TeacherItem;