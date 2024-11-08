import React from "react";
import "./Hotel.css";
import useFetch from "../hooks/useFetch";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Hotel = () => {
  const { user, dispatch } = useAuth();
  const { data: hotels, reFetch } = useFetch(`/hotels?limit=8&isAdmin=${user.isAdmin}`);

  const navigate = useNavigate();
  const deleteHotel = async (hotelId) => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (confirm) {
        const res = await axiosClient.delete(`/hotels/${hotelId}`);
        if (res.status === 200) {
          alert(`Success!. ${res.data.message}`);
          reFetch();
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || error.response?.message;
      const status = error.response?.data?.status || error.response?.status;
      if (status === 403) {
        alert("Login time out. Please Login again");
        dispatch({ type: "LOGOUT" });
      }
      if (status === 400) {
        alert(`Failed!. ${message}`);
      }
      if (status === 500) {
        alert("Internal Sever Error");
      }
      if (status === 404) {
        alert("Page not Found");
      }
    }
  };

  return (
    <div className="hotels">
      <div className="HotelsList">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Hotels List</h3>
          <button className="btn" onClick={(e) => navigate("/create-hotel")}>
            Add new
          </button>
        </div>
        <table className="table">
          <thead className="thead">
            <tr>
              <td>#</td>
              <td>ID</td>
              <td>Name</td>
              <td>Type</td>
              <td>Title</td>
              <td>City</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className="tbody">
            {hotels.length !== 0 &&
              hotels.map((hotel, i) => (
                <tr key={hotel._id}>
                  <td>{i + 1}</td>
                  <td>{hotel._id}</td>
                  <td>{hotel.name}</td>
                  <td>{hotel.type}</td>
                  <td>{hotel.title}</td>
                  <td>{hotel.city}</td>
                  <td>
                    <div className="hotelActions">
                      <button className="btn delete-btn" onClick={(e) => deleteHotel(hotel._id)}>
                        Delete
                      </button>
                      <button className="btn edit-btn" onClick={() => navigate(`/edit-hotel/${hotel._id}`)}>
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Hotel;
