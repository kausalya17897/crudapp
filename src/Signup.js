import React from 'react'
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './log.css'
export default function Signup() {
    
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,setError]=useState(null);
  const history = useHistory();
  const postUserData = () => {
    if(password.length<8){
setError("password must be greater than 8")
return;
    }
    if(username.trim()){
      setError("username required")
    }
    const postData = {
      username: username,
      password: password
    }
    fetch(`https://movieserverreview.herokuapp.com/usersdata/signup`, {
        method: "POST",
        body: JSON.stringify(postData),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then((response) =>response.json()).then((data) => {
          console.log(data);
          history.push("/login")
        })
        .catch((err) => {
          console.log(err);
        });
          
    }


  return (
    < div className="signupcontainer">
      <div className="settings-container">
      <h3 className="settings-header">Sign Up for Free</h3>
      <div className="form-container"></div>
        <div className="form-group">
          <label htmlFor="username">Username : </label>
          <input name="username" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="username" required></input>
        </div>
        <div className="form-group">
          <label htmlFor="password">Password : </label>
          <input name="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password" pattern=" " required></input>
        </div>
        <button className="signup" onClick={() => postUserData()}>Signup</button>
    </div>
    </div>
    
  )
}
