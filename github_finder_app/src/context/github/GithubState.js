import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
    GET_USER,
    GET_REPOS
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== 'production'){
    githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
    githubClientId = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {

    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false
    };

    const [state, dispatch] =  useReducer(GithubReducer, initialState);

    
    
    // Search Github Users
    const searchUsers = async (text) => {
        setLoading();
        const url = `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubClientSecret}`;
        const res = await axios.get(url);
        dispatch({type: SEARCH_USERS, payload: res.data.items});
    } 

    
    
    
    
    // Get User
    // Select Github User Profile
    const getUser = async (userName) => {
      setLoading();
      const url = `https://api.github.com/users/${userName}?client_id=${githubClientId}&client_secret=${githubClientSecret}`;
      const res = await axios.get(url);
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    }

    // Get User Repos
    const getUserRepos = async (userName) => {
      setLoading();
      const url = `https://api.github.com/users/${userName}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`;
      const res = await axios.get(url);
      dispatch({
          type: GET_REPOS,
          payload: res.data
        });  
    }
    
    // clearUsers from page
    const clearUsers = () => {dispatch({type: CLEAR_USERS})}
    
    // Set Loading
    const setLoading = () => {dispatch({type: SET_LOADING})};


    return (<GithubContext.Provider
                    value={{
                        users: state.users,
                        user: state.user,
                        repos: state.repos,
                        loading: state.loading,
                        searchUsers: searchUsers,
                        clearUsers: clearUsers,
                        getUser: getUser,
                        getUserRepos: getUserRepos
                    }}>
                {props.children}
            </GithubContext.Provider>);


}

export default GithubState;