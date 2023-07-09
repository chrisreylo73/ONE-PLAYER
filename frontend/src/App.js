import React, { useEffect, useState } from 'react';
import './App.css';

const CLIENT_ID = 'b96044a084a542c691fe9b0eca9684de';
const REDIRECT_URI = "http://localhost:3000";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

function App() {
  const [token, setToken] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");

    if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1];

      window.localStorage.setItem("token", token);
      setToken(token);
      console.log(token);
    }
  }, []);

  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  }



  return (
    <div className="App">
      <h1>Spotify React</h1>
      {!token ? <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a> : <button onClick={logout}> Logout</button>  }
      </div>
  );
}

export default App;