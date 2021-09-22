import Feeds from '../pages/Feeds';
import Login from '../pages/Login';
import ReadLater from '../pages/ReadLater';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const Routes: React.FC = () => {
  return (
    <>
      <PublicRoute path="/login" component={Login} />
      <PublicRoute path="/signup" component={SignUp} />
      <ProtectedRoute path="/feeds" component={Feeds} />
      <ProtectedRoute path="/read-later" component={ReadLater} />
    </>
  );
}

export default Routes;
