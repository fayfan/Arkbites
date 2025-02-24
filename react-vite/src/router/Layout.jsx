import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation/Navigation';
import { ModalProvider, Modal } from '../context/Modal';
import * as operatorActions from '../redux/operators';
import { thunkAuthenticate } from '../redux/session';

const Layout = () => {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
    dispatch(operatorActions.thunkLoadOperators());
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <Navigation isLoaded={isLoaded} />
        {isLoaded && <Outlet />}
        <Modal />
      </ModalProvider>
    </>
  );
};

export default Layout;
