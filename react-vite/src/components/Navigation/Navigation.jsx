import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import arkbitesLingLogo from '/arkbites-ling-logo.png';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const user = useSelector(state => state.session.user);

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
