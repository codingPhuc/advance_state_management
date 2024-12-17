import { useState } from "react";
import Product from "./components/Product.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";

function App() {
  //  initialize the cart items by  by assigning it a state
  // the reason for a state is to watch for when the cart change to rerender the component
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
  });

  function handleAddItemToCart(id) {
    // for each cart in the prevShopping
    //  this is similar to the count variable where it took the current count  and increment it
    // this is different it  change the list instead of incrementing the count
    setShoppingCart((prevShoppingCart) => {
      // this seem to be a small function to change the cart in some way
      const updatedItems = [...prevShoppingCart.items];
      // check if there is already the item in the cart
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === id
      );
      // check if there is an items in the cart
      // but why not just check existingCartItemIndex instead ?
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        // go though the product and add the new item to the cart
        const product = DUMMY_PRODUCTS.find((product) => product.id === id);
        updatedItems.push({
          id: id,
          name: product.title,
          price: product.price,
          quantity: 1,
        });
      }

      return {
        items: updatedItems,
      };
    });
  }

  function handleUpdateCartItemQuantity(productId, amount) {
    setShoppingCart((prevShoppingCart) => {
      const updatedItems = [...prevShoppingCart.items];
      const updatedItemIndex = updatedItems.findIndex(
        (item) => item.id === productId
      );

      const updatedItem = {
        ...updatedItems[updatedItemIndex],
      };

      updatedItem.quantity += amount;

      if (updatedItem.quantity <= 0) {
        updatedItems.splice(updatedItemIndex, 1);
      } else {
        updatedItems[updatedItemIndex] = updatedItem;
      }

      return {
        items: updatedItems,
      };
    });
  }

  const ctxValue = {
    items: shoppingCart.items,
    addItemsToCart: handleAddItemToCart,
    updateItemQuantity: handleUpdateCartItemQuantity,
  };

  // app compnent is a great place to wrap the context
  return (
    // get the properties  of the CartContext nested component
    // link the context to state
    <CartContext.Provider value={ctxValue}>
      <Header />
      {/* this will lead to a very bloated application  */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContext.Provider>
  );
}

export default App;
