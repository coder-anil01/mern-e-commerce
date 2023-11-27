import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  return (
    <div className="text-center">
      <h4>Dashbord</h4>
      <div className="list-group">
        <NavLink
          to="/dashbord/user/profile"
          className="list-group-item list-group-item-action">
          Profile
        </NavLink>
        <NavLink
          to="/dashbord/user/order"
          className="list-group-item list-group-item-action">
          Orders
        </NavLink>
      </div>
    </div>
  );
};

export default UserMenu;
