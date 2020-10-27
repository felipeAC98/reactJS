import React, {  useState, useEffect, useContext } from 'react';
import api from '../../services/api'

import {Link} from 'react-router-dom'

import './styles.css';
import '../../fonts.css';
import '../../animations.css';

export default function Main(){
    //Variaveis de estado
    //necessario para conseguir utilizar as variaveis no metodo render em tempo real conforme elas sofrerem alteracoes devido ao codigo ou backend
    
    const [criptoInfo,setCriptoInfo]=useState([]);
    
    useEffect(async ()=> {

        const response = await api.get(`/api/v3/ticker/24hr`);

        const criptoInfo=response.data

        const totalCriptos=criptoInfo.length

        let usdtCriptos=[]

        for(let i=0;i<totalCriptos;i++){

            if(criptoInfo[i].symbol.indexOf("USDT")>0){
                usdtCriptos.push(criptoInfo[i])
            }
        }

        setCriptoInfo(usdtCriptos);

        const changePercentQuery = document.querySelectorAll('.cripto-info #changePercent')

        //Deixando o percentual vermelho ou verde
        changePercentQuery.forEach(changePercentObj=>{
            
            if(changePercentObj.dataset.changepercent>=0){
                changePercentObj.style.color=`#30B673`;
            }
            else{
                changePercentObj.style.color=`#EF5757`;
            }


        })
    },[setCriptoInfo]);

    return (
        <div className="cripto-list">

            {criptoInfo.map(criptoInfo => ( //se colocar os parenteses nao precisa dar o return //estou pegando cada um dos products dessa lista
                <article key={criptoInfo.symbol}>
                
                    <Link to={`cripto/${criptoInfo.symbol}`}>

                        <button className="cripto-info" >
                            
                            <div id="symbol"> {criptoInfo.symbol} </div>
                        
                            <div id="cripto-price"> ${criptoInfo.lastPrice} </div>
                        
                            <div id="changePercent" data-changepercent={criptoInfo.priceChangePercent} >  {criptoInfo.priceChangePercent}% </div>

                        </button>

                    </Link>

                </article>
                
            ))}     

        </div>
    );


}
