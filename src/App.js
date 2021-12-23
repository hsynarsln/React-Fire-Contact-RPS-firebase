import { useState } from 'react';
import './App.css';
import Contacts from './components/contacts/Contacts';
import FormComponent from './components/form/FormComponent';

const initialValues = { username: '', phoneNumber: '', gender: 'NO INFO' };

function App() {
  const [info, setInfo] = useState(initialValues);

  return (
    <div className='App'>
      <FormComponent info={info} serInfo={setInfo} />
      <Contacts />
    </div>
  );
}

export default App;
