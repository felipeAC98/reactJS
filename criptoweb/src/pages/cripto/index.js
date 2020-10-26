import React, { Component } from 'react';
import api from '../../services/api'

//import {Link} from 'react-router-dom'

import './styles.css';
import '../../fonts.css';
import '../../animations.css';

export default class Cripto extends Component{

    //Variaveis de estado
    //necessario para conseguir utilizar as variaveis no metodo render em tempo real conforme elas sofrerem alteracoes devido ao codigo ou backend
    state={
        criptoInfo:{},
    };

    //Primeiro componente a ser executado dentro desse componente
    componentDidMount(){ //componente do react

        this.loadCriptoValues();
    }

    loadCriptoValues = async () =>{

        const{symbol} = this.props.match.params; //o symbol eh o nome exato do parametro que estou recebendo na URL

        const response = await api.get(`/api/v3/ticker/24hr?symbol=${symbol}`); //passando o numero da pagina (atributo estado) como parametro
    
        this.setState({criptoInfo: response.data })
    }

    render(){

        const{criptoInfo}=this.state;

        return (
            <div className="cripto-data">
                <h1 id="symbolName" >{criptoInfo.symbol}</h1>

                <div className="cripto-details">

                    <div className="cripto-detailDefinition">
                        <h2> Price </h2>
                        <h2>{criptoInfo.lastPrice}</h2>
                    </div>
                    
                    <div className="cripto-detailDefinition">
                        <h2> Price Change Percent </h2>
                        <h2>{criptoInfo.priceChangePercent}</h2>
                    </div>

                    <div className="cripto-detailDefinition">
                        <h2> Quote Volume </h2>
                        <h2>{criptoInfo.quoteVolume}</h2>
                    </div>

                </div>
            </div>
        );
    }
}