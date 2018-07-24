import React, { Component } from 'react';
import './App.css';
import PORTAL_SITE from "../api/portalSite";

class App extends Component {
  render() {
    return <div className="App">{PORTAL_SITE}</div>;
  }
}

export default App;

