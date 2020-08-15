import React, { useState, useEffect } from "react";
import axios from "axios";

const Login = (props) => {
  const [login, setLogin] = useState({
    username: "",
    password: ""
  });

  const submitHandler = event => {
    event.preventDefault();

    axios.post("http://localhost:5000/api/login", login)
    .then(res => {
      window.localStorage.setItem("token", res.data.payload);
    })
    .catch(err => {
      console.log(err);
    });

    props.history.push("/bubbles");
  };

  const changeHandler = event => {
    setLogin({
      ...login,
      [event.target.name]: event.target.value
    });
  };
  
  return (
    <form onSubmit={submitHandler}>
      <h1>Welcome to the Bubble App!</h1>
      <label htmlFor="username">Username</label>
      <input type="text" name="username" id="username" value={login.username} onChange={changeHandler} />
      <label htmlFor="password">Password</label>
      <input type="password" name="password" id="password" value={login.password} onChange={changeHandler} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
