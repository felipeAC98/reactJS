import React from 'react';

import {BrowserRouter, Switch, Route} from 'react-router-dom'

import Main from './pages/main';
import Product from './pages/product';

//O Switch do route path vai retornar o primeiro route que der match PARCIALMENTE com a busca caso nao tenha o exact

//na rota products parametros sao enviados pela URL, devido a isso temos :id
const Routes = () =>(
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main}/>
            <Route exact path="/products/:id" component={Product}/> 

        </Switch>
    </BrowserRouter>
)

export default Routes;