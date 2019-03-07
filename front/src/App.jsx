import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './Components/Pages/Login';
import Landing from './Components/Pages/Landing';

import './Assets/main.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/login" component={Login} />
                    <Route path="/" component={Landing} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default App;
