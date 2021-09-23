import { useContext, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const ProtectedRoute = ({
  component: Component,
  ...rest
}: RouteProps): JSX.Element => {
  const loggedUser = localStorage.getItem('user');
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  return user ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to="/login" />
  );
};

export default ProtectedRoute;
