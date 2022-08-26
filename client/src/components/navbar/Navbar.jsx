import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import "./navbar.css";
// import { faBed, faCar, faPerson, faPlane, faTaxi } from "@fortawesome/free-solid-svg-icons";

function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()

  const logout = (e) => {
   dispatch ({type: "LOGOUT"})
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg navbar-light bg-dark text-white">
        <div class="container-fluid d-flex justify-content-around">
          <Link to="/" style={{ textDecoration: "none" }}>
            <h3 className="text-uppercase text-white">title</h3>
          </Link>
          <div>
            <ul className="navbar-nav ">
              <li className="nav-item ">
                <h6 className="nav-link text-white">hello</h6>
              </li>
              <li className="nav-item">
                <h6 className="nav-link text-white">hey</h6>
              </li>
              <li className="nav-item">
                <h6 className="nav-link text-white">yahoo</h6>
              </li>
              <li className="nav-item">
                <h6 className="nav-link text-white">ohooo</h6>
              </li>
            </ul>
          </div>
          {!user ? (
            <span>
              <Link to="/login" style={{ textDecoration: "none" }}>
                {" "}
                <h6 className="nav-link text-white">login</h6>
              </Link>
              <a onClick={(e)=>{ navigate("/signup")}}><h6 className="nav-link text-white">Register</h6></a>
            </span>
          ) : (
            <span>
              <div className="dropdown">
                <a
                  className="btn btn-transperent dropdown-toggle text-white"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  hello {user.name}
                </a>

                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuLink"
                >
                  <li>
                    <a className="dropdown-item" onClick={logout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>
            </span>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
