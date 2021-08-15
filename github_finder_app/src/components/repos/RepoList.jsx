import React from 'react';
import PropTypes from 'prop-types';
import RepoItem from './RepoItem';

const RepoList = (props) => {
    return (
        props.repos.map(repo => <RepoItem repo={repo} key={repo.id} />)
    )
}


RepoList.propTypes ={
    repos: PropTypes.array.isRequired,
}

export default RepoList;