import axios from "axios";
import { useState } from "react";

export default function ApiHook() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const request = (endpoint: string, method: string, data?: object) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      setError(undefined);
      await axios({
        method: method,
        url: `${process.env.NEXT_PUBLIC_BACKEND_API}${endpoint}`,
        data: data,
      })
        .then((response) => {
          console.log({ response });
          setLoading(false);
          resolve(response.data);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
          reject(err);
        });
    });
  };

  const locationRequest = (date: Date) => {
    return request("/request", "POST", {
      datetime: date.toISOString(),
    });
  };

  return {
    locationRequest,
    loading,
    error,
  };
}
