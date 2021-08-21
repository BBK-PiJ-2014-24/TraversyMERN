import React, {useContext}  from 'react';
// short cut rce
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';


const userListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem' 
};

function UsersList(props) {

    const githubContext = useContext(GithubContext);

        if(githubContext.loading){
            return <Spinner />
        } else { 
        return (
            <div style={userListStyle}>
                {githubContext.users.map( u => (
                    <UserItem key={u.id} 
                                user={u}
                    />
                ))} 
            </div>
            )
        }
   
}

// UsersList.propTypes ={
//     users: PropTypes.array.isRequired,
//     loading: PropTypes.bool.isRequired
// }

export default UsersList;
