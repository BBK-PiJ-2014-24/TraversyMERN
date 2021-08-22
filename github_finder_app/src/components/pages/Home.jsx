import React, {Fragment} from 'react';
import Search from '../users/Search';
import UsersList from '../users/UsersList';

function Home() {
    return (
        <>
            <Search />
            <UsersList />
        </>
    )
}

export default Home;
