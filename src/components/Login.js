import React from "react";
import { Link } from "react-router-dom";
import LoginHook from './../Hook/Login-Hook';


export default function Login() {
const [loading,validerror,apierror,handleSubmit,handlechange] = LoginHook()

  return (
    <div className="container d-flex flex-column justify-content-center vh-100  ">
      <div className="row justify-content-center  px-5">
        <form onSubmit={handleSubmit} className="col-md-12">
          {validerror.length > 0
            ? validerror.map((item, index) => (
                <div key={index} className=" alert alert-danger">
                  {" "}
                  {item.context.label === "password"
                    ? "please enter valid password"
                    : item.message}
                </div>
              ))
            : ""}
            {
              apierror? <div className="alert alert-danger">{apierror}</div> : ''
            }
          <div className="form-floating mb-3 ">
            <input
              type="email"
              className="form-control"
              name="email"
              onChange={handlechange}
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address :</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="password"
              onChange={handlechange}
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password :</label>
          </div>

          <button type="submit" className=" form-control btn btn-primary">
          {loading ===true? <><i className='fas fa-spinner fa-spin'></i> <i className="fa-solid ms-2 fa-door-open"></i></>:<>Sign In  <i className="fa-solid ms-2 fa-door-closed"></i></>}  
          </button>
        </form>
      </div>

      <div className=" mt-5 text-white  px-5">
        <span>don't have account ?</span>
        <Link to="/register">
          <button type="submit" className=" form-control btn btn-info">
            Register Now
          </button>
        </Link>
      </div>
    </div>
  );
}
