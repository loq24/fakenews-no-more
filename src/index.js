import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import reducers from './reducers';
import promise from 'redux-promise';

import NewsIndex from './components/news_index';
import NewsSource from './components/news_source';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		<Switch>
          <Route path="/" exact component={NewsIndex} />  
    			<Route path="/source/:id" component={NewsSource} />	
				<Route component={() => <div>Not found</div>} />					
			</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('#root'));
