import { useEffect, useState } from "react";
import useAuth from "./useAuth";
const useAccessRoom = (url) => {
  const [data, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const { user } = useAuth();
  useEffect(() => {
    const url = "https://family-server.malihatabassum.com/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        seterror(data.error);
        setdata(data);
        setloading(false);
      });
  }, [url]);
  const founds = data
    ?.filter((el) => el.email === user.email)
    .map((data) => data.roomKeys);

  const roomAccessKey = founds;
  return { roomAccessKey, loading, error };
};
export default useAccessRoom;
