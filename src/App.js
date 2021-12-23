import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import './App.css';
import Contacts from './components/contacts/Contacts';
import FormComponent from './components/form/FormComponent';
import { addInfo, updateInfo } from './utils/firebase';

const initialValues = { username: '', phoneNumber: '', gender: '' };

function App() {
  const [info, setInfo] = useState(initialValues);

  const handleFormSubmit = () => {
    // console.log(info);
    if (info.id) {
      updateInfo(info);
    }
    addInfo(info);
  };

  const editHandler = (id, username, phoneNumber, gender) => {
    setInfo({ id, username, phoneNumber, gender });
  };

  return (
    <div className='App'>
      <FormComponent info={info} setInfo={setInfo} handleFormSubmit={handleFormSubmit} />
      <Contacts editHandler={editHandler} />
      <ToastContainer />
    </div>
  );
}

export default App;
