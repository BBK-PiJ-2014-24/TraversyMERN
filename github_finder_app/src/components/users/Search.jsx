import React, {  useState, useContext } from 'react';
import PropTypes from 'prop-types';
import GithubContext from '../../context/github/githubContext';
import AlertContext from '../../context/alert/alertContext';

function Search(props) {

   const githubContext = useContext(GithubContext); 
   const alertContext = useContext(AlertContext);

   const [text, setText] = useState('');

   const onChange = (e) => {
        setText(e.target.value);
   }

   const onSubmit = (e) => {
        e.preventDefault();
        if(text === ''){
            alertContext.setAlert('Empty Query!', 'light');
        } else {
            githubContext.searchUsers(text);
            setText('');
        }
   }

    return (
        <div>
            <form onSubmit={onSubmit} className='form'>
                <input type="text" 
                        name='text' 
                        placeholder='Find Users...' 
                        value={text}   
                        onChange={onChange} 
                        />
                <input type="submit" 
                       value='Search' 
                       className='btn btn-dark btn-block' 
                       />
            </form>
            {githubContext.users.length > 0 && (
                <button className='btn btn-light btn-block' 
                        onClick={githubContext.clearUsers}>
                        Clear
                </button>
            )}
        </div>
    )
}

Search.propTypes = {
    // clearUsers: PropTypes.func.isRequired,
    // showClear: PropTypes.bool.isRequired,
    // setAlert: PropTypes.func.isRequired,
}

export default Search
