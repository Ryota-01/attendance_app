// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfigProd = {
  apiKey: process.env.REACT_APP_PRODUCTION_FIREBASE_APIKEY,
  authDomain: process.env.REACT_APP_PRODUCTION_FIREBASE_DOMAIN,
  projectId: process.env.REACT_APP_PRODUCTION_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_PRODUCTION_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_PRODUCTION_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_PRODUCTION_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_PRODUCTION_FIREBASE_MEASUREMENT_ID,
};

export default firebaseConfigProd;
