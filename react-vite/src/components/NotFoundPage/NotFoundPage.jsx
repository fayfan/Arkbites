import seserenNotFound from '/seseren-not-found.gif';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <main>
      <div className="not-found-page-div">
        <div className="not-found-message">Page Not Found</div>
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
