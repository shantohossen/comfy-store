import React from "react";
import styled from "styled-components";
import { PageHero, StripeCheckout } from "../components";
// extra imports
import { useCartContext } from "../context/cart_context";
import { Link } from "react-router-dom";

const Empty = () => {
  return (
    <div className="empty">
      <h2>Your Cart is Empty</h2>
      <Link to="/products" className="btn">
        Fill it
      </Link>
    </div>
  );
};
const CheckoutPage = () => {
  const { cart } = useCartContext();
  return (
    <main>
      <PageHero title="Checkout" />

      <Wrapper className="page">
        {cart.length < 1 ? <Empty /> : <StripeCheckout />}
      </Wrapper>
    </main>
  );
};
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  .empty {
    text-align: center;
  }
`;
export default CheckoutPage;
