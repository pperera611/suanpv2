import { useState, useEffect } from "react";
import axios from "axios";

const useAxios = (method, apiRoute, options = {},reloadFlag = false) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
   
      try {
        setLoading(true);
        if (method === "GET") {
          const result = await axios({
            method,
            url: `https://suanp-f6399-default-rtdb.firebaseio.com/${apiRoute}.json`,
            ...options,
          });
          
          setResponse(result.data);
          setError(null);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    //} 
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

  const putData = async (id, putOptions = {}) => {
    try {
      setLoading(true);
      const result = await axios({
        method: "put",
        url: `https://suanp-f6399-default-rtdb.firebaseio.com/${apiRoute}/${id}.json`,
        ...options,
        ...putOptions,
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
  }, [method, apiRoute, JSON.stringify(options),reloadFlag]);

  return {response, error, loading, postData, putData };
};

export default useAxios;
