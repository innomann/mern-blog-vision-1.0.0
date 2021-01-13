
import React from 'react'
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginPage from './containers/auth/LoginPage';
import SignUpPage from './containers/auth/SignUpPage';
import { Provider } from "react-redux";
import store from './store'
import jwt_decode from "jwt-decode";
import ProgressBar from './containers/layout/ProgressBar';
import Navbar from './containers/layout/Navbar';
import BlogPage from './containers/BlogPage';
import CreatePostPage from './containers/post/CreatePostPage';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser } from './actions/authActions';
import ViewPostPage from './containers/post/ViewPostPage';

if(localStorage.jwtToken){
  const token = localStorage.jwtToken
  setAuthToken(token);
  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
     console.log("Token expired")
     
  }
}
function App() {
  return (
    <Provider store = { store }>
    <BrowserRouter>
    <ProgressBar/>
    <Navbar/>
    <Switch>
      <Route path = "/login" component = {LoginPage}/>
      <Route path = "/signup" component = {SignUpPage}/>
      <Route exact path = "/blog" component = {BlogPage}/>
      <Route path = "/blog/post/create" component =  { CreatePostPage }/>
      <Route exact path = "/blog/post/:id" component = {ViewPostPage}/>
    </Switch>
    </BrowserRouter>
    </Provider>
  )
}

export default App
