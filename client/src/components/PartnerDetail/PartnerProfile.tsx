import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormatDate from "../../utils/FormatDate";
import { useAppSelector } from "../../redux/hooks";
import { Footer, Navbar, Sidebar } from "..";
import { usePartnerAction } from "../../redux/Actions/partnerAction";
import img from "../../assets/img.jpeg";
import BarsChart from "../Chart/BarChart";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

export const PartnerProfile: React.FC = (): JSX.Element => {
  const { _id } = useParams<{ _id: string }>();
  const {
    getSpecificPartnerById,
    clearSpecificPartnerById,
    getHistoryIncomePartner,
  } = usePartnerAction();
  const historyIncome = useAppSelector((state) => state.partner.historyIncome);
  const specificPartner = useAppSelector(
    (state) => state.partner.specificPartner
  );
  let actualYear = new Date().getFullYear();

  const [chartYear, setChartYear] = useState(actualYear);
  const [maxYear, setMaxYear] = useState(actualYear);
  const [minYear, setMinYear] = useState(actualYear);

  useEffect(() => {
    if (historyIncome) {
      historyIncome.forEach((e) => {
        if (e.year > maxYear) {
          setMaxYear(e.year);
        }
        if (e.year < minYear) {
          setMinYear(e.year);
        }
      });
    }
  }, []);

  useEffect(() => {
    if (_id) {
      getSpecificPartnerById(_id);
      getHistoryIncomePartner(_id);
    }
    return () => {
      clearSpecificPartnerById();
    };
  }, [_id]);

  const formattedDate = FormatDate(specificPartner?.date);
  const formattedDatePhysical = FormatDate(
    specificPartner?.datePhysicalAttitude
  );

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow bg-slate-200 ">
        <Sidebar />
        <div className="flex flex-col gap-2 m-2 md:flex-row flex-grow">
          <div className="w-1/3">
            {specificPartner && (
              <div className="bg-white shadow rounded-lg">
                <div className="flex items-center space-x-4">
                  <img
                    src={
                      specificPartner.picture ? specificPartner.picture : img
                    }
                    alt="Foto de perfil"
                    className={`w-48 h-48 rounded-full ${
                      specificPartner.stateId === "active"
                        ? "ring-4 ring-green-500"
                        : "ring-4 ring-red-500"
                    }`}
                  />
                  <div className="mt-10">
                    <h2 className="flex text-xl font-bold text-blue-600">
                      {specificPartner.firstName} {specificPartner.lastName}
                    </h2>
                    <p className="text-sm text-gray-500">
                      DNI: {specificPartner.dni}
                      <p> {formattedDate}</p>
                    </p>
                  </div>
                </div>

                <div className="mt-4 space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-700">Contacto</h3>
                    <p>Teléfono: {specificPartner.phone}</p>
                    <p>Email: {specificPartner.email}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Dirección</h3>
                    <p>{specificPartner.address}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">
                      Información médica
                    </h3>
                    <p>Fecha de actitud física: {formattedDatePhysical}</p>
                    <p>Cobertura médica: {specificPartner.medicalCoverage}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-700">Emergencia</h3>
                    <p>
                      Teléfono de emergencia: {specificPartner.phoneEmergency}
                    </p>
                    <p>
                      Nombre del contacto: {specificPartner.phoneEmergencyName}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full md:w-3/4 rounded-lg">
            <div className="bg-white w-full border-2 border-red-600  p-4">
              <div className="bg-primary-100 w-full rounded-xl text-black">
                <div className="flex flex-row items-center text-center justify-center gap-4">
                  <IoIosArrowBack
                    size={20}
                    className="opacity-50 hover:opacity-100 text-black cursor-pointer"
                    onClick={() => {
                      setChartYear(chartYear - 1);
                    }}
                  />
                  <h1 className="text-black text-2xl">{chartYear}</h1>
                  <IoIosArrowForward
                    size={20}
                    className="opacity-50 hover:opacity-100 text-black cursor-pointer"
                    onClick={() => {
                      setChartYear(chartYear + 1);
                    }}
                  />
                </div>
                <div className="bg-light border border-primary w-full h-72">
                  <BarsChart historyIncome={historyIncome} year={chartYear} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
