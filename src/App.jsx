import Product from "./components/Product.jsx";
import { CartContext } from "./store/shopping-cart-context.jsx";
import Header from "./components/Header.jsx";
import Shop from "./components/Shop.jsx";
import { DUMMY_PRODUCTS } from "./dummy-products.js";
import CartContextProvider from "./store/shopping-cart-context.jsx";
function App() {
  // app compnent is a great place to wrap the context
  return (
    // get the properties  of the CartContext nested component
    // link the context to state
    <CartContextProvider>
      <Header />
      {/* this will lead to a very bloated application  */}
      <Shop>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </CartContextProvider>
  );
}

export default App;
