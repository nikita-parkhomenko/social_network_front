import React from 'react';
import { setContext } from 'apollo-link-context';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, InMemoryCache, ApolloClient, HttpLink } from '@apollo/client';

import './App.css';
import Users from './components/users';

const httpLink = new HttpLink({ uri: 'http://localhost:4000' });
const authLink = setContext(async (req, { headers }) => {
    const token = localStorage.getItem('token');

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
                  <Route path='/users'>
                      <Users />
                  </Route>
              </Switch>
          </Router>
      </ApolloProvider>
  );
}

export default App;
