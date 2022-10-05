import { addDoc, collection, getDocs } from '@firebase/firestore';
import db from 'api';

const collectionRef = collection(db, 'addresses');
export const postNewAddress = async (data: any) => {
  const response = await addDoc(collectionRef, data);
  return response;
};

export const getAllAddresses = async () => {
  const data = await getDocs(collectionRef);
  const collections: any = data.docs.map(docs => ({ ...docs.data(), id: docs.id }));
  return collections;
};
