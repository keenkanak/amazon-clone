export const initialState = {
  basket: [],
  user: null,
};

// export const getBasketTotal = (basket) => {
//   basket?.reduce((amount, item) => item.price + amount, 0);
// };

export const getTotal = (basket) => {
  let sum = 0;
  for (var i = 0; i < basket.length; i++) {
    sum = sum + basket[i].price;
  }
  return sum;
};

export const actions = {
  addToBasket: "ADD_TO_BASKET",
  removeFromBasket: "REMOVE_FROM_BASKET",
  setUser: "SET_USER",
  emptyBasket: "EMPTY_BASKET",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.addToBasket:
      // console.log(action);
      // console.log(state.basket);
      return {
        ...state,
        basket: [...state.basket, action.item],
      };
    case actions.removeFromBasket:
      const idx = state.basket.findIndex((item) => item.id === action.payload);
      let newBasket = [...state.basket];
      if (idx >= 0) {
        newBasket.splice(idx, 1);
        state.basket.filter((item) => item.id !== action.payload);
      } else {
        console.warn(
          `Can't remove product ${action.id} as it's not in the basket`
        );
      }
      return { ...state, basket: newBasket };
    case actions.setUser:
      return {
        ...state,
        user: action.payload,
      };
    case actions.emptyBasket:
      return {
        ...state,
        basket: [],
      };

    default:
      return state;
  }
};

export default reducer;
