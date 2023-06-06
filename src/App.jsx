import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Products from "./store/products";
import { observer } from "mobx-react-lite";

import { Home } from "./components/Home";
import { Header } from "./components/Header";
import { Cart } from "./components/Cart";
import { Basket } from "./components/Basket";
import { NotFound } from "./components/NotFound";

function App() {
  useEffect(() => {
    Products.getProducts();
  }, []);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/products" element={<Home />} />
        <Route path="/products/:id" element={<Cart />} />
        <Route path="/basket" element={<Basket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default observer(App);
