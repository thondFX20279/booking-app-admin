import axiosClient from "../api/axiosClient";
import { useEffect } from "react";
import { useState } from "react";
const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosClient.get(url);
        setData(res.data);
      } catch (error) {
        setError(error.response);
      }
      setLoading(false);
    };
    fetchData();
  }, [url]);
  const reFetch = async () => {
    setLoading(true);
    try {
      const res = await axiosClient.get(url);
      setData(res.data);
    } catch (error) {
      setError(error.response);
    }
    setLoading(false);
  };
  return { data, setData, loading, error, reFetch };
};
export default useFetch;
