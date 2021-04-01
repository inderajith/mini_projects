import React from 'react'
import Home from './Home'
import Navbar from './Navbar'
import Signin from './Signin'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

const App = () => {
    return (
        <Router>
            <Navbar /> 
            <Switch>
              <Route exact path='/' component={Home}></Route>
              <Route exact path='/signin' component={Signin}></Route>              
            </Switch>
       </Router>
    )
}

export default App
