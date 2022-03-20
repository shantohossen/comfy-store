import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useProductsContext } from "../context/products_context";
import { single_product_url as url } from "../utils/constants";
import { formatPrice } from "../utils/helpers";
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from "../components";
import styled from "styled-components";
import { Link } from "react-router-dom";

const SingleProductPage = () => {
  const { id } = useParams();
  const history = useHistory();
  const {
    fetchSingleProduct,
    single_product_loading: loading,
    single_product_data: data,
    singel_product_error: error,
  } = useProductsContext();

  const getBack = () => {
    if (error) {
      setTimeout(() => {
        return history.push("/");
      }, 3000);
    }
  };
  useEffect(() => {
    getBack();
    // eslint-disable-next-line
  }, [error]);
  useEffect(() => {
    fetchSingleProduct(`${url}${id}`);
    // eslint-disable-next-line
  }, [id]);

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }
  const {
    name,
    price,
    company,
    reviews,
    stars,
    stock,
    description: dis,
    images,
  } = data;
  return (
    <Wrapper>
      <PageHero title={name} product />
      <div className="section section-center page">
        <Link to="/products" className="btn">
          Back to products
        </Link>
        <div className="product-center">
          <ProductImages images={images} />

          <div className="content">
            <h2>{name}</h2>
            <Stars stars={stars} review={reviews} />
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="disc">{dis}</p>
            <p className="info">
              <span> aviable:</span> {stock > 0 ? stock : "out of stock"}
            </p>
            <p className="info">
              <span>SKU:</span> {id}
            </p>
            <p className="info">
              <span>Brand:</span> {company}
            </p>
            {stock > 1 && <AddToCart data={data} />}
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`;

export default SingleProductPage;
