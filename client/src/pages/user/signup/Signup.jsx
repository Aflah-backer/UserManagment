import axios from "axios";
import React, { useContext, useLayoutEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { Link } from "react-router-dom";

function Signup() {
  

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const nameChange = (e) => {
    setName(e.target.value)
  }
  const emailChange = (e) => {
    setEmail(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }
  
  const INITIAL_STATE = {
    user:  null,
    loading: false,
    error: null,
  };
  const SignupReducer = (state, action) => {
    switch (action.type) {
      case "SIGNUP_START":
        return {
          user: null,
          loading: true,
          error: null,
        };
      case "SIGNUP_SUCCESS":
        return {
          user: action.payload,
          loading: false,
          error: null,
        };
      case "SIGNUP_FAILURE":
        return {
          user: null,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, signupDispatch] = useReducer(SignupReducer, INITIAL_STATE);

  const { loading, dispatch } = useContext(AuthContext)

  const navigate = useNavigate()

  const handleClick = async (e) => {
    // e.preventDefault();  
    signupDispatch({ type: "SIGNUP_START" });
    try {
      const res = await axios.post("http://localhost:6690/api/auth/register", {"name":name, "email":email, "password":password});
      signupDispatch({ type: "SIGNUP_SUCCESS", payload: res.data });
    } catch (err) {
      signupDispatch({ type: "SIGNUP_FAILURE", payload: err.response.data });
    }
  };
 
  useLayoutEffect(()=>{
    if (state.user){
    dispatch({
      type:"LOGIN_SUCCESS",
      payload:state.user
    })
    navigate("/") 
  }
  },[state.user])


  return (
    <div className="signup">
      <div className="lContainer">
        <section className="vh-100 ">
          <div className="mask d-flex align-items-center h-100 gradient-custom-3">
            <div className="container h-100">
              <div className="row d-flex justify-content-center align-items-center h-100">
                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                  <div className="card" style={{borderRadius:"15px"}}>
                    <div className="card-body p-5">
                      <h2 className="text-uppercase text-center mb-5">
                        Create an account
                      </h2>
                      <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example1cg">
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="form3Example1cg"
                          className="form-control form-control-lg"
                          onChange={nameChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example3cg">
                          Your Email
                        </label>
                        <input
                          type="email"
                          id="form3Example3cg"
                          className="form-control form-control-lg"
                          onChange={emailChange}
                        />
                      </div>

                      <div className="form-outline mb-4">
                      <label className="form-label" for="form3Example4cg">
                          Password
                        </label>
                        <input
                          type="password"
                          id="form3Example4cg"
                          className="form-control form-control-lg"
                          onChange={passwordChange}
                        />
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          disabled={loading}
                          onClick={handleClick  }
                          type="button"
                          className="btn btn-dark text-white btn-block btn-lg gradient-custom-4"
                        >
                          Register
                        </button>
                      </div>
                     <Link to = "/login"> <p className="text-center text-muted mt-5 mb-0" style={{textDecoration: "none" }}>
                        Have already an account?{" "}
                      </p></Link>
                    </div>
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

export default Signup;
