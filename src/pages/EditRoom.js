import React from "react";
import axiosClient from "../api/axiosClient";
import useFetch from "../hooks/useFetch";
import "./NewRoom.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";

const EditRoom = () => {
  const { roomId } = useParams();

  const { dispatch } = useAuth();
  const navigate = useNavigate();

  const { data: roomData, setData: setRoomData } = useFetch(`/rooms/${roomId}`);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRoomData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let roomNumbersArray = roomData.roomNumbers;
    if (!Array.isArray(roomData.roomNumbers)) {
      roomNumbersArray = roomData.roomNumbers.split(",").map((num) => num.trim());
    }
    const newRoom = {
      ...roomData,
      roomNumbers: roomNumbersArray,
    };

    try {
      const res = await axiosClient.put(`/rooms/${roomId}`, newRoom);
      if (res.status === 200) {
        alert("Room update successfully!");
        navigate("/rooms");
      }
    } catch (error) {
      const status = error.response?.data?.status || error.response?.status;
      if (status === 403) {
        alert("Login time out. Please Login again");
        dispatch({ type: "LOGOUT" });
      } else {
        alert(`Failed!`);
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

export default EditRoom;
