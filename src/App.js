import React from 'react';
import ImageUpload from './Components/Imageupload';
import Registration from './Components/Registration';

// import { onChildAdded, push, ref, set } from 'firebase/database';
// import { database } from './Db/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import logo from './logo.png';
import { auth } from './Db/firebase';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    // Initialise empty messages array in state to keep local state in sync with Firebase
    // When Firebase changes, update local state, which will update local UI
    this.state = {
      // messages: [],
      // messageInput: '',
      // fileInputFile: null,
      // fileInputValue: '',

      showRegistration: true,
      user: '',
    };
  }

  // componentDidMount() {
  //   const messagesRef = ref(database, MESSAGE_FOLDER_NAME);
  //   // onChildAdded will return data for every child at the reference and every subsequent new child
  //   onChildAdded(messagesRef, (data) => {
  //     // Add the subsequent child to local component state, initialising a new array to trigger re-render
  //     this.setState((state) => ({
  //       // Store message key so we can use it as a key in our list items when rendering messages
  //       messages: [
  //         ...state.messages,
  //         {
  //           key: data.key,
  //           val: data.val(),
  //           timeStamp: new Date().toLocaleString(),
  //           imageURL: '',
  //         },
  //       ],
  //     }));
  //   });
  // }

  // Note use of array fields syntax to avoid having to manually bind this method to the class
  // handleSubmit = (event) => {
  //   event.preventDefault();
  //   const messageListRef = ref(database, MESSAGE_FOLDER_NAME);
  //   const newMessageRef = push(messageListRef);
  //   set(newMessageRef, this.state.messageInput);
  //   // Reset input field after submit

  //   console.log(`new message ref: ${newMessageRef}`);

  //   console.log(`time stamp: ${this.state.messages[0].timeStamp}`);
  //   this.setState({
  //     messageInput: '',
  //   });
  // };

  login = (e, email, password) => {
    e.preventDefault();
    console.log(email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log('login success!');
        this.setState({ showRegistration: false, user: userCredential.user });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  signup = (e, email, password) => {
    e.preventDefault();
    console.log(email, password);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        console.log('SignUP success!');
      })

      .catch((error) => {
        console.log(error);
      });
  };

  signout = (e) => {
    signOut(auth)
      .then(() => {
        alert('you have signed out!');
        this.setState({ showRegistration: true });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    // Convert messages in state to message JSX elements to render
    // let messageListItems = this.state.messages.map((message) => (
    //   <li key={message.key}>
    //     {message.val} <h6> {message.timeStamp}</h6>
    //   </li>
    // ));
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <br />
          <div>
            {this.state.showRegistration ? (
              <Registration
                handleSignup={this.signup}
                handleLogin={this.login}
              />
            ) : (
              <ImageUpload
                user={this.state.user}
                handleSignout={this.signout}
              />
            )}
          </div>
        </header>
      </div>
    );
  }
}

export default App;
