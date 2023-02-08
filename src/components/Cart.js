import React from "react";

const Cart = (props) => {
  const { quantity = 0 } = props;
  return (
    <div className="cart indigo darken-2 white-text">
      <i className="material-icons">add_shopping_cart</i>
      {quantity ? <span className="cart-quantity">{quantity}</span> : null}
    </div>
  );
};

export default Cart;
