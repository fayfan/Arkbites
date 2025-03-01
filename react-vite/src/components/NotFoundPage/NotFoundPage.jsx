import seserenNotFound from '/seseren-not-found.gif';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <main className="not-found-page-main">
      <div className="not-found-page-div">
        <div className="main-header">Page Not Found</div>
        <img
          src={seserenNotFound}
          className="not-found-image"
          alt="Page Not Found"
        />
      </div>
    </main>
  );
};

export default NotFoundPage;
