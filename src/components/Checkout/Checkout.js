import React from "react";
import Subtotal from "../Subtotal/Subtotal";
import BasketItem from "../BasketItem/BasketItem";
import { useStateValue } from "../../utils/StateProvider";
import "./Checkout.css";

const Checkout = () => {
  const [{ basket }] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          className="checkout__ad"
          src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
          alt=""
        />
        <div>
          <h2 className="checkout__title">Your Shopping Basket</h2>

          {basket.map(({ id, title, price, rating, image }) => (
            <BasketItem
              key={Math.random()}
              id={id}
              title={title}
              price={price}
              rating={rating}
              image={image}
            />
          ))}
        </div>
      </div>
      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
};

export default Checkout;
