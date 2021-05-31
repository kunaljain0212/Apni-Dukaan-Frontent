import React from "react";
import { Card, Button } from "react-bootstrap";
import ImageApiCall from "./ImageApiCall";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";
import { useState } from "react";
import { useEffect } from "react";
import { Product } from "../interfaces/adminInterfaces";
import { LocalStorageCart, StorageCartItem } from "../interfaces/coreInterfaces";

interface IProps {
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
  reload?: boolean;
  product: Product;
  addToCart?: boolean;
  removeFromCart?: boolean;
}

const ReusableCard: React.FC<IProps> = ({
  product,
  addToCart = true,
  removeFromCart = false,
  setReload = (f) => f,
  reload = undefined,
}) => {
  const [description, setDescription] = useState(true);
  const [count, setCount] = useState(0);
  // const [incart, setIncart ] = useState(false)

  const getCount = () => {
    let cart: LocalStorageCart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart")!);
        const index = cart.findIndex((value: StorageCartItem) => value.item._id === product._id);
        // console.log("index = " + index);
        if (index !== -1) {
          setCount((prev) => (prev = cart[index].count));
          // localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    }
  };
  //  console.log(product)
  useEffect(() => {
    // console.log("I ran CARD");
    getCount();
    showDescription();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log(count);

  const sendToCart = () => {
    addItemToCart(product);
    getCount();
  };

  const removeItFromCart = () => {
    removeItemFromCart(product);
    getCount();
  };

  // console.log(count);

  const showAddToCart = (addToCart: boolean) => {
    return (
      addToCart && (
        <div className="d-flex">
          <Button
            onClick={() => {
              sendToCart();
              setReload(!reload);
            }}
            variant="success"
            className="p-1 m-1 form-control"
          >
            Add to Cart
          </Button>

          {count !== 0 && (
            <div>
              <p className="btn btn-warning rounded m-1 p-1 form-control">
                {count}
              </p>
            </div>
          )}
        </div>
      )
    );
  };
  const showRemoveFromCart = (removeFromCart: boolean) => {
    return (
      removeFromCart && (
        <div>
          <br />
          <Button
            onClick={() => {
              removeItFromCart();
              setReload(!reload);
            }}
            variant="danger"
            className="p-1 form-control"
          >
            Remove from Cart
          </Button>
        </div>
      )
    );
  };
  const showDescription = () => {
    setDescription((prev) => !prev);
  };

  // const handleDescription = () => !description;

  // console.log(description);

  return (
    <Card className="text-dark rounded shadow" style={{ height: "100%" }}>
      <Card.Title className="bg-info rounded text-white p-2">
        {product.name}
      </Card.Title>
      <div className="d-flex justify-content-center p-2">
        <ImageApiCall product={product} />
      </div>
      <Card.Body>
        {description && <Card.Text>{product.description}</Card.Text>}
        <p className="btn btn-info rounded  btn-sm px-4">
          {product.category.name}
        </p>
        <br />
        <p
          onClick={showDescription}
          className="btn btn-info rounded  btn-sm px-4"
        >
          Show Description
        </p>
        <br />
        <p className="btn btn-info rounded  btn-sm px-4">₹ {product.price}</p>
      </Card.Body>
      <Card.Footer>
        {showAddToCart(addToCart)}
        {showRemoveFromCart(removeFromCart)}
      </Card.Footer>
    </Card>
  );
};

export default ReusableCard;
