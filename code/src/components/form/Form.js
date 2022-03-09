import React, {useEffect, useState, useContext} from 'react';

import ErrorMessage from '../errorMessage/ErrorMessage';
import { FormContext } from '../../FormContext';
import "./Form.style.css";

const Form = () => {
    const [formData, setFormData] = useState({name: "", age: "", email: "", phoneNumber: ""});
    const {name, age, email, phoneNumber} = formData;
    const [inputBlur, setInputBlur] = useState({});
    const [disableSubmit, setDisableSubmit] = useState(true);
    const [disableReset, setDisableReset] = useState(true);
    const {formFiledData, setFormFieldData} = useContext(FormContext);

    useEffect(() => {
        if (formData?.name && formData?.age && validateEmail(formData?.email) && formData.phoneNumber.length === 10) {
            setInputBlur({});
            setDisableSubmit(false);
        } else {
            setDisableSubmit(true);
        }
    }, [formData]);

    useEffect(() => {
        if (formData?.name || formData?.age || validateEmail(formData?.email) || formData.phoneNumber) {
            setDisableReset(false);
        } else {
            setDisableReset(true);
        }
    }, [formData]);

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormData({ ...formData, [name]: value });
        if (name === "email") {
            !validateEmail(value) ? setInputBlur({...inputBlur, email: true}) : setInputBlur({...inputBlur, email: false})
        } else {
            setInputBlur({...inputBlur, [name]: false});
        }
    }

    const handleInputBlur = (event, fieldName) => {
        if(event.target.value === "") {
            setInputBlur({...inputBlur, [fieldName]: true})
        } else {
            setInputBlur({...inputBlur, [fieldName]: false})
        }
    }

    const validateEmail = (email) => {
        const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return regex.test(String(email).toLowerCase());
    }

    const handleEmail = (event) => {
        if (event.target.value === "") {
            setInputBlur({...inputBlur, email: true})
        } else if (!validateEmail(event.target.value)) {
            setInputBlur({...inputBlur, email: true})
        } else {
            setInputBlur({...inputBlur, email: false})
        }
    }

    const handlePhoneNumber = (event) => {
        if (event.target.value.length < 10) {
            setInputBlur({...inputBlur, phoneNumber: true})
        } else {
            setInputBlur({...inputBlur, phoneNumber: false})
        }
    }

    const formReset = () => {
        setFormData({name: "", age: "", email: "", phoneNumber: ""});
        setInputBlur({});
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormFieldData([...formFiledData, formData]);
        setFormData({name: "", age: "", email: "", phoneNumber: ""});
        setInputBlur({});
    }

  return (
    <div className='form-section'>
        <div className='form-section-header-container'>
            <header className='form-section-header'>User Form</header>
        </div>
        <div className='form-section-container'>
            <div className='input-section'>
                <div className='form-input-fieldName'>Name <span style={{color: "red"}}>*</span></div>
                <input type="text" placeholder="Please Enter Name" value={name} name="name" onChange={handleChange} onBlur={e => handleInputBlur(e, "name")} style={inputBlur?.name ? {border: "1px solid red"} : {}} />
                {inputBlur?.name && <ErrorMessage message="enter name" /> }
            </div>
            <div className='input-section'>
                <div className='form-input-fieldName'>Age <span style={{color: "red"}}>*</span></div>
                <input type="number" placeholder="Please Enter Age" min={0} value={age} name="age" onChange={handleChange} onBlur={e => handleInputBlur(e, "age")} style={inputBlur?.age ? {border: "1px solid red"} : {}} />
                {inputBlur?.age && <ErrorMessage message="enter age" /> }
            </div>
            <div className='input-section'>
                <div className='form-input-fieldName'>Email <span style={{color: "red"}}>*</span></div>
                <input type="email" placeholder="Please Enter Email" value={email} name="email" onChange={handleChange} onBlur={handleEmail} style={inputBlur?.email ? {border: "1px solid red"} : {}} />
                {inputBlur?.email && <ErrorMessage message="enter valid email" /> }
            </div>
            <div className='input-section'>
                <div className='form-input-fieldName'>Phone Number <span style={{color: "red"}}>*</span></div>
                <input type="number" placeholder="Please Enter Phone Number" minLength={10} maxLength={10} value={phoneNumber} name="phoneNumber" onChange={handleChange} onBlur={handlePhoneNumber} style={inputBlur?.phoneNumber ? {border: "1px solid red"} : {}} />
                {inputBlur?.phoneNumber && <ErrorMessage message="enter valid phone number" /> }
            </div>
            <div className='button-section'>
                <button className="btn" onClick={formReset} disabled={disableReset} style={disableReset ? {cursor: "not-allowed"} : {}}>Reset</button>
                <button className='btn btn-submit' disabled={disableSubmit} style={disableSubmit ? {cursor: "not-allowed"} : {}} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Form;
