import { createStore } from 'redux';

const initialState = {
  cartItems: []
};

function cartReducer(state = initialState, action) {

  switch(action.type) {
    case 'ADD_ITEM':
      return { ...state, cartItems: [...state.cartItems, {...action.payload, quantity: 1}] };

    case 'INC_ITEM':
      const updatedIncItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          return {...item, quantity: item.quantity + 1};
        }
        return item
      })
      return {...state, cartItems: [...updatedIncItems]};

    case 'DEC_ITEM':
      const updatedDecItems = state.cartItems.map((item) => {
        if (item.id === action.payload) {
          return {...item, quantity: item.quantity - 1};
        }
        return item     
      }).filter((item) => item.quantity > 0);
      return {...state, cartItems: [...updatedDecItems]};

    case 'REMOVE_ITEM':
      const updatedItems = state.cartItems.filter((item) => item.id !== action.payload)
      return {...state, cartItems: [...updatedItems]};

    case 'CLEAR_CART':
      return {...state, cartItems: []};
    default:
      return state;
  }

}

const store = createStore(cartReducer);

export default store