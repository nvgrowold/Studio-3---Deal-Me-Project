import { db } from "../firebase";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const collectionName = "products";
const todoCollectionRef = collection(db, collectionName);
class TodoDataService {
  addTodo = (newTodo) => {
    return addDoc(todoCollectionRef, newTodo);
  };

  updateTodo = (id, updateTodo) => {
    const todoDoc = doc(db, collectionName, id);
    return updateDoc(todoDoc, updateTodo);
  };

  deleteTodo= (id) => {
    const todoDoc = doc(db, collectionName, id);
    return deleteDoc(todoDoc);
  };

  getAllTodo = () => {
    return getDocs(todoCollectionRef);
  };

  getTodo = (id) => {
    const todoDoc = doc(db, collectionName, id);
    return getDoc(todoDoc);
  };
}

export default new TodoDataService();
