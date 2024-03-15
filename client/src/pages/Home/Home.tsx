import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Footer, Navbar, Sidebar } from "../../components";
import { useAppSelector } from "../../redux/hooks";
import { usePartnerAction } from "../../redux/Actions/partnerAction";

export const Home: React.FC = (): JSX.Element => {
  const { getAllPartner } = usePartnerAction();
  const partners = useAppSelector((state) => state.partner.partners);
  const auth = useAppSelector((state) => state.auth.userInfo);
  const [selectedPartners, setSelectedPartners] = useState<any[]>([]);

  console.log(partners);

  useEffect(() => {
    getAllPartner();
  }, []);

  useEffect(() => {
    setSelectedPartners(
      partners.map((partner) => ({
        value: partner,
        label: partner.firstName + " " + partner.lastName,
      }))
    );
  }, [partners]);

  const handlePartnerChange = (selectedOptions: any) => {
    setSelectedPartners(selectedOptions);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow">
        <Sidebar />
        <div className="flex-grow bg-red-300">
          <div className="flex flex-wrap py-12 mt-6 justify-between gap-24 bg-blue-500">
            <div className="flex bg-indigo-600">
              <div className="text-3xl font-bold">
                <Select
                  defaultValue={selectedPartners}
                  isMulti
                  name="Partner"
                  className="basic-multi-select"
                  classNamePrefix="select"
                  onChange={handlePartnerChange}
                  options={partners.map((partner) => ({
                    value: partner,
                    label: partner.firstName + " " + partner.lastName,
                  }))}
                />
              </div>
            </div>
            <div className="bg-green-600 flex">
              <h1 className="text-3xl font-bold">
                indadasgindadasgredssoindadasoredsso
              </h1>
            </div>
          </div>
          <div className="bg-yellow-500 flex flex-wrap py-12 mt-6 gap-24">
            <div className="flex bg-indigo-600">
              <h1 className="text-3xl font-bold">cumpleassasdos</h1>
            </div>
            <div className="bg-green-600 flex">
              <h1 className="text-3xl font-bold">indadasgredsso</h1>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
