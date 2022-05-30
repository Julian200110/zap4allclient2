import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductsModule from "./products/ProductsModule";
import UsersModule from "./users/UsersModule";
import SalesModule from "./sales/SalesModule";
import SalesModule2 from "./sales/SalesModule2";
import NavBar from "./NavBar";
import Home from "./Home";
import "./styles/Dashboard.css";

const Dashboard = () => {
  return (
    <Router>
      <div className="dashboard">
        <NavBar />
        <Switch>
          <Route path="/sales" component={SalesModule} />
          <Route path="/sales2" component={SalesModule2} />
          <Route path="/products" component={ProductsModule} />
          <Route path="/users" component={UsersModule} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    </Router>
  );
};

export default Dashboard;
