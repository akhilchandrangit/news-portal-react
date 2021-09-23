import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const NavBar: React.FC = () => {
  const { user, setUser } = useContext(UserContext);

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  }

  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div className="flex-none px-2 mx-2">
        <Link to="/feeds" className="text-lg font-bold">
          News
        </Link>
      </div>
      <div className="flex-1 px-2 mx-2">
        <div className="items-stretch hidden lg:flex">
          {user && (
            <>
              <Link to="/feeds" className="btn btn-ghost btn-sm rounded-btn">
                Feeds
              </Link>
              <Link
                to="/read-later"
                className="btn btn-ghost btn-sm rounded-btn"
              >
                Read Later
              </Link>
            </>
          )}
        </div>
      </div>
      {user && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="m-1 btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li onClick={logout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
