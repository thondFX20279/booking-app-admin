import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import useFetch from "../hooks/useFetch";
import "./NewRoom.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewRoom = () => {
  const { user, dispatch } = useAuth();

  const navigate = useNavigate();
  const { data: hotels } = useFetch(`/hotels?isAdmin=${user.isAdmin}`);
  const [roomData, setRoomData] = useState({
    title: "",
    desc: "",
    price: "",
    maxPeople: "",
    hotelId: "",
    roomNumbers: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const roomNumbersArray = roomData.roomNumbers.split(",").map((num) => num.trim());

    const newRoom = {
      ...roomData,
      roomNumbers: roomNumbersArray,
    };

    try {
      const res = await axiosClient.post(`/rooms/${newRoom.hotelId}`, newRoom);
      if (res.status === 200) {
        alert("Room added successfully!");
        navigate("/rooms");
      }
    } catch (error) {
      const status = error.response?.data?.status;
      const message = error.response?.data?.message;
      if (status === 403) {
        alert("Login time out. Please Login again");
        dispatch({ type: "LOGOUT" });
      } else {
        alert(`Failed!. ${message}`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="newRoom">
          <div>
            <div className="form-controls">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Room title"
                value={roomData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="desc">Description</label>
              <input
                type="text"
                name="desc"
                placeholder="Description"
                value={roomData.desc}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div className="form-controls">
              <label htmlFor="price">Price</label>
              <input
                type="number"
                name="price"
                placeholder="Price"
                value={roomData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="maxPeople">Max People</label>
              <input
                type="number"
                name="maxPeople"
                placeholder="Max people"
                value={roomData.maxPeople}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>
        <div className="roomsPart2">
          <div className="form-controls">
            <label htmlFor="hotelId">Choose a Hotel</label>
            <select name="hotelId" value={roomData.hotelId} onChange={handleChange} required>
              <option value="">Select a hotel</option>
              {hotels.map((hotel) => (
                <option key={hotel._id} value={hotel._id}>
                  {hotel.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-controls">
            <label htmlFor="roomNumbers">Room Numbers</label>
            <input
              type="text"
              name="roomNumbers"
              placeholder="Comma separated room numbers"
              value={roomData.roomNumbers}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="submit-btn">
              Send
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewRoom;
