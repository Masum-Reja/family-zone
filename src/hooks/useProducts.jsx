import { useEffect, useState } from "react";
const useProducts = (url) => {
  const [files, setdata] = useState(null);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState("");
  useEffect(() => {
    const url = "https://family-server.malihatabassum.com/products";
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        seterror(data.error);
        setdata(data);
        setloading(false);
      });
  }, [url]);
  return { files, loading, error };
};
export default useProducts;
