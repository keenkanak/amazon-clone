import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import ImageSlider from "./components/ImageSlider/ImageSlider";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Login/Login";
import Payment from "./components/Payment/Payment";
import Orders from "./components/Orders/Orders";
import { auth } from "./utils/firebase";
import { useStateValue } from "./utils/StateProvider";
import { actions } from "./utils/reducer";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./App.css";

const promise = loadStripe(
  "pk_test_51J8W3RSDsXsHZowCcS8zzxJ6kOGIP5F5mlPQKdrCXmLyWsDooSOSxTUN6b616la4tTfZNyFacaqTqh78MahKYvHZ00nGCXaHJj"
);

const App = () => {
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      //Firebase Listener
      console.log("The user is ", authUser);
      if (authUser) {
        dispatch({ type: actions.setUser, payload: authUser });
        //The user logged in or was just logged out
      } else {
        dispatch({ type: actions.setUser, payload: null });
        //User logged out
      }
    });
  }, []);

  const [{}, dispatch] = useStateValue();

  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/orders">
            <Header />
            <Orders />
          </Route>
          <Route path="/payment">
            <Header />
            <Elements stripe={promise}>
              <Payment />
            </Elements>
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/checkout">
            <Header />
            <Checkout />
          </Route>
          <Route path="/">
            <Header />
            <ImageSlider />
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
