const SHOW_PROFILE_MENU = 'ui/showProfileMenu';
const SHOW_NAV_MENU = 'ui/showNavMenu';

const showProfileMenu = isActive => ({
  type: SHOW_PROFILE_MENU,
  payload: isActive,
});

const showNavMenu = isActive => ({
  type: SHOW_NAV_MENU,
  payload: isActive,
});

export const thunkShowProfileMenu = isActive => async dispatch => {
  dispatch(showProfileMenu(isActive));
};

export const thunkShowNavMenu = isActive => async dispatch => {
  dispatch(showNavMenu(isActive));
};

const initialState = { showProfileMenu: false, showNavMenu: false };

function uiReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_PROFILE_MENU:
      return { ...state, showProfileMenu: action.payload };
    case SHOW_NAV_MENU:
      return { ...state, showNavMenu: action.payload };
    default:
      return state;
  }
}

export default uiReducer;
