import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    // loading producs on filter context
    case LOAD_PRODUCTS:
      let maxPrice = action.payload.map((item) => item.price);
      maxPrice = Math.max(...maxPrice);
      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };
    case SET_GRIDVIEW:
      return { ...state, grid_view: true };
    case SET_LISTVIEW:
      return { ...state, grid_view: false };
    case UPDATE_SORT:
      return {
        ...state,
        sort: action.payload,
      };
    // sorting the products
    case SORT_PRODUCTS:
      const { sort, filtered_products } = state;
      let sortedProducts = [...filtered_products];
      if (sort === "price-lowest") {
        sortedProducts = filtered_products.sort((a, b) => a.price - b.price);
      }
      if (sort === "price-highest") {
        sortedProducts = filtered_products.sort((a, b) => b.price - a.price);
        console.log("hello from sort", sortedProducts);
      }
      if (sort === "name-a") {
        sortedProducts = filtered_products.sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "name-z") {
        sortedProducts = filtered_products.sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }
      return { ...state, filtered_products: sortedProducts };

    // updateing the state
    case UPDATE_FILTERS:
      const { name, value } = action.payload;
      return { ...state, filters: { ...state.filters, [name]: value } };

    // filtering the products
    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, price, color, shipping } = state.filters;
      let tempProducts = [...all_products];

      if (text) {
        tempProducts = tempProducts.filter((product) => {
          return product.name.toLowerCase().startsWith(text);
        });
      }
      if (category !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.category === category;
        });
      }

      if (company !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.company === company;
        });
      }

      if (color !== "all") {
        tempProducts = tempProducts.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }
      if (shipping) {
        tempProducts = tempProducts.filter(
          (product) => product.shipping <= true
        );
      }
      tempProducts = tempProducts.filter((product) => product.price <= price);
      return { ...state, filtered_products: tempProducts };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          text: "",
          category: "all",
          company: "all",
          color: "",
          min_price: 0,
          price: state.filters.max_price,
          shipping: false,
        },
      };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
