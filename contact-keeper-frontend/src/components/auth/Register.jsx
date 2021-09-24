import React, { useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

function Register(props) {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const initialState = {
    name: "",
    email: "",
    password: "",
    password2: "",
  };

  const [user, setUser] = useState(initialState);

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (user.name === "" || user.email === "" || user.password === "") {
      alertContext.setAlert("Enter All Fields", "danger");
    } else if (user.password !== user.password2) {
      alertContext.setAlert("Passwords Do Not Match", "danger");
    } else {
      authContext.Register({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }
  };

  return (
    <div className="form-container">
      <h1>
        Account: <span className="text-primary">Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password2">Confirm Password:</label>
          <input
            type="password"
            name="password2"
            value={user.password2}
            onChange={onChange}
          />
        </div>
        <input
          type="submit"
          value="Register"
          className="btn btn-primary btn-block"
        />
      </form>
    </div>
  );
}

export default Register;
