// Action constants

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ADD_USER_OPERATOR = 'operators/addUserOperator';
const EDIT_USER_OPERATOR = 'operators/editUserOperator';
const DELETE_USER_OPERATOR = 'operators/deleteUserOperator';

// Regular actions

const setUser = user => ({
  type: SET_USER,
  payload: user,
});

const removeUser = () => ({
  type: REMOVE_USER,
});

const addUserOperator = userOperator => {
  return {
    type: ADD_USER_OPERATOR,
    userOperator,
  };
};

const editUserOperator = userOperator => {
  return {
    type: EDIT_USER_OPERATOR,
    userOperator,
  };
};

const deleteUserOperator = displayNumber => {
  return {
    type: DELETE_USER_OPERATOR,
    displayNumber,
  };
};

// Thunk actions

export const thunkAuthenticate = () => async dispatch => {
  const response = await fetch('/api/auth/');
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
};

export const thunkLogin = credentials => async dispatch => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkSignup = user => async dispatch => {
  const response = await fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkLogout = () => async dispatch => {
  await fetch('/api/auth/logout');
  dispatch(removeUser());
};

export const thunkAddUserOperator =
  (displayNumber, newUserOperator) => async dispatch => {
    const response = await fetch(`/api/operators/${displayNumber}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserOperator),
    });

    if (response.ok) {
      const userOperator = await response.json();
      dispatch(addUserOperator(userOperator));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: 'Something went wrong. Please try again' };
    }
  };

export const thunkEditUserOperator =
  (updatedUserOperator, displayNumber) => async dispatch => {
    const response = await fetch(`/api/operators/current/${displayNumber}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUserOperator),
    });

    if (response.ok) {
      const userOperator = await response.json();
      dispatch(editUserOperator(userOperator));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: 'Something went wrong. Please try again' };
    }
  };

export const thunkDeleteUserOperator = displayNumber => async dispatch => {
  const response = await fetch(`/api/operators/current/${displayNumber}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteUserOperator(displayNumber));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

// Reducer

function sessionReducer(state = { user: null }, action) {
  switch (action.type) {
    case SET_USER:
      return { ...state, user: action.payload };
    case REMOVE_USER:
      return { ...state, user: null };
    case ADD_USER_OPERATOR:
      return {
        ...state,
        user: {
          ...state.user,
          operators: {
            ...state.user.operators,
            ...action.userOperator,
          },
        },
      };
    case EDIT_USER_OPERATOR:
      return {
        ...state,
        user: {
          ...state.user,
          operators: {
            ...state.user.operators,
            ...action.userOperator,
          },
        },
      };
    case DELETE_USER_OPERATOR: {
      /* eslint-disable no-unused-vars */
      const { [action.displayNumber]: _, ...updatedOperators } =
        state.user.operators;
      /* eslint-enable no-unused-vars */
      return {
        ...state,
        user: {
          ...state.user,
          operators: updatedOperators,
        },
      };
    }
    default:
      return state;
  }
}

export default sessionReducer;
