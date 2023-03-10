import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import GoodList from "./GoodList";
import { API_KEY, API_URL } from "../config";
import Cart from "./Cart";

const Shop = () => {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  console.log("order", order);
  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);

    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return item;
        }
      });
      setOrder(newOrder);
    }
  };

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.featured && setGoods(data.featured);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div className="container content">
        <Cart quantity={order.length} />
        {}
        {loading ? (
          <Loader />
        ) : (
          <GoodList goods={goods} addToBasket={addToBasket} />
        )}
      </div>
    </>
  );
};

export default Shop;
