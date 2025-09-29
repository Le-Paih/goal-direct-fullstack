import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  function addToCart(item, size) {
    const itemId = `${item.id}_${size}`;
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.itemId === itemId
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex] = {
        ...updatedCartItems[existingItemIndex],
        quantity: updatedCartItems[existingItemIndex].quantity + 1,
      };
      setCartItems(updatedCartItems);
    } else {
      // Item doesn't exist in the cart, add it with quantity 1
      setCartItems([
        ...cartItems,
        { ...item, quantity: 1, size: size, itemId: itemId },
      ]);
    }
  }

  const removeFromCart = (itemToRemove) => {
    // Filter out the item with a matching id and size
    const updatedCartItems = cartItems.filter((item) => {
      // Check if both id and size are the same
      return !(item.id === itemToRemove.id && item.size === itemToRemove.size);
    });
    // Update the cart items state with the filtered array
    setCartItems(updatedCartItems);
  };

  function clearCart() {
    setCartItems([]);
  }

  function getCartTotal() {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  useEffect(
    function () {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    },
    [cartItems]
  );

  useEffect(function () {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      setCartItems(JSON.parse(cartItems));
    }
  }, []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
