// TITLE : WEATHER FORECAST
// DATE : 21-09-2024
// SUBJECT : FSD-2


import React from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        
      </div>
    </React.Fragment>
  );
}

export default App;
