import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Container from "../../components/Container/Container";
import { getPartner } from "../../redux/partnerSlice";
import { Footer, Navbar, Sidebar } from "../../components";

export const Partner: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const partner = useAppSelector((state) => state.partner.filteredPartners);

  useEffect(() => {
    dispatch(getPartner());
  }, []);

  // useEffect(()=> {
  //   setCurrentPage(1)
  // }, [])

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow overflow-y-auto">
          {/* Aplicamos 'overflow-y-auto' para habilitar la barra de desplazamiento vertical */}
          <section className="max-w-md mx-auto p-4">
            {/* Agregamos 'max-w-md' para limitar el ancho del contenido */}
            <Container currentPartner={partner} />
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Partner;
