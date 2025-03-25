import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCHa82aOxu1sVpMpisvoD5d5XjM1zhidgo",
    authDomain: "school-website-c91a4.firebaseapp.com",
    projectId: "school-website-c91a4",
    storageBucket: "school-website-c91a4.appspot.com",
    messagingSenderId: "664431602902",
    appId: "1:664431602902:web:6b3663a7b91e311af42d77",
    measurementId: "G-F0BDCVLKHW"
  };


class Firebase {


    constructor() {

        app.initializeApp(firebaseConfig);
        this.auth = app.auth();
        this.db = app.firestore();
    }

    //inscription

    signupUser = (email, password) => 

        this.auth.createUserWithEmailAndPassword(email, password)


    //Connexion

    loginUser = (email, password) =>

        this.auth.signInWithEmailAndPassword(email, password)


    //D�connexion

    signoutUser = () =>

        this.auth.signOut()


        //R�cuperer le mot de passe  
    passwordReset = email => 

        this.auth.sendPasswordResetEmail(email)

    // base dedonn�es
    user = uid =>  this.db.doc(`user/${uid}`);

}

export default Firebase;