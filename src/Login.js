import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import './log.css'
export default function Login({setToken}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [message, setMessage] = useState("");

  const postLoginData = () => {

    const loginData = {
      username: username,
      password: password
    }
    fetch(`https://movieserverreview.herokuapp.com/usersdata/login`, {
      method: "POST",
      body: JSON.stringify(loginData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((response) => response.json())
      .then(tok => {
        if (tok.message === "successful login") {
          localStorage.setItem("x-auth-token", tok.token)
          setToken(tok.token)
          history.push("/movies")
        }
        else {
          setMessage(tok.message);
        }
      })

  }
  return (
    <div className="logincontainer">
    <div className="settings-container">
      <h3 className="settings-header">Login</h3>
      <h3>{message ? message : ""}</h3>
      <div className="form-container">
      <div className="form-group">
            <label htmlFor="username">Username : </label>
            <input name="username" className="form-control" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="username"></input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password : </label>
            <input name="password" className="form-control" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="password"></input>
          </div>
          <div className="form-group-forgot">
            <p className="forgot">Forgot Password?</p>
          </div>
          <button type="submit" className="signup" onClick={() => postLoginData()}>LOG IN</button>
        </div>
        </div>
    </div>
  )
}
