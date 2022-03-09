import React, {useContext} from 'react';

import { FormContext } from '../../FormContext';
import "./dislpayForm.style.css";

const DisplayForm = () => {
  const {formFiledData} = useContext(FormContext); 
  // const data = [
  //   {name: "Sanket Zad", age: 28, email: "sanket@gmail.com", phoneNumber: 1234567890},
  //   {name: "Sanket Zad", age: 28, email: "sanket@gmail.com", phoneNumber: 1234567890}
  // ]
  return (
    <div className='display-form'>
      <div className='display-form-section'>
        <div className='dispaly-form-header-section'>
          <header className='display-form-header'>
            <span>{`Total Forms Submitted: ${formFiledData.length}`}</span>
          </header>
        </div>
        <div>
          {formFiledData.map(item => {
            return (
              <div key={item.phoneNumber}>
                <h5>Name: <span className='display-form-value'>{item.name}</span></h5>
                <h5>Age: <span className='display-form-value'>{item.age}</span></h5>
                <h5>Email: <span className='display-form-value'>{item.email}</span></h5>
                <h5>Phone Number: <span className='display-form-value'>{item.phoneNumber}</span></h5>
                <hr />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default DisplayForm;