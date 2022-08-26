import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

function AdminMainNav() {
  const { user } = useContext(AuthContext);
  // console.log(user);
  return (
    <div>
      <nav
        className="navbar navbar-expand-lg navbar-light text-white "
        style={{ background: "#358597" }}
      >
        <div className="container-fluid d-flex justify-content-around">
          <h3 className="text-uppercase text-white">title</h3>
          <span>
            {/* <h1>{user}</h1> */}
            <h5 className="text-dark">{user.name}</h5>
          </span>
        </div>
      </nav>
    </div>
  );
}

export default AdminMainNav;
