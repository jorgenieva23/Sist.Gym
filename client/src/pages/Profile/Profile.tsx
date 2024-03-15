import React from "react";
import { useAppSelector } from "../../redux/hooks";

export const Profile: React.FC = (): JSX.Element => {
  const { users } = useAppSelector((state) => state.user);
  const user = users[0]; // Selecciona el primer usuario del array

  return (
    <div>
      {user && (
        <>
          <figure>{user.email.charAt(0).toUpperCase()}</figure>
          <span>
            Welcome <strong>{user.email}!</strong> You can view this page
            because you're logged in
          </span>
        </>
      )}
    </div>
  );
};
