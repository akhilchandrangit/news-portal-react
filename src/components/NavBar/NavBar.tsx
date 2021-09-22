import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  const user = localStorage.getItem('user');

  return (
    <div className="navbar mb-2 shadow-lg bg-neutral text-neutral-content">
      <div className="flex-none px-2 mx-2">
        <span className="text-lg font-bold">News</span>
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
      <div className="flex-none">
        <div className="avatar">
          <div className="rounded-full w-10 h-10 m-1">
            <img src="https://i.pravatar.cc/500?img=32" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
