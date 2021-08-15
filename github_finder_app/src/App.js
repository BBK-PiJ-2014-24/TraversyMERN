import React, { Component,Fragment } from 'react'
import {BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar';
import UsersList from './components/users/UsersList';
import axios from 'axios';
import './App.css';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

class App extends Component {

   state = {
     user: {},
     users: [],
     repos: [],
     loading: false,
     alert: null,
   };

    // async componentDidMount() {
    //   this.setState({loading: true})
    //   const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
    //   const res = await axios.get(url);
    //   this.setState({
    //     users: res.data,
    //     loading: false
    //   });
    // }

    // Search Github Users
    searchUsers = async (text) => {
      this.setState({loading: true})
      const url = `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      const res = await axios.get(url);
      this.setState({
        users: res.data.items,
        loading: false,
      });
    } 

    // Select Github User Profile
    getUser = async (userName) => {
      this.setState({loading: true})
      const url = `https://api.github.com/users/${userName}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      const res = await axios.get(url);
      this.setState({
        user: res.data,
        loading: false,
      });
    }

    // Get User Repos
    getUserRepos = async (userName) => {
      this.setState({loading: true})
      const url = `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      const res = await axios.get(url);
      this.setState({
        repos: res.data,
        loading: false,
      });
    }




    // clearUsers from page
    clearUsers = () => {
      this.setState({users: [], loading: false});
    }

    //set Alert
    setAlert = (msg, type) => {
        this.setState({alert: {msg:msg, type:type}});
        setTimeout(()=>{this.setState({alert: null})}, 3000);
    }

    render(){
      return (
      <BrowserRouter>
        <div className="App">
          <Navbar title='Github Finder' 
                  icon='fab fa-github'  
          />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route exact path='/' 
                    render={props => (
                      <Fragment>
                        <Search searchUsers={this.searchUsers} 
                                clearUsers={this.clearUsers}
                                showClear={this.state.users.length > 0 ? true : false}
                                setAlert={this.setAlert}
                        />
                        <UsersList loading={this.state.loading}
                                  users={this.state.users}
                        />
                      </Fragment>
                   )} 
              />
              <Route exact path='/about' component={About} />
              <Route exact path='/user/:login' 
                           render={props => (
                             <User {...props} 
                                   getUser={this.getUser} 
                                   getUserRepos={this.getUserRepos} 
                                   user={this.state.user}
                                   repos={this.state.repos}
                                   loading={this.state.loading} />
                           )}
              />   
            </Switch>
          </div>
        </div>
      </BrowserRouter>  
    );
  }
}



export default App;
