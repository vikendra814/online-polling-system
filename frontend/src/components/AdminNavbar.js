
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function AdminNavbar() {
  const userData = Cookies.get("username");
  const router = useNavigate();

  function logout() {
    Cookies.remove("token");
    Cookies.remove("username");
    router(`/login`);
  }
  return (
    <>
      <nav
        className={`navbar navbar-expand-lg  px-4 bg-dark text-light` }
      >
        Admin Panel
        <button
          className="navbar-toggler text-white"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          
          <ul className="navbar-nav">
          <li className="nav-item active">
              <Link className={`nav-link text-bold text-light`} to="/userPoll">
               See Voting Result
              </Link>
            </li>
          <li className="nav-item active">
              <Link className={`nav-link text-bold text-light`} to="/addPoll">
                Add Poll
              </Link>
            </li>
            {userData !== undefined && userData !== null ? (
              <li className="nav-item active">
                <b
                  className="p-0 m-0 rounded p-2 text-white button"
                  onMouseOver={(e) => (e.currentTarget.innerHTML = "Logout")}
                  onMouseOut={(e) => (e.currentTarget.innerHTML = userData)}
                  onClick={logout}
                >
                  {userData}
                </b>
              </li>
            ) : (
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <Link className="nav-link text-white" to="/">
                    Login
                  </Link>
                </li>
                <li className="nav-item active">
                  <Link className="nav-link text-white" to="/signup">
                    Signup
                  </Link>
                </li>
              </ul>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default AdminNavbar;
