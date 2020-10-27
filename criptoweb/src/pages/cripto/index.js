import React, {  useState, useEffect, useContext } from 'react';
import { useParams } from "react-router-dom";

import api from '../../services/api'

//import {Link} from 'react-router-dom'

import './styles.css';
import '../../fonts.css';
import '../../animations.css';

export default function Cripto(){

    const [criptoInfo,setCriptoInfo]=useState([]);

    const{symbol} = useParams(); //o symbol eh o nome exato do parametro que estou recebendo na URL

    useEffect(()=> {

        const fetchData = async (symbol) =>  {
            const response = await api.get(`/api/v3/ticker/24hr?symbol=${symbol}`); //passando o numero da pagina (atributo estado) como parametro

            setCriptoInfo(response.data);
        }
        
        fetchData(symbol);

    },[setCriptoInfo,symbol]); //passando os parametros aqui ele vai ficar chamando em tempo real a funcao para atualizar os dados

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