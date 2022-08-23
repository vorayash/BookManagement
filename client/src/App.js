import React, { Component } from "react";
import BookList from "./components/BookList";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import AddBook from "./components/AddBook";


// appollo client setup
const client = new ApolloClient({
  uri: `${process.env.REACT_APP_HOST}/graphql`,
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div id="main">
          <h1>Book Reading List</h1>
          <BookList />
          <AddBook/>
        </div>
      </ApolloProvider>
    );
  }
}


export default App;
