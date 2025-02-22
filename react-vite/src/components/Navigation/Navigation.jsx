import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import LoginFormModal from '../LoginFormModal';
import OpenModalButton from '../OpenModalButton';
import ProfileButton from './ProfileButton';
import SignupFormModal from '../SignupFormModal';
import ArkbitesLingLogo from './arkbites-ling-logo.png';
import './Navigation.css';

const Navigation = ({ isLoaded }) => {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="nav-container">
      <div className="arkbites-logo-div">
        <NavLink to="/">
          <img
            src={ArkbitesLingLogo}
            className="arkbites-logo"
            alt="Arkbites Ling Logo"
          />
        </NavLink>
      </div>
      <div className="nav-container-right">
        {isLoaded && !sessionUser && (
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
        {isLoaded && sessionUser && (
          <div className="profile-button">
            <ProfileButton />
          </div>
        )}
      </div>
    </nav>
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
