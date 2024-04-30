import React from "react";
import { EnConstruccion } from "../../components/EnConstruccion/EnConstruccion";

export const NotFound: React.FC = (): JSX.Element => {
  return (
    <div className="flex flex-col max-h-screen">
      <div className="">
        <EnConstruccion showVolver={true} />
      </div>
    </div>
  );
};
