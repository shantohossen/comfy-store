import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "./components";
import {
  Home,
  About,
  Cart,
  Checkout,
  Error,
  PrivateRoute,
  Products,
  SingleProducts,
  AuthWrapper,
} from "./pages";
function App() {
  return (
    <AuthWrapper>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/about" exact>
            <About />
          </Route>
          <Route path="/cart" exact>
            <Cart />
          </Route>
          <PrivateRoute path="/checkout" exact>
            <Checkout />
          </PrivateRoute>
          <Route path="/products" exact>
            <Products />
          </Route>
          <Route path="/products/:id" children={<SingleProducts />} />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </Router>
    </AuthWrapper>
  );
}

export default App;
