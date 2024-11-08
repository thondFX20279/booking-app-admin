import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import useFetch from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
const EditHotel = () => {
  const { hotelId } = useParams();
  const { data: rooms } = useFetch("/rooms");
  const { data: hotelData, setData: setHotelData } = useFetch(`/hotels/find/${hotelId}`);

  const navigate = useNavigate();
  const { dispatch } = useAuth();
  useEffect(() => {
    if (rooms && rooms.length > 0) {
      setHotelData((prevData) => ({
        ...prevData,
        rooms: [rooms[0]._id],
      }));
    }
    if (hotelData?.photos) {
      if (hotelData.photos.length > 0 && Array.isArray(hotelData.photos)) {
        setHotelData((prev) => ({ ...prev, photos: hotelData.photos?.join(",") }));
      } else {
        if (hotelData.photos?.length === 0 && Array.isArray(hotelData.photos)) {
          setHotelData((pre) => ({ ...pre, photos: "" }));
        }
      }
    }
  }, [hotelData.photos]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHotelData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoomSelect = (e) => {
    const roomId = e.target.value;
    setHotelData((prevData) => {
      const isSelected = prevData.rooms.includes(roomId);
      const updatedRooms = isSelected ? prevData.rooms.filter((room) => room !== roomId) : [...prevData.rooms, roomId];

      return {
        ...prevData,
        rooms: updatedRooms,
      };
    });
  };

  const isRoomSelected = (roomId) => {
    if (!hotelData?.rooms) return false;
    return hotelData.rooms.includes(roomId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const photosArray = hotelData.photos.split(",").map((url) => url.trim());
    const newHotel = {
      ...hotelData,
      photos: photosArray,
      cheapestPrice: parseFloat(hotelData.cheapestPrice),
    };
    try {
      const res = await axiosClient.put(`/hotels/${hotelId}`, newHotel);
      if (res.status === 200) {
        alert("Hotel updated successfully!");
        navigate("/hotels");
      }
    } catch (error) {
      const status = error.response?.data?.status || error.response?.status;
      if (status === 403) {
        alert("Login time out. Please Login again");
        dispatch({ type: "LOGOUT" });
      } else {
        alert(`Failed`);
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="newHotel">
          <div>
            <div className="form-controls">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Hotel name"
                value={hotelData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="city">City</label>
              <input
                type="text"
                name="city"
                placeholder="City"
                value={hotelData.city}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="distance">Distance From Center</label>
              <input
                type="number"
                name="distance"
                placeholder="Distance in km"
                value={hotelData.distance}
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
                value={hotelData.desc}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="photos">Images Url</label>
              <input
                type="text"
                name="photos"
                placeholder="Image URLs (comma separated)"
                value={hotelData.photos}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <div className="form-controls">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                name="type"
                placeholder="Hotel type"
                value={hotelData.type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={hotelData.address}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={hotelData.title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="cheapestPrice">cheapestPrice</label>
              <input
                type="number"
                name="cheapestPrice"
                placeholder="cheapestPrice"
                value={hotelData.cheapestPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-controls">
              <label htmlFor="featured">Featured</label>
              <select name="featured" value={hotelData.featured} onChange={handleChange}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select>
            </div>
          </div>
        </div>
        <div className="roomType">
          <label htmlFor="rooms">Rooms: </label>
          <select
            multiple
            value={hotelData.rooms}
            onChange={handleRoomSelect}
            style={{ display: "block", width: "100%", padding: "8px 5px" }}
          >
            {rooms.map((room) => (
              <option
                key={room._id}
                value={room._id}
                className={isRoomSelected(room._id) ? "selected-room" : ""}
                style={{ display: "block", padding: "5px 0", margin: "4px 0" }}
              >
                {room.title}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Send
        </button>
      </form>
    </div>
  );
};

export default EditHotel;
