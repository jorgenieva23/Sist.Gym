import { useState, useEffect, FC } from "react";
import Spinner from "../Spiner/Spiner";

interface LoadingOrNotFoundProps {
  hasPermission: boolean | undefined;
  Component: FC;
  NotFound: FC;
}

export const LoadingOrNotFound: FC<LoadingOrNotFoundProps> = ({
  hasPermission,
  Component,
  NotFound,
}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (hasPermission) {
    return <Component />;
  } else if (loading) {
    return <Spinner />;
  } else {
    return <NotFound />;
  }
};
