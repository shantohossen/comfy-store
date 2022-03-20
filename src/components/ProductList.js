import React from "react";
import { useFilterContext } from "../context/filter_context";
import GridView from "./GridView";
import ListView from "./ListView";

const ProductList = () => {
  const { filtered_products: products, grid_view } = useFilterContext();
  if (!products) {
    return <h4>The products your re looking for is not found...</h4>;
  }
  if (!grid_view) {
    return <ListView products={products} />;
  }
  return <GridView products={products} />;
};

export default ProductList;
