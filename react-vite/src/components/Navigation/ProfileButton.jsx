import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { thunkLogout } from '../../redux/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import { thunkShowNavMenu, thunkShowProfileMenu } from '../../redux/ui';

const ProfileButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(store => store.session.user);
  const showProfileMenu = useSelector(state => state.ui.showProfileMenu);
  const profileUlRef = useRef();

  const toggleProfileMenu = e => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    dispatch(thunkShowNavMenu(false));
    dispatch(thunkShowProfileMenu(!showProfileMenu));
  };

  useEffect(() => {
    if (!showProfileMenu) return;

    const closeProfileMenu = e => {
      if (profileUlRef.current && !profileUlRef.current.contains(e.target)) {
        dispatch(thunkShowProfileMenu(false));
      }
    };

    document.addEventListener('click', closeProfileMenu);

    return () => document.removeEventListener('click', closeProfileMenu);
  }, [showProfileMenu, dispatch]);

  const closeProfileMenu = () => dispatch(thunkShowProfileMenu(false));

  const logout = e => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeProfileMenu();
    navigate('/');
  };

  return (
    <>
      <div className="profile-button-icon" onClick={toggleProfileMenu}>
        <button>{user.username[0].toUpperCase()}</button>
      </div>
      {showProfileMenu && (
        <ul className="profile-dropdown" ref={profileUlRef}>
          {user ? (
            <>
              <li>
                <div className="profile-dropdown-line-1">{user.username}</div>
                <div className="profile-dropdown-line-2">{user.email}</div>
              </li>
              <li onClick={logout} className="log-out-button">
                Log out
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeProfileMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeProfileMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </>
  );
};

export default ProfileButton;
