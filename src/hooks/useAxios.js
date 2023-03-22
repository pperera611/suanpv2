import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (method, apiRoute, options = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const result = await axios({
        method,
        url: `https://suanp-f6399-default-rtdb.firebaseio.com/${apiRoute}.json`,
        ...options,
      });
      setResponse(result.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };
  const postData = async (postOptions = {}) => {
    try {
      setLoading(true);
      const result = await axios({
        method: "post",
        url: `https://suanp-f6399-default-rtdb.firebaseio.com/${apiRoute}.json`,
        ...options,
        ...postOptions,
      });
      setResponse(result.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, apiRoute, JSON.stringify(options)]);

  return {response, error, loading, postData };
};



export default useAxios;
