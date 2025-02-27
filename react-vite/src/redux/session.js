// Action constants

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';
const ADD_USER_OPERATOR = 'operators/addUserOperator';
const EDIT_USER_OPERATOR = 'operators/editUserOperator';
const DELETE_USER_OPERATOR = 'operators/deleteUserOperator';
const ADD_USER_MATERIAL = 'materials/addUserMaterial';
const EDIT_USER_MATERIAL = 'materials/editUserMaterial';
const DELETE_USER_MATERIAL = 'materials/deleteUserMaterial';
const ADD_SQUAD = 'squads/addSquad';
const EDIT_SQUAD = 'squads/editSquad';
const DELETE_SQUAD = 'squads/deleteSquad';
const ADD_SQUAD_OPERATOR = 'squads/addSquadOperator';
const DELETE_SQUAD_OPERATOR = 'squads/deleteSquadOperator';

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

const addUserMaterial = userMaterial => {
  return {
    type: ADD_USER_MATERIAL,
    userMaterial,
  };
};

const editUserMaterial = userMaterial => {
  return {
    type: EDIT_USER_MATERIAL,
    userMaterial,
  };
};

const deleteUserMaterial = materialId => {
  return {
    type: DELETE_USER_MATERIAL,
    materialId,
  };
};

const addSquad = squad => {
  return {
    type: ADD_SQUAD,
    squad,
  };
};

const editSquad = squad => {
  return {
    type: EDIT_SQUAD,
    squad,
  };
};

const deleteSquad = squadId => {
  return {
    type: DELETE_SQUAD,
    squadId,
  };
};

const addSquadOperator = squad => {
  return {
    type: ADD_SQUAD_OPERATOR,
    squad,
  };
};

const deleteSquadOperator = squad => {
  return {
    type: DELETE_SQUAD_OPERATOR,
    squad,
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
  (displayNumber, updatedUserOperator) => async dispatch => {
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

export const thunkAddUserMaterial =
  (materialId, newUserMaterial) => async dispatch => {
    const response = await fetch(`/api/materials/${materialId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserMaterial),
    });

    if (response.ok) {
      const userMaterial = await response.json();
      dispatch(addUserMaterial(userMaterial));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: 'Something went wrong. Please try again' };
    }
  };

export const thunkEditUserMaterial =
  (materialId, updatedUserMaterial) => async dispatch => {
    const response = await fetch(`/api/materials/current/${materialId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUserMaterial),
    });

    if (response.ok) {
      const userMaterial = await response.json();
      dispatch(editUserMaterial(userMaterial));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: 'Something went wrong. Please try again' };
    }
  };

export const thunkDeleteUserMaterial = materialId => async dispatch => {
  const response = await fetch(`/api/materials/current/${materialId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteUserMaterial(materialId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkAddSquad = newSquad => async dispatch => {
  const response = await fetch('/api/squads/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newSquad),
  });

  if (response.ok) {
    const squad = await response.json();
    dispatch(addSquad(squad));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkEditSquad = (squadId, updatedSquad) => async dispatch => {
  const response = await fetch(`/api/squads/${squadId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedSquad),
  });

  if (response.ok) {
    const squad = await response.json();
    dispatch(editSquad(squad));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkDeleteSquad = squadId => async dispatch => {
  const response = await fetch(`/api/squads/${squadId}`, {
    method: 'DELETE',
  });

  if (response.ok) {
    dispatch(deleteSquad(squadId));
  } else if (response.status < 500) {
    const errorMessages = await response.json();
    return errorMessages;
  } else {
    return { server: 'Something went wrong. Please try again' };
  }
};

export const thunkAddSquadOperator =
  (squadId, displayNumber) => async dispatch => {
    const response = await fetch(
      `/api/squads/${squadId}/operators/${displayNumber}`,
      {
        method: 'POST',
      }
    );

    if (response.ok) {
      const squad = await response.json();
      dispatch(addSquadOperator(squad));
    } else if (response.status < 500) {
      const errorMessages = await response.json();
      return errorMessages;
    } else {
      return { server: 'Something went wrong. Please try again' };
    }
  };

export const thunkDeleteSquadOperator =
  (squadId, displayNumber) => async dispatch => {
    const response = await fetch(
      `/api/squads/${squadId}/operators/${displayNumber}`,
      {
        method: 'DELETE',
      }
    );

    if (response.ok) {
      const squad = await response.json();
      dispatch(deleteSquadOperator(squad));
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
      const updatedSquads = Object.keys(state.user.squads).reduce(
        (acc, squadId) => {
          const squad = { ...state.user.squads[squadId] };
          if (squad.operators.includes(action.displayNumber)) {
            squad.operators = squad.operators.filter(
              displayNumber => displayNumber !== action.displayNumber
            );
          }
          acc[squadId] = squad;
          return acc;
        },
        {}
      );
      return {
        ...state,
        user: {
          ...state.user,
          operators: updatedOperators,
          squads: updatedSquads,
        },
      };
    }
    case ADD_USER_MATERIAL:
      return {
        ...state,
        user: {
          ...state.user,
          materials: {
            ...state.user.materials,
            ...action.userMaterial,
          },
        },
      };
    case EDIT_USER_MATERIAL:
      return {
        ...state,
        user: {
          ...state.user,
          materials: {
            ...state.user.materials,
            ...action.userMaterial,
          },
        },
      };
    case DELETE_USER_MATERIAL: {
      /* eslint-disable no-unused-vars */
      const { [action.materialId]: _, ...updatedMaterials } =
        state.user.materials;
      /* eslint-enable no-unused-vars */
      return {
        ...state,
        user: {
          ...state.user,
          materials: updatedMaterials,
        },
      };
    }
    case ADD_SQUAD:
      return {
        ...state,
        user: {
          ...state.user,
          squads: {
            ...state.user.squads,
            ...action.squad,
          },
        },
      };
    case EDIT_SQUAD:
      return {
        ...state,
        user: {
          ...state.user,
          squads: {
            ...state.user.squads,
            ...action.squad,
          },
        },
      };
    case DELETE_SQUAD: {
      /* eslint-disable no-unused-vars */
      const { [action.squadId]: _, ...updatedSquads } = state.user.squads;
      /* eslint-enable no-unused-vars */
      return {
        ...state,
        user: {
          ...state.user,
          squads: updatedSquads,
        },
      };
    }
    case ADD_SQUAD_OPERATOR:
      return {
        ...state,
        user: {
          ...state.user,
          squads: {
            ...state.user.squads,
            ...action.squad,
          },
        },
      };
    case DELETE_SQUAD_OPERATOR:
      return {
        ...state,
        user: {
          ...state.user,
          squads: {
            ...state.user.squads,
            ...action.squad,
          },
        },
      };
    default:
      return state;
  }
}

export default sessionReducer;
