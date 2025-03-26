// Action constants

const LOAD_OPERATORS = 'operators/loadOperators';

// Regular actions

const loadOperators = operators => {
  return {
    type: LOAD_OPERATORS,
    operators,
  };
};

// Thunk actions

export const thunkLoadOperators = () => async dispatch => {
  const response = await fetch('/api/operators/');

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

// Reducer

const operatorsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOAD_OPERATORS:
      return { ...state, ...action.operators };
    default:
      return state;
  }
};

export default operatorsReducer;
