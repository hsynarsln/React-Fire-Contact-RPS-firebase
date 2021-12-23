import { initializeApp } from 'firebase/app';
import { getDatabase, onValue, push, query, ref, set } from 'firebase/database';
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

const firebase = initializeApp(firebaseConfig);

export default firebase;

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

export const useFetch = () => {
  const [contactList, setContactList] = useState();

  const [isLoading, setIsLoading] = useState();
  useEffect(() => {
    setIsLoading(true);
    const db = getDatabase();
    const userRef = ref(db, 'contact'); //! realtime database olarak oluşturduğumuz database ismini girdik

    onValue(query(userRef), snapshot => {
      const contacts = snapshot.val(); //! veri bu şekilde alınıyor.

      const contactArray = []; //! boş bir array oluşturuyoruz.
      for (let id in contacts) {
        contactArray.push({ id, ...contacts[id] });
      }
      setContactList(contactArray);
    });
  }, []);
  return { isLoading, contactList }; //! burada gönderiyoruz
};
