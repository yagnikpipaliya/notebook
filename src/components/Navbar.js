import React, {useEffect} from "react";
import {
  // createBrowserRouter as Router,
  // RouterProvider,
  // Switch,
  // Route,
  Link,
  useLocation,
  useNavigate
} from "react-router-dom";

function Navbar() {
  let navigate = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    navigate('/login')
  }
  const location = useLocation();
  useEffect(() => {
    console.log(location.pathname);
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg bg-dark border-bottom border-bottom-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="/navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={` nav-link active ${location.pathname==="/" ? "active" : ""} `} aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={` nav-link active ${location.pathname==="/about" ? "active" : ""} `}  to="/about">
                About
              </Link>
            </li>
          </ul>
          {!localStorage.getItem('token') ? <form className="d-flex" role="search">
           
             <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
            <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link> 
          </form> : <Link className="btn btn-primary mx-2" to="/login" role="button" onClick={handleLogout}>Logout</Link> }
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
