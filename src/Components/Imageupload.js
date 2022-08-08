import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from 'firebase/storage';
import React from 'react';
import { onChildAdded, push, ref as databaseRef, set } from 'firebase/database';
import { database, storage } from '../Db/firebase';

export default class ImageUpload extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      fileInputFile: null,
      fileInputValue: '',
      messageInput: '',
      imagesArray: [],
    };
  }

  componentDidMount() {
    const messagesRef = databaseRef(database, 'messages');
    // onChildAdded will return data for every child at the reference and every subsequent new child
    onChildAdded(messagesRef, (data) => {
      // Add the subsequent child to local component state, initialising a new array to trigger re-render
      this.setState((state) => ({
        // Store message key so we can use it as a key in our list items when rendering messages
        imagesArray: [
          ...state.imagesArray,
          {
            key: data.key,
            val: data.val(),
            // timeStamp: new Date().toLocaleString(),
            // imageURL: '',
          },
        ],
      }));
    });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const messageListRef = databaseRef(database, 'messages');
    const newMessageRef = push(messageListRef);

    const storageRefInstance = storageRef(
      storage,
      'images/' + this.state.fileInputFile.name
    );

    uploadBytes(storageRefInstance, this.state.fileInputFile).then(
      (snapshot) => {
        console.log('uploaded image!');

        getDownloadURL(storageRefInstance).then((url) => {
          console.log(url);

          set(newMessageRef, {
            timeStamp: new Date().toLocaleString(),
            message: this.state.messageInput,
            image: url,
            likes: 0,
          });

          this.setState({
            fileInputFile: null,
            fileInputValue: '',
            messageInput: '',
          });
        });
      }
    );
  };

  render() {
    return (
      <div>
        <h4>Welcome {this.props.user.email} </h4>
        <input
          type="text"
          name="message"
          value={this.state.messageInput}
          onChange={(e) => this.setState({ messageInput: e.target.value })}
          placeholder="Post your hot takes!!!"
        />
        {console.log('input:' + this.state.messageInput)}
        <form>
          <input
            type="file"
            name="fileInputFile"
            // Set state's fileInputValue to "" after submit to reset file input
            value={this.state.fileInputValue}
            onChange={(e) => {
              // e.target.files is a FileList object that is an array of File objects
              // e.target.files[0] is a File object that Firebase Storage can upload
              console.log('fileinputvalue: ' + this.state.fileInputValue);
              console.log('fileinputfile: ' + this.state.fileInputFile);
              console.log('e:' + e);
              console.log('e.target.files[0]: ' + e.target.files[0].name);

              this.setState({
                fileInputFile: e.target.files[0],
                fileInputValue: e.target.value,
              });
            }}
          />
          <button onClick={(e) => this.handleSubmit(e)}>Submit</button>
        </form>

        {this.state.imagesArray && this.state.imagesArray.length > 0 ? (
          this.state.imagesArray.map((element) => (
            <div key={element.key}>
              <img
                style={{ height: '40vh' }}
                src={element.val.image}
                alt={element.val.message}
              />
              <h4>{element.val.message} </h4> <h6>{element.val.timeStamp}</h6>
            </div>
          ))
        ) : (
          <>
            <p>=no images to display=</p>
          </>
        )}

        <input
          type="submit"
          value="signout"
          onClick={(e) => this.props.handleSignout(e)}
        />
      </div>
    );
  }
}
