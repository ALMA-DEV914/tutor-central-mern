// import React from "react";
import React from "react";
//import axios from 'axios';
//import Stripe from "react-stripe-checkout";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";
import { Container } from "react-bootstrap";
import Home from "./pages/Home";
import Login from "./pages/Login";
import TutorSignup from "./pages/TutorSignup";
import TutorDetail from "./pages/TutorDetail";
import StudentSignup from "./pages/StudentSignup";
import Header from "./components/Header";
import NoMatch from "./pages/NoMatch";
import Footer from "./components/Footer";
import TutorProfile from "./pages/TutorProfile";
import ChatDetail from "./pages/ChatDetail";
import StudentProfile from "./pages/StudentProfile";
import { Pricing } from "./components/Pricing";
import Cart from './components/Cart';
import Features from "./pages/Features";

// import Tutor from "./components/Tutor";
// import { QUERY_TUTORS } from "./utils/queries";
// import { useQuery } from "@apollo/client";
// import SearchBar from "./components/SearchBar";

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


function App (){
  return (
    <ApolloProvider client={client}>
      <Router >
        <Header />
          <Container>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/logout' element={<Home logout={true} />} />
               <Route path='/pricing' element= {<Pricing/>}/>
               <Route path="/features" element={<Features/>}/>
              <Route path='/student-signup' element={<StudentSignup />} />
              <Route path='/student-profile' element={<StudentProfile/>}/>
              <Route path='/tutor-signup' element={<TutorSignup />} />
              <Route path='/pay' element={<Cart/>}/>
              <Route path='/tutor/:id' element={<TutorDetail />} />
              <Route path='/tutor-profile/' element={<TutorProfile />} />
              <Route path='/chat/:id' element={<ChatDetail />} />
              <Route path='*' element={<NoMatch />} />
            </Routes>
          </Container>
          <Footer />
      </Router>
    </ApolloProvider>
  );
}

export default App;
