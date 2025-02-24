import { useSelector } from 'react-redux';
import UnauthorizedPage from '../UnauthorizedPage';
import './MaterialsPage.css';

const MaterialsPage = () => {
  const user = useSelector(state => state.session.user);
  if (!user) return <UnauthorizedPage />;

  const materials = user.materials;
  if (!materials)
    return <main>{/* <h1 style={{ margin: '2rem' }}>Loading...</h1> */}</main>;

  return (
    <main className="materials-page-main">
      <div className="materials-page-header">Materials</div>
      <div className="materials-div">
        {Object.values(materials).map(material => (
          <div className="material-card" key={material.materialId}>
            <div className="material-icon-div">
              <img
                // src={operator.tooltipUrl}
                className="material-icon"
              />
            </div>
            <div className="material-name-div">
              <div className="material-name">
                {material.name}: {material.quantity}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MaterialsPage;
