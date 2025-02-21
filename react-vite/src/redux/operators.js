// Action constants

const LOAD_OPERATORS = 'operators/loadOperators';
const ADD_USER_OPERATOR = 'operators/addUserOperator';
const EDIT_USER_OPERATOR = 'operators/editUserOperator';
const DELETE_USER_OPERATOR = 'operators/deleteUserOperator';

// Regular actions

const loadOperators = operators => {
  return {
    type: LOAD_OPERATORS,
    operators,
  };
};

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

const deleteUserOperator = () => {
  return {
    type: DELETE_USER_OPERATOR,
  };
};

// Thunk actions

export const thunkLoadOperators = () => async dispatch => {
  const response = await fetch('/api/operators');

  if (response.ok) {
    const operators = await response.json();
    dispatch(loadOperators(operators));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkAddUserOperator =
  (newUserOperator, displayNumber) => async dispatch => {
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
    dispatch(deleteUserOperator());
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

// Reducer

const operatorsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_OPERATORS:
      return { ...state, ...action.operators };
    case ADD_USER_OPERATOR:
      return { ...state, ...action.userOperator };
    case EDIT_USER_OPERATOR:
      return { ...state, ...action.userOperator };
    case DELETE_USER_OPERATOR: {
      // const { [action.albumId]: _, ...newState } = state;
      // return newState;
      return { ...state };
    }
    default:
      return state;
  }
};

export default operatorsReducer;
