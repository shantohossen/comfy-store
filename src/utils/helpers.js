export const formatPrice = (price) => {
  return new Intl.NumberFormat("en-us", {
    style: "currency",
    currency: "USD",
  }).format(price / 100);
};

export const getUniqueValues = (products, type) => {
  let unique = products.map((product) => product[type]);

  if (type === "colors") {
    unique = unique.flat();
  }
  return ["all", ...new Set(unique)];
};
