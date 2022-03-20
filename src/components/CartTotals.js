import React from "react";
import styled from "styled-components";
import { useCartContext } from "../context/cart_context";
import { useUserContext } from "../context/user_context";
import { formatPrice } from "../utils/helpers";
import { Link } from "react-router-dom";

const CartTotals = () => {
  const { isLogin, loginWithRedirect } = useUserContext();

  const { total_price, shipping_fee } = useCartContext();
  return (
    <Wrapper>
      <div>
        <article>
          <h5>
            Subtotal: <span>{formatPrice(total_price)}</span>
          </h5>
          <p>
            Shipping fee: <span> {formatPrice(shipping_fee)}</span>
          </p>
          <hr />
          <h4>
            oreder total: <span>{formatPrice(total_price + shipping_fee)}</span>
          </h4>
        </article>
        {isLogin ? (
          <Link className="btn" to="/checkout">
            continue to checkout
          </Link>
        ) : (
          <button type="button" className="btn" onClick={loginWithRedirect}>
            login to checkout
          </button>
        )}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  article {
    border: 1px solid var(--clr-grey-8);
    border-radius: var(--radius);
    padding: 1.5rem 3rem;
  }
  h4,
  h5,
  p {
    display: grid;
    grid-template-columns: 200px 1fr;
  }
  p {
    text-transform: capitalize;
  }
  h4 {
    margin-top: 2rem;
  }
  @media (min-width: 776px) {
    justify-content: flex-end;
  }
  .btn {
    width: 100%;
    margin-top: 1rem;
    text-align: center;
    font-weight: 700;
  }
`;

export default CartTotals;
