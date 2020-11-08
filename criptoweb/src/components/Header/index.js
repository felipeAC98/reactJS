import React, {  useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import './styles.css';
import '../../fonts.css';
import '../../animations.css';

import HomeIcon from '@material-ui/icons/Home';

//components
import DrawerMenu from '../../components/Drawer';

//Drawer
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';


const useStyles = makeStyles((theme) => ({
  menuButton: {
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));


export default function Heade(){

    const classes = useStyles();

    //Variaveis de estado
    //necessario para conseguir utilizar as variaveis no metodo render em tempo real conforme elas sofrerem alteracoes devido ao codigo ou backend
    const [criptoInfo,setCriptoInfo]=useState([]); 
    const [drawerStatus, setDrawerStatus] = useState(false);

    //Drawer
    const handleDrawer = (event) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
        return;
      }
  
      setDrawerStatus(!drawerStatus);
    };

    return (
      <div className="CriptoWeb-Header">

        <IconButton
            color="inherit"
            aria-label="abrir menu"
            edge="start"
            onClick={handleDrawer}
            className={classes.menuButton}
          >
            <MenuIcon />
        </IconButton>

        <h1>Cripto_Web</h1>

        <a href="/">
          <button id="homeButton"><HomeIcon/></button>
        </a>
      
        <DrawerMenu stateAnchor={drawerStatus} toggleDrawer={handleDrawer} />

      </div>

      
    );
}