import Feeds from '../pages/Feeds';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ReadLater from '../pages/ReadLater';
import SignUp from '../pages/SignUp';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';

const Routes: React.FC = () => {
  return (
    <>
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/signup" component={SignUp} />
      <ProtectedRoute exact path="/feeds" component={Feeds} />
      <ProtectedRoute exact path="/read-later" component={ReadLater} />
      <ProtectedRoute exact path="/profile" component={Profile} />
    </>
  );
}

export default Routes;
