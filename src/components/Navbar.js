import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faTachometerAlt,
  faList,
  faPlus,
  faUser,
  faSignOutAlt,
  faHotel,
  faBed,
} from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css";

import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const Navbar = () => {
  const { dispatch } = useAuth();
  return (
    <div className="navbar">
      <ul className="main-list">
        <li>
          <FontAwesomeIcon icon={faTachometerAlt} /> Main
          <ul className="sub-list">
            <li>
              <NavLink
                to={"/"}
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faTachometerAlt} /> Dash Board
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <FontAwesomeIcon icon={faList} /> LIST
          <ul className="sub-list">
            <li>
              <NavLink
                to={"/hotels"}
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faHotel} /> Hotels
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/transactions"}
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faList} /> Transactions
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/rooms"}
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faBed} /> Rooms
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <FontAwesomeIcon icon={faPlus} /> New
          <ul className="sub-list">
            <li>
              <NavLink
                to={"/create-hotel"}
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faHotel} /> New Hotel
              </NavLink>
            </li>
            <li>
              <NavLink
                to={"/create-room"}
                className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active" : "")}
              >
                <FontAwesomeIcon icon={faBed} /> New Room
              </NavLink>
            </li>
          </ul>
        </li>
        <li>
          <FontAwesomeIcon icon={faUser} /> User
          <ul className="sub-list">
            <li>
              <FontAwesomeIcon icon={faSignOutAlt} /> <span onClick={(e) => dispatch({ type: "LOGOUT" })}>Logout</span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
