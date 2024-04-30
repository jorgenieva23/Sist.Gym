import { useState, useEffect } from "react";
import Spinner from "../Spiner/Spiner";
import { NotFound } from "../../pages";

export const LoadingComponent = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return <div>{loading ? <Spinner /> : <NotFound />}</div>;
};
