import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";

function AdminLogin() {
  const [adminData, setAdminData] = useState({
    email: undefined,
    password: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate()
  const handleChange = (e) => {
    setAdminData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick =async (e) => {
    e.preventDefault();
    dispatch({type:"LOGIN_START"})
    try {
      const res = await axios.post("http://localhost:6690/api/auth/admin", adminData);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    navigate("/dashboard");
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  }

  return (
    <div>
      <div className="lContainer">
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Admin</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          placeholder="Email Address"
                          id="email"
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          placeholder="Password"
                          id="password"
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typePasswordX">
                          Password
                        </label>
                      </div>
                      <button className="btn btn-outline-light btn-lg px-5" onClick={handleClick}>
                        Login
                      </button>
                    </div>
                    {/* {error && <span style={{color:"red"}}>{error.message}</span>} */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AdminLogin;
