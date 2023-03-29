import { useState, useEffect } from "react";
import axios from "axios";
import { auth } from "../auth/firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

const useAxios = (method, apiRoute, options = {}, reloadFlag = false) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, ] = useAuthState(auth);

  const getUrlWithAuth = async (url) => {
    const token = await user.getIdToken();
    return `${url}?auth=${token}`;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      if (method === "GET") {
        const url = await getUrlWithAuth(`https://suanp-f6399-default-rtdb.firebaseio.com/${apiRoute}.json`);
        const result = await axios({
          method,
          url,
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
  };

  const postData = async (postOptions = {}) => {
    try {
      setLoading(true);
      const url = await getUrlWithAuth(`https://suanp-f6399-default-rtdb.firebaseio.com/${apiRoute}.json`);
      const result = await axios({
        method: "post",
        url,
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
      const url = await getUrlWithAuth(`https://suanp-f6399-default-rtdb.firebaseio.com/${apiRoute}/${id}.json`);
      const result = await axios({
        method: "put",
        url,
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
    if (user) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, apiRoute, JSON.stringify(options), reloadFlag, user]);

  return { response, error, loading, postData, putData };
};

export default useAxios;
