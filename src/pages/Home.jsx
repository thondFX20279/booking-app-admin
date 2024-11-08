import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faShoppingCart, faDollarSign, faBalanceScale } from "@fortawesome/free-solid-svg-icons"; // Import các icon cần thiết
import "./Home.css";
import useFetch from "../hooks/useFetch";
const Home = () => {
  const { data: transactions } = useFetch("/transactions?limit=8");
  const formatDate = (date) => {
    return date.split("T")[0].split("-").join("/");
  };
  const getLatedName = (fullname) => {
    const name = fullname.split(" ").pop();
    return name;
  };
  return (
    <div className="home">
      <div className="profit">
        <div className="profitItem">
          <h4 className="title">USERS</h4>
          <p className="number">100</p>
          <div className="icon">
            <FontAwesomeIcon icon={faUsers} style={{ backgroundColor: "rgb(255,204,204)", color: "rgb(231,76,103)" }} />
          </div>
        </div>
        <div className="profitItem">
          <h4 className="title">ORDERS</h4>
          <p className="number">100</p>
          <div className="icon">
            <FontAwesomeIcon
              icon={faShoppingCart}
              style={{ backgroundColor: "rgb(255,204,204)", color: "rgb(231,76,103)" }}
            />
          </div>
        </div>
        <div className="profitItem">
          <h4 className="title">EARNINGS</h4>
          <p className="number">$100</p>
          <div className="icon">
            <FontAwesomeIcon
              icon={faDollarSign}
              style={{ backgroundColor: "rgb(255,204,204)", color: "rgb(231,76,103)" }}
            />
          </div>
        </div>
        <div className="profitItem">
          <h4 className="title">BALANCE</h4>
          <p className="number">$100</p>
          <div className="icon">
            <FontAwesomeIcon
              icon={faBalanceScale}
              style={{ backgroundColor: "rgb(255,204,204)", color: "rgb(231,76,103)" }}
            />
          </div>
        </div>
      </div>
      <div className="latestTransaction">
        <h3>Latest transactions</h3>
        <table className="table">
          <thead className="thead">
            <tr>
              <td>#</td>
              <td>ID</td>
              <td>User</td>
              <td>Hotel</td>
              <td>Room</td>
              <td>Date</td>
              <td>Price</td>
              <td>Payment</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody className="tbody">
            {transactions.length !== 0 &&
              transactions.map((tr, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td>{tr._id}</td>
                  <td>{getLatedName(tr.user.fullName)}</td>
                  <td>{tr.hotel.name}</td>
                  <td>{tr.room.join(",")}</td>
                  <td>
                    {formatDate(tr.dateStart)}-{formatDate(tr.dateEnd)}
                  </td>
                  <td>{tr.price}</td>
                  <td>{tr.payment}</td>
                  <td>
                    <span className={`btn ${tr.status}`}>{tr.status}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
