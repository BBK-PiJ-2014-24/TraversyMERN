import React, { Component } from 'react'
import Navbar from './components/layout/Navbar';
import UsersList from './components/users/UsersList';
import axios from 'axios';
import './App.css';

class App extends Component {

   state = {
     users: [],
     loading: false,
   };

    async componentDidMount() {
      this.setState({loading: true})
      const url = `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`;
      const res = await axios.get(url);
      this.setState({
        users: res.data,
        loading: false
      });
    }

    render(){
      return (
      <div className="App">
        <Navbar title='Github Finder' 
                icon='fab fa-github'  
        />
        <div className='container'>
          <UsersList loading={this.state.loading}
                     users={this.state.users}
          />
        </div>
      </div>
    );
  }
}

export default App;