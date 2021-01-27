import React from 'react';
import ReactDOM from 'react-dom';
import { RoutePath } from './Route';
import store from './Redux/rootStore';
import { Provider } from 'react-redux'

const root = document.createElement('div');
document.body.appendChild(root);
ReactDOM.render(
    <Provider store={store}>
        <RoutePath />
    </Provider>,
    root
);