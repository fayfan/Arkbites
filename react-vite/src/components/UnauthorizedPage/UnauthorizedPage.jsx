import seserenUnauthorized from '/seseren-unauthorized.gif';
import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
  return (
    <main>
      <div className="unauthorized-page-div">
        <div className="unauthorized-message">Unauthorized</div>
        <img
          src={seserenUnauthorized}
          className="unauthorized-image"
          alt="Unauthorized"
        />
      </div>
    </main>
  );
};

export default UnauthorizedPage;
