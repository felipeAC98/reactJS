import React, {  useState, useEffect, useContext } from 'react';
import api from '../../services/api'

import {Link} from 'react-router-dom'
import { Button } from '@material-ui/core';

import './styles.css';
import '../../fonts.css';
import '../../animations.css';

//Filter buttons
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));

function sortCripto(usdtCriptos,criptoOrder){

    if(criptoOrder=="price"){
        usdtCriptos=sortCriptoByPrice(usdtCriptos)

    }
    if(criptoOrder=="percentageChange"){
        usdtCriptos=sortCriptoPercentage(usdtCriptos)
    }
    if(criptoOrder=="name"){
        usdtCriptos=sortCriptoByName(usdtCriptos)
    }
};


function sortCriptoByName(usdtCriptos){
    usdtCriptos.sort((a, b) => {
      if (a.symbol > b.symbol) {
        return -1;
      }
      if (a.symbol <= b.symbol) {
        return 1;
      }
    });
};

function sortCriptoByPrice(usdtCriptos){
    usdtCriptos.sort((a, b) => {
      if (a.lastPrice > b.lastPrice) {
        return -1;
      }
      if (a.lastPrice <= b.lastPrice) {
        return 1;
      }
    });
};

function sortCriptoPercentage(usdtCriptos){
    usdtCriptos.sort((a, b) => {
      if (a.priceChangePercent > b.priceChangePercent) {
        return -1;
      }
      if (a.priceChangePercent <= b.priceChangePercent) {
        return 1;
      }
    });

};

export default function Main(){
    //Variaveis de estado
    //necessario para conseguir utilizar as variaveis no metodo render em tempo real conforme elas sofrerem alteracoes devido ao codigo ou backend
    
    const [criptoInfo,setCriptoInfo]=useState([]);
    const [criptoOrder, setCriptoOrder]=useState([""]);
    
    useEffect(async ()=> {

        const response = await api.get(`/api/v3/ticker/24hr`);

        const criptoInfo=response.data

        const totalCriptos=criptoInfo.length

        let usdtCriptos=[]

        for(let i=0;i<totalCriptos;i++){

            if(criptoInfo[i].symbol.indexOf("USDT")>0){

                criptoInfo[i].lastPrice=parseFloat(criptoInfo[i].lastPrice);
                criptoInfo[i].priceChangePercent=parseFloat(criptoInfo[i].priceChangePercent);
                usdtCriptos.push(criptoInfo[i]);
            }

        }


        sortCripto(usdtCriptos,criptoOrder);

        setCriptoInfo(usdtCriptos.slice());

        const changePercentQuery = document.querySelectorAll('.cripto-info #changePercent')

        let counter = 0;
        //Deixando o percentual vermelho ou verde
        changePercentQuery.forEach(changePercentObj=>{
            
            if(changePercentObj.dataset.changepercent>=0){
                changePercentObj.style.color=`#30B673`;
            }
            else{
                changePercentObj.style.color=`#EF5757`;
            }


        })

        const buttonQuery = document.querySelectorAll('.cripto-info ')

        buttonQuery.forEach(button=>{

            button.style.animationDelay =`${counter}s`;

            counter=counter+0.01;

        })

    },[setCriptoInfo,criptoOrder]);

    //Filter button selectors
    const classes = useStyles();

    const handleChange = (event) => {
        setCriptoOrder(event.target.value);
    };

    return (

        <div className="main-container">
            <div className="cripto-filter animate-right">
                Filters
                <FormControl className={classes.formControl}>
                    <InputLabel id="filterSelection">Select your filter</InputLabel>
                        <Select
                        labelId="filterSelection"
                        id="filterSelection"
                        value={criptoOrder}
                        onChange={handleChange}
                        >
                            <MenuItem value={"none"}>None</MenuItem>
                            <MenuItem value={"price"}>Price</MenuItem>
                            <MenuItem value={"percentageChange"}>Percentage change</MenuItem>
                            <MenuItem value={"name"}>Name</MenuItem>
                            
                        </Select>
                   
                </FormControl>

            </div> 
            <div className="cripto-list">
            
                {criptoInfo.map(criptoInfo => ( //se colocar os parenteses nao precisa dar o return //estou pegando cada um dos products dessa lista
                    <article key={criptoInfo.symbol}>
                    
                        <Link to={`cripto/${criptoInfo.symbol}`} className="cripto-info animate-up" >

                            <Button variant="contained" >
                                
                                <div id="symbol"> {criptoInfo.symbol} </div>
                            
                                <div id="cripto-price"> ${criptoInfo.lastPrice} </div>
                            
                                <div id="changePercent" data-changepercent={criptoInfo.priceChangePercent} >  {criptoInfo.priceChangePercent}% </div>

                            </Button>

                        </Link>

                    </article>
                    
                ))}    
            </div>
        </div>
    );


}
