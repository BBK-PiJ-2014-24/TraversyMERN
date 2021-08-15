import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import RepoList from '../repos/RepoList';

class User extends Component {

    static propTypes = {
        loading: PropTypes.bool,
        user: PropTypes.object.isRequired,
        getUser: PropTypes.func.isRequired,
        getUserRepos: PropTypes.func.isRequired,
        repos: PropTypes.array.isRequired,
    }

    componentDidMount() {
        this.props.getUser(this.props.match.params.login);
        this.props.getUserRepos(this.props.match.params.login);
    }

    render() {
        if(this.props.loading) return <Spinner />;
        return( 
            <Fragment>
               <Link to='/' className='btn btn-light'>Back to Search</Link>
               Hireable: {' '}
               {this.props.user.hireable ? 
                    <i className='fas fa-check text-success' /> :
                    <i className='fas fa-times-circle text-danger' />
               }
               <div className='card grid-2'>
                   <div className='all-center'>
                        <img src={this.props.user.avatar_url}
                             className='round-img' 
                             style={{width: '150px'}}
                             alt='pic' />
                        <h1>{this.props.user.name}</h1>
                        <p>Location: {this.props.user.location}</p>
                   </div>
                   <div>
                       {this.props.user.bio &&
                            <Fragment>
                                <h3>Bio</h3>
                                <p>{this.props.user.bio}</p>
                            </Fragment>
                       }
                       <Link to={this.props.user.html_url} 
                             className='btn btn-dark my-1'>
                             Visit Github Page
                        </Link>
                        <ul>
                            <li>
                               {this.props.user.login && 
                                <Fragment>
                                    <strong>Username:</strong> {this.props.user.login}
                                </Fragment>
                               } 
                            </li>
                            <li>
                               {this.props.user.company && 
                                <Fragment>
                                    <strong>Company:</strong> {this.props.user.company}
                                </Fragment>
                               } 
                            </li>
                            <li>
                               {this.props.user.blog && 
                                <Fragment>
                                    <strong>Website:</strong> {this.props.user.blog}
                                </Fragment>
                               } 
                            </li>
                        </ul>
                   </div>
               </div>
               <div className='card text-center'>
                   <div className='badge badge-primary'>
                       Followers: {this.props.user.followers}
                   </div>
                   <div className='badge badge-success'>
                       Following: {this.props.user.following}
                   </div>
                   <div className='badge badge-light'>
                       Public Repos: {this.props.user.public_repos}
                   </div>
                   <div className='badge badge-dark'>
                       Public Gists: {this.props.user.public_gists}
                   </div>
               </div>
               <RepoList repos={this.props.repos} />
            </Fragment>
        )
    }
}

export default User;
