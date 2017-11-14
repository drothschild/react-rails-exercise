import React from "react";
import AppBar from "material-ui/AppBar";
import FlatButton from "material-ui/FlatButton";

const Header = () => (
  <AppBar
    title="React and Rails"
    iconElementRight={
      <div>
        <FlatButton label="Brands" href="/brands" />
        <FlatButton label="Products" href="/products" />
      </div>
    }
  />
);

export default Header;
