import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";

function ProductDetails() {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setProductDetails(product);
      });
    }
  }, [params.id, products]);

  if (productDetails.length === 0) return null;

  return (
    <>
      <div className="details">
        <img src={productDetails.images.url} alt="" />
        <div className="box_detail">
          <div className="row">
            <h2>{productDetails.title}</h2>
            <h6>#id: {productDetails.product_id}</h6>
          </div>
          <span>$ {productDetails.price}</span>
          <p>{productDetails.description}</p>
          <p>{productDetails.content}</p>
          <p>Sold: {productDetails.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(ProductDetails)}
          >
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === productDetails.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </>
  );
}

export default ProductDetails;