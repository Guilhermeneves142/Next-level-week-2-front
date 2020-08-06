import React, { InputHTMLAttributes } from "react";

import "./styles.css"

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
}
//é possivel usar desestruturação na props, por exemplo: ({label})
const Input: React.FC<InputProps> = ({label, name, ...rest}) => {
  return (
    <div className="input-block">
      <label htmlFor={name}>{label}</label>
      <input  id={name} {...rest}/>
    </div>
  )
}

export default Input;