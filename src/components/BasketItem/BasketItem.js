import React from "react";
import "./BasketItem.css";
import { actions } from "../../utils/reducer";
import { useStateValue } from "../../utils/StateProvider";

const BasketItem = ({ id, title, price, rating, image, hideButton }) => {
  const removeItemHandler = () => {
    dispatch({ type: actions.removeFromBasket, payload: id });
  };
  const [{}, dispatch] = useStateValue();

  return (
    <div className="checkoutItem">
      <img className="checkoutItem__image" src={image} alt="" />
      <div className="checkoutItem__details">
        <p className="checkoutItem__title">
          <h5>{title}</h5>
        </p>
        <p className="checkoutItem__price">
          <strong>$</strong>
          <small>{price}</small>
        </p>
        <div className="checkoutItem__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>⭐</p>
            ))}
        </div>
        {!hideButton && (
          <button className="checkoutItem__remove" onClick={removeItemHandler}>
            Remove from Basket
          </button>
        )}
      </div>
    </div>
  );
};

export default BasketItem;
