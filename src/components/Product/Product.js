import React from "react";
import "./Product.css";
import { actions } from "../../utils/reducer";
import { useStateValue } from "../../utils/StateProvider";

const Product = ({ id, title, price, rating, image }) => {
  const dispatch = useStateValue()[1];

  const addToBasket = () => {
    dispatch({
      type: actions.addToBasket,
      item: {
        id,
        title,
        price,
        rating,
        image,
      },
    });
  };
  return (
    <div className="product">
      <div className="product__info">
        <p>{title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="product__rating">
          {Array(rating)
            .fill()
            .map(() => (
              <p>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt="Product" />
      <button onClick={addToBasket}>Add To Cart</button>
    </div>
  );
};

export default Product;
