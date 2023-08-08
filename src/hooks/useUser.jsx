import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useFetch from "./useFetch";
const useUser = (url) => {
  const [userData, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  const { user } = useAuth();
  const { roomData } = useFetch();
  const [d, setD] = useState();

  useEffect(() => {
    const url = "https://family-server.malihatabassum.com/users";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        seterror(data.error);
        setdata(data);
        // const m = data
        //   .filter((e) => e.email === user.email)
        //   .map((data) => data.roomKeys);

        // m?.map(function (r) {
        //   const b = [];
        //   // setD(b);
        //   roomData
        //     ?.filter((data) => data.roomKeys === r)
        //     .map((data) => b.push(data));
        // });
        // const found = data?.filter((el) => el.email === user.email);
        // found?.map(function (r) {
        //   const b = [];
        //   setdata(b);
        //   r.roomKeys?.map((d) =>
        //     roomData
        //       ?.filter((data) => data.roomKeys === d)
        //       .map((data) => b.push(data))
        //   );
        // });

        setloading(false);
      });
  }, [url]);
  return { userData, loading, error };
};
export default useUser;
