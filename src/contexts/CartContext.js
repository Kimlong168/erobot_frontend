import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    // Load cart items from localStorage if available
    const storedItems = localStorage.getItem("cartItems");
    if (storedItems) {
      setCartItems(JSON.parse(storedItems));
    }
  }, []); // Run once on client side

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      localStorage.removeItem("cartItems");
    }
  }, [cartItems]);

  // add item and increate quantity
  const addItemOrIncreaseQuantity = (item, quantity = 1) => {
    // check if categoryName is undefined
    if (item.categoryName === undefined) {
      item.categoryName = "No Category";
    }
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => String(i.id).toLowerCase() == String(item.id).toLowerCase()
      );

      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + parseInt(quantity) }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: quantity }];
    });
  };

  // remove item
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((i) => i.id !== id));
  };

  // const increaseQuantity = (id) => {
  //   setCartItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      (prevItems) =>
        prevItems
          .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0) // Remove items with quantity 0
    );
  };

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    if (cartItems.length === 0) return 0;
    return cartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addItemOrIncreaseQuantity,
        removeItem,
        decreaseQuantity,
        updateQuantity,
        clearCart,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
