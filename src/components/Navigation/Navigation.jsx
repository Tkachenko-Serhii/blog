import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav>
      <NavLink to='/' className='link'>
        Home
      </NavLink>
      <NavLink to='/create' className='link'>
        Add post
      </NavLink>
    </nav>
  );
};

export default Navigation;
