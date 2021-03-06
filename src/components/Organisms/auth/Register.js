import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import GoogleButton from 'components/Atoms/GoogleButton/GoogleButton.styled';
import { connect } from 'react-redux';
import { ReactComponent as GoogleIcon } from 'assets/vector/google-icon.svg';
import { registerByEmail } from 'components/store/Actions/authActions';
import StyledAuthWrapper from './AuthWrapper.styled';
import withLogin from './withLogin';

const StyledRegister = styled(StyledAuthWrapper)``;

const Register = ({
  setPassword,
  setEmail,
  handleSubmit,
  setName,
  auth,
  setRegisterPanelActive,
}) => {
  if (auth.uid) setRegisterPanelActive(false);
  return (
    <StyledRegister>
      <h2>Zarejestruj się</h2>
      <form onSubmit={e => handleSubmit(e, 'register')}>
        <label htmlFor="name">
          imię
          <br />
          <input
            minLength="3"
            maxLength="20"
            name="name"
            id="name"
            type="text"
            onChange={e => setName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="email">
          e-mail
          <br />
          <input
            name="email"
            id="email"
            type="e-mail"
            onChange={e => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="password">
          hasło
          <br />
          <input
            minLength="5"
            maxLength="20"
            name="password"
            id="password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Dalej</button>
        <GoogleButton>
          <GoogleIcon />
          Zarejestruj z Google
        </GoogleButton>
      </form>
    </StyledRegister>
  );
};

Register.propTypes = {
  setPassword: propTypes.func.isRequired,
  setEmail: propTypes.func.isRequired,
  setName: propTypes.func.isRequired,
  handleSubmit: propTypes.func.isRequired,
  setRegisterPanelActive: propTypes.func.isRequired,
  auth: propTypes.shape(
    propTypes.oneOfType([propTypes.shape, propTypes.array])
  ),
};

Register.defaultProps = {
  auth: [],
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    register: credentials => dispatch(registerByEmail(credentials)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withLogin(Register));
