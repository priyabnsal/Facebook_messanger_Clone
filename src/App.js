import React, { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core';
import Message from "./Message"
import './App.css';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
// import logo from './mess.png';



function App() {
  const [input ,setInput] = useState('');
  const [messages, setMessages] = useState([ ]);
  const [username, setUsername]= useState("");


  useEffect(() => {
    //runs when app component  loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message:doc.data()})))
    });
  },[])

  useEffect(() => {
    setUsername(prompt('Please enter your name'));
  }, [])

  
  const sendMessage = (event) => {
   //to use enter button without refreshing// because form gets refresh on enter
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    //all the logic to send mess goes
    // setMessages([...messages, {username: username, text: input}]);
    setInput('');
  }
  // https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100
  return (
    <div className="App">
    {/* <img scr="%PUBLIC_URL%/mess.png" className='app_logo' alt="logo" /> */}
    {/* <img scr={process.emv.PUBLIC_URL + "/img/mess.png"} alt="logo" /> */}
      <h2>Messanger by Priya Bansal 😃</h2>
      {/* <h2>Welcome {username}</h2> */}
      <div className="footer">Made with ❤️ Priya Bansal </div>
      
      <form className="app_form">
      <FormControl className="app_formControl">
        <Input className="app_input" placeholder='Enter a message...'  value={input} onChange={event => setInput(event.target.value)} />
        <IconButton className="app_iconButton" disabled={!input} type="submit" onClick={sendMessage} color="primary" variant="contained" >
         <SendIcon />
        </IconButton>
        
        {/* <Button></Button> */}
      </FormControl>
     </form>
     <div className="top">
     <h3>Welcome {username}</h3>
     <div className="chatlog">
    <FlipMove>
      {
        messages.map(({id, message}) => (
          <Message key={id} username={username} message={message} />
        ))
      }
      </FlipMove>
      </div>
      </div>
    </div>
  );
}

export default App;
