import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, push, query, ref, remove, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';
import { successNote } from './customTostify';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID
};

export const firebase = initializeApp(firebaseConfig);

//!-------------------------------
//* -----------ADD DATA ----------
//!-------------------------------
export const addInfo = info => {
  const db = getDatabase();
  const userRef = ref(db, 'contact'); //! realtime database olarak oluşturduğumuz database ismini girdik
  const newUserRef = push(userRef);
  set(newUserRef, {
    username: info.username,
    phoneNumber: info.phoneNumber,
    gender: info.gender
  });
  successNote('Successfully added!');
  // console.log('veri eklendi');
};

//!------------------------------
//*---------GET DATA ------------
//!-----------------------------
export const useFetch = () => {
  const [contactList, setContactList] = useState();

  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const userRef = ref(db, 'contact'); //! realtime database olarak oluşturduğumuz database ismini girdik

    onValue(query(userRef), snapshot => {
      const contacts = snapshot.val(); //! veri snapshot ile gezip val() ile değerini alıyoruz

      const contactArray = []; //! boş bir array oluşturuyoruz ve verileri bunun içine atıyoruz daha sonra setContactList içerisine atıyoruz.

      for (let id in contacts) {
        contactArray.push({ id, ...contacts[id] }); //! contacts içerisindeki id'leri gez ve contacts[id]'leri array'a push et
      }

      setContactList(contactArray);
      setIsLoading(false);
    });
  }, []);
  // console.log(contactList);
  return { isLoading, contactList }; //! burada table'a gönderiyoruz
};

//!-----------------------------------
//* -----------DELETE DATA ------------
//!-----------------------------------
export const deleteInfo = id => {
  // console.log(id);
  const db = getDatabase();

  remove(ref(db, 'contact/' + id));
  successNote('Successfully deleted!');
};

//!--------------------------------
//*---------UPDATE DATA -----------
//!--------------------------------
export const updateInfo = (id, username, phoneNumber, gender) => {
  const db = getDatabase();

  const infoData = {
    username: username,
    phoneNumber: phoneNumber,
    gender: gender
  };

  const updates = {};
  updates['contact/' + id] = infoData;

  update(ref(db), updates);
  successNote('Updated');
};
