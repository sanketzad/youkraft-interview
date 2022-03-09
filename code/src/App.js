import { useState } from "react";

import DisplayForm from './components/displayForm/DisplayForm';
import Form from './components/form/Form';
import './App.css';
import {FormContext} from "./FormContext";

function App() {
  const [formFiledData, setFormFieldData] = useState([]);

  return (
    <div className="App">
      <header className='header'>
        <span>youkraft</span>
      </header>
      <section className='main-content'>
        <FormContext.Provider value={{formFiledData, setFormFieldData}}>
          <Form />
          <DisplayForm />
        </FormContext.Provider>
      </section>
    </div>
  );
}

export default App;
