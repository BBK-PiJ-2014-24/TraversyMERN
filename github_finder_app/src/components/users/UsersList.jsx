import React  from 'react';
// short cut rce
import UserItem from './UserItem';
import Spinner from '../layout/Spinner';
import PropTypes from 'prop-types';


const userListStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gridGap: '1rem' 
};

function UsersList(props) {


        if(props.loading){
            return <Spinner />
        } else { 
        return (
            <div style={userListStyle}>
                {props.users.map( u => (
                    <UserItem key={u.id} 
                                user={u}
                    />
                ))} 
            </div>
            )
        }
   
}

UsersList.propTypes ={
    users: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
}

export default UsersList;
