import { useEffect, useState } from "react";
import useAuth from "./useAuth";
const useUniqueRoom = (url) => {
  const [uniqueRoomData, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const { user } = useAuth();

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
  return { uniqueRoomData, loading, error };
};
export default useUniqueRoom;
