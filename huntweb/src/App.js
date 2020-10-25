import React, { Component} from 'react';
import Routes from "./routes";

import "./styles.css";

//Conteudos
import Main from './pages/main'
import Header from './components/Header'

const App = ()=>(
    <div className="App">
      <Header/>
      <Routes />
    </div>
);

/*
class App extends Component{
  //Esse objeto render retorna um JSX, que é um componente que possui codigo, logica e estilizacao
  render()
    {
        return (
      <div className="App">
        <h1>Hello</h1>
      </div>

    );
  }
}*/

export default App;
