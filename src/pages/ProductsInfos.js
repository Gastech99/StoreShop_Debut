import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { doc, getDoc } from "firebase/firestore";
import fireDB from "../Firebase";
import { useParams } from "react-router-dom";

function ProductsInfos() {
  const [product, setProduct] = useState();
  const params = useParams();
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const productTemp = await getDoc(
        doc(fireDB, "produits", params.productid)
      );
      console.log(productTemp.data());
      setProduct(productTemp.data());
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            {product && (
              <div>
                <h1>
                  <b>{product.name}</b>
                </h1>
                <img
                  src={product.imageUrl}
                  alt="image"
                  className="product-infos-img"
                />
                <hr></hr>
                <p>{product.description}</p>
                <div className="d-flex justify-content-end my-3">
                  <button>Acheter</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProductsInfos;
