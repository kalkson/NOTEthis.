import React, { useState } from 'react';

const withLogin = Component => {
  const returnComponent = props => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const handleSubmit = (e, type) => {
      e.preventDefault();

      switch (type) {
        case 'login': {
          props.signInDispatch({ email, password });
          break;
        }
        case 'register': {
          props.register({ email, password, name });
          break;
        }
        default:
          break;
      }
    };

    return (
      <Component
        {...props}
        setPassword={setPassword}
        setEmail={setEmail}
        setName={setName}
        handleSubmit={handleSubmit}
      />
    );
  };

  returnComponent.displayName = 'withLoginHOC';
  return returnComponent;
};

export default withLogin;
