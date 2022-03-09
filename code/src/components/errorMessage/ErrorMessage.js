import React from 'react'
import "./ErrorMessage.style.css";

const ErrorMessage = ({message}) => {
  return (
    <p className='error-message'>{`Please ${message}`}</p>
  )
}

export default ErrorMessage;
