import React, { useState, useEffect } from "react";
import "./Payment.css";
import { Link, useHistory } from "react-router-dom";
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "../../utils/StateProvider";
import BasketItem from "../BasketItem/BasketItem";
import { getTotal, actions } from "../../utils/reducer";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "../../utils/axios";
import { db } from "../../utils/firebase";

const Payment = () => {
  const [{ basket, user }, dispatch] = useStateValue();
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  const [clientSecret, setClientSecret] = useState(true);
  const [processing, setProcessing] = useState("");
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    const getClientSecret = async () => {
      const response = await axios({
        method: "post",
        url: `/payments/create?total=${getTotal(basket) * 100}`, //stripes expects payments in subcurrencies (paisa)
      });
      setClientSecret(response.data.clientSecret);
    };
    getClientSecret();
  }, []);

  console.log("[Payment.js] The secret is ", clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then((response) => {
        // console.log(response);
        db.collection("users")
          .doc(user?.uid)
          .collection("orders")
          .doc(response.paymentIntent.id)
          .set({
            basket: basket,
            amount: response.paymentIntent.amount,
            created: response.paymentIntent.created,
          });
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        dispatch({ type: actions.emptyBasket });

        history.replace("/orders");
      });
  };

  const changeHandler = (event) => {
    setDisabled(event.empty);
    setError(event.empty ? event.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items</Link>)
        </h1>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Delivery Address </h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>403, Media Times Apartments Abhay Khand - 4</p>
            <p> Indirapuram, Ghaziabad, Uttar Pradesh </p>
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <BasketItem
                key={Math.random()}
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={changeHandler} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => <h3> Order Total: {value} </h3>}
                  decimalScale={2}
                  value={getTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
                <button
                  className="payment__init"
                  disabled={processing || disabled || succeeded}
                >
                  <span>{processing ? <p>Processing</p> : <p>Buy Now</p>}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
