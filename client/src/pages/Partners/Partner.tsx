import React, {useEffect}from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Container from "../../components/Container/Container";
import { getPartner } from "../../redux/partnerSlice";
import { Footer, Navbar, Sidebar } from "../../components";

export const Partner: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch()
  const partner = useAppSelector((state) => state.partner.filteredPartners);

  useEffect(()=> {
    dispatch(getPartner())
  },[])

  // useEffect(()=> {
  //   setCurrentPage(1)
  // }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="">
          <section className="">
            <Container currentPartner={partner}/>
          </section>
        </div>
      </div>
      <Footer />
    </div>
  );
};
 export default Partner