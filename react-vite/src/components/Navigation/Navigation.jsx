import { useEffect, useRef, useState } from 'react';
import { IoMenu } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import arkbitesLingLogo from '/arkbites-ling-logo.png';
import { thunkShowNavMenu, thunkShowProfileMenu } from '../../redux/ui';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const showNavMenu = useSelector(state => state.ui.showNavMenu);
  const navUlRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleNavMenu = e => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    dispatch(thunkShowProfileMenu(false));
    dispatch(thunkShowNavMenu(!showNavMenu));
  };

  useEffect(() => {
    if (!showNavMenu) return;

    const closeNavMenu = e => {
      if (navUlRef.current && !navUlRef.current.contains(e.target)) {
        dispatch(thunkShowNavMenu(false));
      }
    };

    document.addEventListener('click', closeNavMenu);

    return () => document.removeEventListener('click', closeNavMenu);
  }, [showNavMenu, dispatch]);

  return (
    isLoaded && (
      <nav className="nav-container">
        <div className="nav-container-left">
          <NavLink to="/">
            <div className="arkbites-logo-div">
              <img
                src={arkbitesLingLogo}
                className="arkbites-logo"
                alt="Arkbites Ling Logo"
              />
            </div>
          </NavLink>
        </div>
        {user && (
          <div className="nav-container-center">
            {windowWidth < 600 && (
              <>
                <button className="nav-menu-button" onClick={toggleNavMenu}>
                  <IoMenu
                    style={{ width: '100%', height: 'auto' }}
                    className="nav-menu-button-icon"
                  />
                </button>
                {showNavMenu && (
                  <ul className={'nav-menu-dropdown'} ref={navUlRef}>
                    <li>
                      <NavLink to="/operators">Operators</NavLink>
                    </li>
                    <li>
                      <NavLink to="/materials">Materials</NavLink>
                    </li>
                    <li>
                      <NavLink to="/squads">Squads</NavLink>
                    </li>
                  </ul>
                )}
              </>
            )}
            {windowWidth > 600 && (
              <>
                <div className="nav-link-div">
                  <NavLink to="/operators" className="nav-link">
                    Operators
                  </NavLink>
                </div>
                <div className="nav-link-div">
                  <NavLink to="/materials" className="nav-link">
                    Materials
                  </NavLink>
                </div>
                <div className="nav-link-div">
                  <NavLink to="/squads" className="nav-link">
                    Squads
                  </NavLink>
                </div>
              </>
            )}
          </div>
        )}
        <div className="nav-container-right">
          {!user && (
            <>
              <div className="sign-up-button">
                <OpenModalButton
                  modalComponent={<SignupFormModal />}
                  buttonText="Sign up"
                />
              </div>
              <div className="log-in-button">
                <OpenModalButton
                  modalComponent={<LoginFormModal />}
                  buttonText="Log in"
                />
              </div>
            </>
          )}
          {user && (
            <div className="profile-button">
              <ProfileButton />
            </div>
          )}
        </div>
      </nav>
    )
  );
};

// ORIGINAL CODE:
// function Navigation() {
//   return (
//     <ul>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>

//       <li>
//         <ProfileButton />
//       </li>
//     </ul>
//   );
// }

export default Navigation;
