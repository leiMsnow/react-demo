import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import reducers from './reducer'
import './config'
import './index.css'

import { AuthRoute } from './component'

import Home from './container/home'
import Login from './container/login'
import Register from './container/register'
import BossInfo from './container/bossinfo'
import GeniusInfo from './container/geniusinfo'

const store = createStore(reducers, compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
))

ReactDOM.render(
    (<Provider store={store}>
        <BrowserRouter>
            <div>
                <AuthRoute />
                <Switch>
                    <Route path='/login' component={Login} />
                    <Route path='/register' component={Register} />
                    <Route path='/bossInfo' component={BossInfo} />
                    <Route path='/geniusInfo' component={GeniusInfo} />
                    <Route path='/chat/:user' component={GeniusInfo} />
                    <Route component={Home} />
                </Switch>
            </div>
        </BrowserRouter>
    </Provider>),
    document.getElementById('root')
)