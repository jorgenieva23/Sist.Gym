import React, { useEffect } from "react";
import { useAppSelector } from "../../redux/hooks";
import { Footer, Navbar, Sidebar } from "../../components";
import MovementTable from "../../components/Tables/movementTable/MovementTable";
import { useMovementAction } from "../../redux/Actions/movementActions";

export const Movement: React.FC = (): JSX.Element => {
  const { getAllMovement } = useMovementAction();
  const movement = useAppSelector((state) => state.movement.movement);

  useEffect(() => {
    getAllMovement();
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200">
        <Sidebar />
        <div className="mt-8 m-2 rounded-lg bg-white border-4 border-t-gray-500 w-full">
          <div className="flex justify-between">
            <div className="text-3xl mt-2 text-blue-700  ml-7">Movements</div>
          </div>

          <div className="m-5">
            <MovementTable currentMovement={movement} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
