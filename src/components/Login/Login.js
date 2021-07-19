import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { auth } from "../../utils/firebase";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const loginHandler = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const registrationHandler = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // console.log(auth);
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login__shell">
      <div className="login">
        <Link to="/">
          <img
            alt=""
            className="login__logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          />
        </Link>
        <div className="login__container">
          <h1>Sign-In</h1>
          <form>
            <h5>E-mail or mobile phone number</h5>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <h5>Password</h5>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              type="submit"
              className="login__signInButton"
              onClick={loginHandler}
            >
              Sign In
            </button>
          </form>

          <p>
            By continuing, you agree to Amazon Clone's Conditions of Use and
            Privacy Notice.
          </p>
          <p className="login__help">Need help?</p>
          <button
            className="login__registerButton"
            onClick={registrationHandler}
          >
            Create your Amazon account
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
