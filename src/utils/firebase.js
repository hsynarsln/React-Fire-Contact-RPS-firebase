import { initializeApp } from 'firebase/app';
import { child, getDatabase, onValue, push, query, ref, remove, set, update } from 'firebase/database';
import { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyD5-jKAOw9eb5NFvcZWel9-oZFxsBkHyW0',
  authDomain: 'fire-contact-13182.firebaseapp.com',
  databaseURL: 'https://fire-contact-13182-default-rtdb.firebaseio.com',
  projectId: 'fire-contact-13182',
  storageBucket: 'fire-contact-13182.appspot.com',
  messagingSenderId: '369107778133',
  appId: '1:369107778133:web:00349010cd723ebdc372dc'
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
  console.log('veri eklendi');
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
  return { isLoading, contactList }; //! burada table'a gönderiyoruz
};

//!-----------------------------------
//* -----------DELETE DATA ------------
//!-----------------------------------
export const deleteInfo = id => {
  const db = getDatabase();

  remove(ref(db, 'contact/' + id));
};

//!--------------------------------
//*---------UPDATE DATA -----------
//!--------------------------------
export const updateInfo = info => {
  const db = getDatabase();
  const newUserKey = push(child(ref(db), 'contact/')).key; //! yeni bir key üretiyoruz.
  const updates = {};
  updates['contact/' + newUserKey] = info;
  return update(ref(db), updates);
};
