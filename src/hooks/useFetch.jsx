import { useEffect, useState } from "react";

export function useFetch(url, method = "GET") {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(null);
  const postData = (newRecept) => {
    setParams({
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecept),
    });
  };
  useEffect(() => {
    const fetchData = async (params) => {
      setIsPending(true);
      try {
        const req = await fetch(url, params);
        if (!req.ok) {
          throw new Error("404: Page not found.Maybe it's on vacation");
        }
        const response = await req.json();
        setData(response);
        setIsPending(false);
      } catch (err) {
        setIsPending(false);
        setError(err.message);
        console.log(err.message);
      }
    };
    if (params && method == "POST") {
      fetchData(params);
    }
    if (method == "GET") {
      fetchData();
    }
  }, [url, method, params]);

  return { data, isPending, error, postData };
}
