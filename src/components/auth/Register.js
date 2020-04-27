import React, { Fragment, useState } from "react";
import { connect } from 'react-redux';
import { Link, Redirect} from "react-router-dom";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from 'prop-types';


const Register = ({setAlert, register}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    secondPassword: ""
  });

  const { name, email, password, secondPassword, isAuthenticated } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== secondPassword) {
      setAlert("Password do not match",'danger');
    } else {
      register({name,email,password });
    }
  };

  if (isAuthenticated){
    return <Redirect to='/dashboard' />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sing Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
            // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            // required
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravart email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            minLength="6"
            name="password"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm password"
            minLength="6"
            name="secondPassword"
            value={secondPassword}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Already have an account ? <Link to="/login">Sing In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated : state.auth.isAuthenticated
});
export default connect(mapStateToProps, {setAlert,register})(Register);
