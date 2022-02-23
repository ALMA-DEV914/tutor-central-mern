import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Nav from "./components/Nav";
import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer";
import  SearchTutors  from "./pages/SearchTutors";

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          <Nav />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/" component={SearchTutors} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route component={NoMatch} />
            
   <h1>This is a webpage for my tuition agency</h1>
  <p>Listed below are my tutors</p>  <div id="socket"></div>  <p>We just love using TutorCruncher for our business.</p>

            </Switch>
            <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
