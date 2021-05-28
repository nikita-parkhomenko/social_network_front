import React from 'react';
import {setContext} from 'apollo-link-context';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ApolloProvider, InMemoryCache, ApolloClient, HttpLink} from '@apollo/client';

import './App.css';
import LogIn from './page/log-in';
import Signup from './page/sign-up';
import Users from './components/users';
import Landing from './components/landing';
import IsAuthenticated from './components/is-authenticated';
import {USERS, LOG_IN, SIGN_UP} from './constants/routes';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });
const authLink = setContext(async (req, { headers }) => {
    // get the authentication token from local storage if it exists
    const token = localStorage.getItem('token');

    // return the headers to the context so httpLink can read them
    return {
        headers: {
            ...headers,
            Authorization: token ? `Bearer ${token}` : '',
        }
    }
});

const link = authLink.concat(httpLink as any);

const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache(),
})

function App() {
  return (
      <ApolloProvider client={client}>
          <Router>
              <Switch>
                  <Route path={SIGN_UP.path}>
                      <Signup />
                  </Route>

                  <Route path={LOG_IN.path}>
                      <LogIn />
                  </Route>

                  <IsAuthenticated>
                      <Route path='/landing'>
                          <Landing />
                      </Route>
                  </IsAuthenticated>
              </Switch>
          </Router>
      </ApolloProvider>
  );
}

export default App;
