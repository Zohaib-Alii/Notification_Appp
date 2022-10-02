import React from "react";

const Navbar = ({ name }) => {
  return (
    <div className="navbar">
      <p className="navHeading">Welcome {name}</p>
    </div>
  );
};

export default Navbar;
