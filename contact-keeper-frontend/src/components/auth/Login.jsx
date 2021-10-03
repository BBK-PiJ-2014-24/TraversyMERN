import React, { useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
import AlertContext from "../../context/alert/alertContext";

function Login(props) {
  const initialState = {
    email: "",
    password: "",
  };
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const {setAlert} = alertContext;
  const {login, error, clearErrors, isAuthenticated} =  authContext;

  useEffect(()=> {
    if(isAuthenticated){
      props.history.push('/');
    }
    if(error !== null){
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  },[error, setAlert, clearErrors, isAuthenticated,props.history]);

  const [user, setUser] = useState(initialState);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if(user.email === '' || user.password === ''){
      setAlert('Missing Inputs', 'danger');
    } else {
      login({
        email: user.email,
        password:user.password
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account: <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            required
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
}

export default Login;
