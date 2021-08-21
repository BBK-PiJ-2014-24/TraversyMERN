import React, { useEffect, useContext, Fragment } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import RepoList from '../repos/RepoList';
import GithubContext from '../../context/github/githubContext';

function User(props){ 

    const githubContext = useContext(GithubContext);

    const {login} = props.match.params;

    
    useEffect(()=>{
        githubContext.getUser(login);
        githubContext.getUserRepos(login);
        //eslint-disable-next-line
    }, []);


        if(githubContext.loading) return <Spinner />;
        return( 
            <Fragment>
               <Link to='/' className='btn btn-light'>Back to Search</Link>
               Hireable: {' '}
               {githubContext.user.hireable ? 
                    <i className='fas fa-check text-success' /> :
                    <i className='fas fa-times-circle text-danger' />
               }
               <div className='card grid-2'>
                   <div className='all-center'>
                        <img src={githubContext.user.avatar_url}
                             className='round-img' 
                             style={{width: '150px'}}
                             alt='pic' />
                        <h1>{githubContext.user.name}</h1>
                        <p>Location: {githubContext.user.location}</p>
                   </div>
                   <div>
                       {githubContext.user.bio &&
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{githubContext.user.bio}</p>
                            </Fragment>
                       }
                       <Link to={githubContext.user.html_url} 
                             className='btn btn-dark my-1'>
                             Visit Github Page
                        </Link>
                        <ul>
                            <li>
                               {githubContext.user.login && 
                                <Fragment>
                                    <strong>Username:</strong> {githubContext.user.login}
                                </Fragment>
                               } 
                            </li>
                            <li>
                               {githubContext.user.company && 
                                <Fragment>
                                    <strong>Company:</strong> {githubContext.user.company}
                                </Fragment>
                               } 
                            </li>
                            <li>
                               {githubContext.user.blog && 
                                <Fragment>
                                    <strong>Website:</strong> {githubContext.user.blog}
                                </Fragment>
                               } 
                            </li>
                        </ul>
                   </div>
               </div>
               <div className='card text-center'>
                   <div className='badge badge-primary'>
                       Followers: {githubContext.user.followers}
                   </div>
                   <div className='badge badge-success'>
                       Following: {githubContext.user.following}
                   </div>
                   <div className='badge badge-light'>
                       Public Repos: {githubContext.user.public_repos}
                   </div>
                   <div className='badge badge-dark'>
                       Public Gists: {githubContext.user.public_gists}
                   </div>
               </div>
               <RepoList repos={githubContext.repos} />
            </Fragment>
        )
}

User.propTypes = {
    // loading: PropTypes.bool,
    // user: PropTypes.object.isRequired,
    // getUser: PropTypes.func.isRequired,
    // getUserRepos: PropTypes.func.isRequired,
    // repos: PropTypes.array.isRequired,
}
export default User;
