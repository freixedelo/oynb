import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import logo from "./assets/logo.png";
import "./App.css";

function Home() {
  const [name, setName] = useState("");

  function handleSubmit(event: any): any {
    console.log(event);
    setName("asd");
    alert("A name was submitted: " + name);
    event.preventDefault();
  }

  function handleChange(event: any): any {
    setName(event.target.value);
  }
  const history = useHistory();

  function handleClick() {
    history.push("/questions", { name });
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <h2>Welcome to OYNB</h2>
        </div>
      </header>
      <div>
        <article>
          <div>What is your Name?</div>
          <label>
            Name:
            <input type="text" value={name} onChange={handleChange} />
          </label>
          <button type="button" onClick={handleClick}>
            NEXT
          </button>
        </article>
      </div>
    </div>
  );
}

export default Home;
