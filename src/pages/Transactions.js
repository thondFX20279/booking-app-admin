import React from "react";
import "./Home.css";
import useFetch from "../hooks/useFetch";
const Transactions = () => {
  const { data: transactions } = useFetch("/transactions");
  const formatDate = (date) => {
    return date.split("T")[0].split("-").join("/");
  };
  const getLatedName = (fullname) => {
    const name = fullname.split(" ").pop();
    return name;
  };
  return (
    <div className="home">
      <div className="latestTransaction">
        <h3>Transactions List</h3>
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
                  <td>{tr?._id}</td>
                  <td>{getLatedName(tr?.user?.fullName)}</td>
                  <td>{tr.hotel.name}</td>
                  <td>{tr.room.join(",")}</td>
                  <td>
                    {formatDate(tr?.dateStart)}-{formatDate(tr?.dateEnd)}
                  </td>
                  <td>{tr?.price}</td>
                  <td>{tr?.payment}</td>
                  <td>
                    <span className={`btn ${tr?.status}`}>{tr?.status}</span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
