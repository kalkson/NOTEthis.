export const signIn = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: 'LOGIN_SUCCESS' });
      })
      .catch(err => {
        dispatch({ type: 'LOGIN_ERROR', err });
      });
  };
};

export const registerByEmail = credentials => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const firestore = firebase.firestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(credentials.email, credentials.password)
      .then(({ user: { uid } }) => {
        return uid;
      })
      .then(id => {
        const userCollection = {
          id,
          name: credentials.name,
          lists: { active: [], archived: [] },
          notes: { active: [] },
          userColor: '#e5c373',
          userImage: '',
        };

        firestore
          .collection('userData')
          .doc(id)
          .set(userCollection)
          .then(() => {
            dispatch({ type: 'REGISTER_SUCCESS', userCollection });
          });
      })
      .catch(err => {
        dispatch({ type: 'REGISTER_ERROR', err });
      });
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: 'SIGNOUT_SUCCESS' });
      });
  };
};
