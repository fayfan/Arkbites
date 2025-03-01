import seserenUnauthorized from '/seseren-unauthorized.gif';
import './UnauthorizedPage.css';

const UnauthorizedPage = () => {
  return (
    <main className="unauthorized-page-main">
      <div className="unauthorized-page-div">
        <div className="main-header">Unauthorized</div>
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
