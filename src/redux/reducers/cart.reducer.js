import { cartConstants } from "../actions/constants";

const initialState = {
  basketNumber: 0,
  cartCost: 0,
  products: {},
  ordered: false,
};

const reducer = (state = initialState, action) => {
  let productSelected = {};
  switch (action.type) {
    case cartConstants.GET_CART_SUCCESS:
      const { basketNumber, products, cartCost } = action.payload;
      return {
        ...state,
        basketNumber: basketNumber,
        cartCost: cartCost,
        products: products,
      };

    case cartConstants.ADD_PRODUCT_BASKET:
      const product = action.payload.product;
      if (!state.products[product._id]) {
        productSelected = { ...state.products[product._id] };
        productSelected._id = product._id;
        productSelected.tagName = product.slug;
        productSelected.price = product.price;
        productSelected.images = product.images[0].url;
        productSelected.numbers = 1;
        productSelected.inCart = true;
      } else {
        productSelected = { ...state.products[product._id] };
        productSelected.numbers += 1;
      }
      return {
        ...state,
        basketNumber: state.basketNumber + 1,
        cartCost: state.cartCost + product.price,
        products: {
          ...state.products,
          [product._id]: productSelected,
        },
      };

    case cartConstants.INCREASE_QUANTITY:
      const name = action.payload.name;
      productSelected = { ...state.products[name] };
      productSelected.numbers += 1;
      return {
        ...state,
        basketNumber: state.basketNumber + 1,
        cartCost: state.cartCost + state.products[name].price,
        products: {
          ...state.products,
          [name]: productSelected,
        },
      };

    case cartConstants.DECREASE_QUANTITY:
      const id = action.payload.name;
      productSelected = { ...state.products[id] };

      if (productSelected.numbers - 1 === 0) {
        productSelected.numbers = 0;
        productSelected.inCart = false;
      } else {
        productSelected.numbers -= 1;
      }

      return {
        ...state,
        basketNumber: state.basketNumber - 1,
        cartCost: state.cartCost - state.products[id].price,
        products: {
          ...state.products,
          [id]: productSelected,
        },
      };

    case cartConstants.CLEAR_PRODUCT:
      const item = action.payload.name;
      productSelected = { ...state.products[item] };

      let numbersBackup = productSelected.numbers;
      productSelected.numbers = 0;
      productSelected.inCart = false;
      return {
        ...state,
        cartCost: state.cartCost - numbersBackup * productSelected.price,
        basketNumber: state.basketNumber - numbersBackup,
        products: {
          ...state.products,
          [item]: productSelected,
        },
      };

    case cartConstants.REMOVE_CART_SUCCESS:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default reducer;
