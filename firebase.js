// Import the functions you need from the SDKs you need
import firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAE_5T6FwHihFgfbLY3NuIy-EBaT_tmTG8",
    authDomain: "sk-book-rent.firebaseapp.com",
    projectId: "sk-book-rent",
    storageBucket: "sk-book-rent.appspot.com",
    messagingSenderId: "287650254601",
    appId: "1:287650254601:web:a2e2ff25ce70f8920b4dd8"
};

// Initialize Firebase
let app;
if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app()
}

const auth = firebase.auth()

export { auth };