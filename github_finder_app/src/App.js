import React, { useState,Fragment } from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import UsersList from './components/users/UsersList';
import axios from 'axios';
import './App.css';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';
import GithubState from './context/github/GithubState';

function App() {

  // const [user, setUser] = useState({});
  // const [users, setUsers] = useState([]);
  // const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);




    // async componentDidMount() {
    //   this.setState({loading: true})
    //   const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    //   const res = await axios.get(url);
    //   this.setState({
    //     users: res.data,
    //     loading: false
    //   });
    // }




    //set Alert
    const showAlert = (msg, type) => {
        setAlert({msg:msg, type:type});
        setTimeout(()=>{setAlert(null)}, 3000);
    }

  return (
  <GithubState>

  <BrowserRouter>
    <div className="App">
      <Navbar title='Github Finder' 
              icon='fab fa-github'  
      />
      <div className='container'>
        <Alert alert={alert} />
        <Switch>
          <Route exact path='/' 
                render={props => (
                  <Fragment>
                    <Search setAlert={showAlert} />
                    <UsersList />
                  </Fragment>
                )} 
          />
          <Route exact path='/about' component={About} />
          <Route exact path='/user/:login' 
                       component={User}
          />   
        </Switch>
      </div>
    </div>
  </BrowserRouter>  
  </GithubState>  
);
}



export default App;
