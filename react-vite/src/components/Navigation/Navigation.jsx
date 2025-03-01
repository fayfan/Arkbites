import { useEffect, useRef, useState } from 'react';
import { IoLogoGithub } from 'react-icons/io';
import { IoMenuSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import arkbitesLogoSimple from '/arkbites-logo-simple.png';
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

  const closeNavMenu = () => dispatch(thunkShowNavMenu(false));

  return (
    isLoaded && (
      <>
        <nav className="nav-container">
          <div className="nav-container-left">
            <NavLink to="/">
              <div className="arkbites-logo-div">
                <img
                  src={arkbitesLogoSimple}
                  className="arkbites-logo"
                  alt="Arkbites Logo"
                />
              </div>
            </NavLink>
          </div>
          {user && (
            <div className="nav-container-center">
              {windowWidth < 700 && (
                <>
                  <button className="nav-menu-button" onClick={toggleNavMenu}>
                    <IoMenuSharp
                      style={{ width: '100%', height: 'auto' }}
                      className="nav-menu-button-icon"
                    />
                  </button>
                  {showNavMenu && (
                    <div className="nav-menu-dropdown" ref={navUlRef}>
                      <NavLink
                        to="/operators"
                        onClick={closeNavMenu}
                        className="dropdown-nav-link"
                      >
                        <div className="dropdown-nav-link-div">Operators</div>
                      </NavLink>
                      <NavLink
                        to="/materials"
                        onClick={closeNavMenu}
                        className="dropdown-nav-link"
                      >
                        <div className="dropdown-nav-link-div">Materials</div>
                      </NavLink>
                      <NavLink
                        to="/squads"
                        onClick={closeNavMenu}
                        className="dropdown-nav-link"
                      >
                        <div className="dropdown-nav-link-div">Squads</div>
                      </NavLink>
                    </div>
                  )}
                </>
              )}
              {windowWidth >= 700 && (
                <>
                  <NavLink to="/operators" className="nav-link">
                    <div className="nav-link-div">Operators</div>
                  </NavLink>
                  <NavLink to="/materials" className="nav-link">
                    <div className="nav-link-div">Materials</div>
                  </NavLink>
                  <NavLink to="/squads" className="nav-link">
                    <div className="nav-link-div">Squads</div>
                  </NavLink>
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
        {isLoaded && <Outlet />}
        <div className="nav-footer">
          <div className="author-links">
            <a
              href="https://github.com/fayfan/Arkbites"
              className="author-link"
            >
              <IoLogoGithub className="github-logo" />
            </a>
          </div>
          <div className="disclaimer">
            <div className="disclaimer-line">
              All in-game images ©Arknights (source:{' '}
              <a href="https://arknights.wiki.gg" className="source-link">
                Arknights Terra Wiki
              </a>
              ).
            </div>{' '}
            <div className="disclaimer-line">
              The use of these images falls under fair use guidelines.
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Navigation;
