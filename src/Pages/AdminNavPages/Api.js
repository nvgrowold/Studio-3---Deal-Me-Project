import { db } from '../firebase';

// Initialize Firestore from db object
const firestore = db.firestore();

// Function to fetch sales data from Firebase Firestore
const getSalesData = async () => {
  try {
    const snapshot = await firestore.collection('orderitems').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching sales data:', error);
    return [];
  }
};

// Function to fetch customer data from Firebase Firestore
const getUserData = async () => {
  try {
    const snapshot = await firestore.collection('users').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching customer data:', error);
    return [];
  }
};

// Function to fetch inventory data from Firebase Firestore
const getInventoryData = async () => {
  try {
    const snapshot = await firestore.collection('listings').get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error('Error fetching inventory data:', error);
    return [];
  }
};

export { getSalesData, getUserData, getInventoryData };
