import React, { Component } from 'react';
import api from '../../services/api'
import {Link} from 'react-router-dom'

import "./styles.css";

export default class Main extends Component{

    //Variaveis de estado
    //necessario para conseguir utilizar as variaveis no metodo render em tempo real conforme elas sofrerem alteracoes devido ao codigo ou backend
    state={
        products:[],
        productInfo:{},
        page: 1,
    };

    //Primeiro componente a ser executado dentro desse componente
    componentDidMount(){ //componente do react
        this.loadProducts();
    }

    loadProducts = async (page=1) =>{ //nova funcao criada, se nao receber parametro nenhum o padrao eh 1
        const response = await api.get(`/products?page=${page}`); //passando o numero da pagina (atributo estado) como parametro
    
        const {docs, ...productInfo} = response.data//pegando todas informacoes no product info
        
        //Inserindo valores na variavel
        //this.setState({products:response.data.docs}); //caso nao tivesse definido o const {docs, ...productInfo} 

        this.setState({products: docs, productInfo: productInfo, page: page}); //Atualizando valores das variaveis

        //alguns elementos do products
        //console.log(response.data.docs)
    };

    prevPage = async () => {
        const{ page, productInfo}=this.state;

        if(page === 1) return;

        const pageNumber = page-1;

        this.loadProducts(pageNumber);
    }

    nextPage = () => {
        const{ page, productInfo }=this.state;

        //productInfo.pages retorna o numero total de paginas, esse atributo vem la da API
        if(page === productInfo.pages) return; //Se tiver na ultima pagina nao ira aocntecer nada ao clicar nessa funcao
    
        const pageNumber = page+1;

        this.loadProducts(pageNumber); //chamando a funcao que da um get nos produtos da API, porem pegando agora uma outra pagina destes produtos

    }


    //O render eh tipo o html desse componente

    //este metodo eh executado quando alguem chamar a classe main, no caso quem chama eh o App.js
    render(){

        //Poderia utilizar a definicao abaixo para nao precisar ficar chamando this.state toda vez que fosse chamar algo do products

        //const {products}=this.state;
        
        return (
            <div className="product-list">

                {this.state.products.map(product => ( //se colocar os parenteses nao precisa dar o return //estou pegando cada um dos products dessa lista
                    <article key={product._id}>
                    
                        <strong>{product.title}</strong>

                        <p>{product.description}</p>

                        <Link to={`products/${product._id}`}>Acessar</Link>

                    </article>
                  
                ))}

                <div className="actions">
                    <button disabled={this.state.page===1} onClick={this.prevPage} > Anterior </button>
                    <button disabled={this.state.page===this.state.productInfo.pages} onClick={this.nextPage}> Proximo </button>
                </div>
            </div>
        );
    }
}