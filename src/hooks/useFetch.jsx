import { useEffect, useState } from "react";
const useFetch = (url) => {
  const [roomData, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  useEffect(() => {
    const url = "https://family-server.malihatabassum.com/rooms";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        seterror(data.error);
        setdata(data);
        setloading(false);
      });
  }, [url]);
  return { roomData, loading, error };
};
export default useFetch;
