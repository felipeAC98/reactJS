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
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


//Serch button
import TextField from '@material-ui/core/TextField';

//Filter hide button
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

//Hidden menu
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: 0,
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
    
    const [criptoRawData,setCriptRawData]=useState([]);    //Somente uma variavel para salvar os valores obtidos da api
    
    const [criptoRenderedData,setCriptoRenderedData]=useState([]);          //Valores dessa variavel sao os que sao printados na tela

    const [criptoOrder, setCriptoOrder]=useState([""]);

    const [hideOptions, setHideOptions]=useState([]);

    const [optionsClassNames, setOptionsClassNames]=useState([""]);

    //Drawer
    const [drawerStatus, setDrawerStatus] = useState(false);

    useEffect(()=> {

        refreshCripto();

        setHideOptions(false);

        setOptionsClassNames("animate-right");

    },[]);

    //Search 

    const handleSearchChange = (event) => {

        //Setando um tempo antes de atualizar a busca
        setTimeout(() => {
            search(event.target.value);
          }, 500)

    }

    const search = async (searchValue) => {

        let criptoInfoTemp=criptoRawData;

        const totalCriptos=criptoInfoTemp.length;

        let usdtCriptos =[];
    
        for(let i=0;i<totalCriptos;i++){
            if(criptoInfoTemp[i].symbol.includes(searchValue)>0){

                criptoInfoTemp[i].lastPrice=parseFloat(criptoInfoTemp[i].lastPrice);
                criptoInfoTemp[i].priceChangePercent=parseFloat(criptoInfoTemp[i].priceChangePercent);
                usdtCriptos.push(criptoInfoTemp[i]);
            }

        }

        setCriptoRenderedData(usdtCriptos);

        console.log(criptoRenderedData)
    }
    //Filter button selectors
    const classes = useStyles();

    const handleChange =  async (event) => {

        let usdtCriptos=criptoRenderedData;

        setCriptoOrder(event.target.value);

        sortCripto(usdtCriptos,event.target.value);

        setCriptoRenderedData(usdtCriptos);

    };

    const refreshCripto = async () => {

        let usdtCriptos =[];

        const response = await api.get(`/api/v3/ticker/24hr`);

        let criptoInfoTemp=response.data
    
        const totalCriptos=criptoInfoTemp.length
    
        for(let i=0;i<totalCriptos;i++){
    
            if(criptoInfoTemp[i].symbol.indexOf("USDT")>0){
    
                criptoInfoTemp[i].lastPrice=parseFloat(criptoInfoTemp[i].lastPrice);
                criptoInfoTemp[i].priceChangePercent=parseFloat(criptoInfoTemp[i].priceChangePercent);
                usdtCriptos.push(criptoInfoTemp[i]);
            }
    
        }
    
        setCriptoRenderedData(usdtCriptos);

        setCriptRawData(usdtCriptos);


    };

    //Hide search and filters
    const hide = async ()=>{

        if(hideOptions===false){
            setHideOptions(true);

        }
        else{

            setHideOptions(false);

        }
    };

    return (

        <div className="main-container">

            <Hidden mdDown>
                
                <div className={`sidebar ${optionsClassNames}`} style={{left: hideOptions == true? '-14.5rem' : '0' }}>

                        <Button id="hide-button" onClick={hide} buttonStyle={{ borderRadius: 50 }} style={{ borderRadius: 50 }}>
                            {hideOptions == true? <KeyboardArrowRight /> : <KeyboardArrowLeft /> }
                        </Button>

                    <div id="searchDiv">
                        <h2> Search </h2>
                        <form id="search" noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Symbol" onChange={handleSearchChange}/>
                        </form>
                    </div>

                    <div id="filtersDiv">
                        <h2> Filters </h2>
                        <FormControl className={classes.formControl}>
                            <InputLabel id="filterSelection">Select your filter</InputLabel>
                                <Select
                                labelId="filterSelection"
                                id="filterSelection"
                                value={criptoOrder}
                                onChange={handleChange}
                                >
                                    <MenuItem value={"price"}>Price</MenuItem>
                                    <MenuItem value={"percentageChange"}>Percentage change</MenuItem>
                                    <MenuItem value={"name"}>Name</MenuItem>
                                    
                                </Select>
                        
                        </FormControl>

                    </div>

                    <Button onClick={refreshCripto} >Refresh</Button>


                </div> 
            
            </Hidden>
            
            <div className={`cripto-list`} style={{padding: hideOptions == true? '3.7rem 0 0 0' : '3.7rem 0 0 12rem' }}>
            
                {criptoRenderedData.map(criptoInfo => ( //se colocar os parenteses nao precisa dar o return //estou pegando cada um dos products dessa lista
                    <article key={criptoInfo.symbol}>
                    
                        <Link to={`cripto/${criptoInfo.symbol}`} className="cripto-info animate-up" >

                            <Button variant="contained" >
                                
                                <div id="symbol"> {criptoInfo.symbol} </div>
                            
                                <div id="cripto-price"> ${criptoInfo.lastPrice} </div>
                            
                                <div id="changePercent" style={{color: criptoInfo.priceChangePercent >= 0 ? '#30B673' : '#EF5757'}}>  {criptoInfo.priceChangePercent}% </div>

                            </Button>

                        </Link>

                    </article>
                    
                ))}    
            </div>
        </div>

        
    );


}
