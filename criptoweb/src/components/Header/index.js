import React, { Component } from 'react';
import api from '../../services/api'

import {Link} from 'react-router-dom'

import './styles.css';
import '../../fonts.css';
import '../../animations.css';

import HomeIcon from '@material-ui/icons/Home';

export default class Header extends Component{

    //Variaveis de estado
    //necessario para conseguir utilizar as variaveis no metodo render em tempo real conforme elas sofrerem alteracoes devido ao codigo ou backend
    state={
        criptoInfo:{},
    };

    //Primeiro componente a ser executado dentro desse componente
    componentDidMount(){ //componente do react

    }

    render(){

        return (
          <div className="CriptoWeb-Header">
            <h1>Cripto_Web</h1>

            <a href="/">
              <button id="homeButton"><HomeIcon/></button>
            </a>
          </div>
        );
    }
}