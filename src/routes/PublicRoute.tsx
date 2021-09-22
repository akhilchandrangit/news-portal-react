import { Redirect, Route, RouteProps } from 'react-router-dom';

const PublicRoute = ({
  component: Component,
  ...rest
}: RouteProps): JSX.Element => {
  const isAuth = localStorage.getItem('user');

  return !isAuth ? (
    <Route component={Component} {...rest} />
  ) : (
    <Redirect to="/feeds" />
  );
};

export default PublicRoute;
