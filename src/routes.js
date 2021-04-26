import React from "react";
import {Switch, Route} from 'react-router-dom';
import {HashRouter} from 'react-router-dom';
import Home from './components/Home'
import NikeShoes from './components/NikeShoes'
import AdidasShoes from './components/AdidasShoes'
import JordanShoes from './components/JordanShoes'
import NikeOne from './components/ShoeOne'
import Cart from './components/Cart'
import Auth from './components/Auth'
import LogOrReg from './components/LogOrReg'
import AuthReg from './components/AuthReg'
import AllShoes from './components/AllShoes'
import Message from './components/Message'

export default(
    <HashRouter>
    <Switch>
        <Route exact path= '/' component={Home}/>
        <Route path= '/login' component={Auth}/>
        <Route path='/shoe/:id' component={NikeOne}/>
        <Route path='/nikes' component={NikeShoes}/>
        <Route path='/adidas' component={AdidasShoes}/>
        <Route path='/air-jordans' component={JordanShoes}/>
        <Route path='/cart' component={Cart}/>
        <Route path='/account' component={LogOrReg}/>
        <Route path='/register' component={AuthReg}/>
        <Route path='/all-shoes' component={AllShoes}/>
        <Route path='/message' component={Message}/>


        {/* <Route path='shoe/11' component={NikeOne}/> */}



        {/* <Route path='/login' component={Auth}/> */}
    </Switch>
    </HashRouter>
)