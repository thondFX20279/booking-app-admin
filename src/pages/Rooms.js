import React from "react";
import "./Rooms.css";
import useFetch from "../hooks/useFetch";
import axiosClient from "../api/axiosClient";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Rooms = () => {
  const { dispatch } = useAuth();
  const { data: rooms, reFetch } = useFetch("/rooms?limit=8");
  const navigate = useNavigate();

  const deleteRoom = async (roomId) => {
    try {
      const confirm = window.confirm("Are you sure?");
      if (confirm) {
        const res = await axiosClient.delete(`/rooms/${roomId}`);
        if (res.status === 204) {
          alert(`Success!. Room deleted`);
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

  const editRoom = (roomId) => {
    navigate(`/edit-room/${roomId}`);
  };

  return (
    <div className="rooms">
      <div className="RoomsList">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>Rooms List</h3>
          <button className="btn" onClick={() => navigate("/create-room")}>
            Add new
          </button>
        </div>
        <table className="table">
          <thead className="thead">
            <tr>
              <td>#</td>
              <td>ID</td>
              <td>Title</td>
              <td>Description</td>
              <td>Price</td>
              <td>Max People</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody className="tbody">
            {rooms.length !== 0 &&
              rooms.map((room, i) => (
                <tr key={room._id}>
                  <td>{i + 1}</td>
                  <td>{room._id}</td>
                  <td>{room.title}</td>
                  <td>{room.desc}</td>
                  <td>{room.price}</td>
                  <td>{room.maxPeople}</td>
                  <td>
                    <div className="roomActions">
                      <button className="btn delete-btn" onClick={() => deleteRoom(room._id)}>
                        Delete
                      </button>
                      <button className="btn edit-btn" onClick={() => editRoom(room._id)}>
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

export default Rooms;
