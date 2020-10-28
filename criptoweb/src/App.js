import React, { Component} from 'react';
import Routes from "./routes";

import Header from './components/Header'

import './styles.css'

function App() {
  return (
    <div className="App">
        <Routes/>
        <Header/>
    </div>
  );
}

export default App;
