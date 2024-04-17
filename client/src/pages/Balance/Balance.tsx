import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/hooks";
import { usePaymentAction } from "../../redux/Actions/paymentActions";
import { PiCalendarLight } from "react-icons/pi";
import BarChartPayDay from "../../components/Chart/BarChartPayDay";
import BarChartPayMonth from "../../components/Chart/BarChartPayMonth";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { Footer, Navbar, Sidebar } from "../../components";

export const Balance: React.FC = (): JSX.Element => {
  const { getAllPayment, getAllPaymentForMonth, getAllPaymentForDay } =
    usePaymentAction();

  const payment = useAppSelector((state) => state.payment.payments);
  console.log(payment);
  const historyPaymentsDay = useAppSelector(
    (state) => state.payment.historyPaymentDay
  );
  const historyPaymentsMonth = useAppSelector(
    (state) => state.payment.historyPaymentMonth
  );

  let actualYear = new Date().getFullYear();
  const [totalPayments, setTotalPayments] = useState(0);
  const [chartYear, setChartYear] = useState(actualYear);
  const [maxYear, setMaxYear] = useState(actualYear);
  const [minYear, setMinYear] = useState(actualYear);

  const [dateRange, setDateRange] = useState({
    start: new Date(),
    end: new Date(),
  });

  useEffect(() => {
    getAllPayment();
    getAllPaymentForMonth();
    getAllPaymentForDay();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [payment, dateRange]);

  useEffect(() => {
    if (historyPaymentsMonth) {
      historyPaymentsMonth.forEach((e) => {
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
    if (historyPaymentsDay) {
      historyPaymentsDay.forEach((e) => {
        if (e.year > maxYear) {
          setMaxYear(e.year);
        }
        if (e.year < minYear) {
          setMinYear(e.year);
        }
      });
    }
  }, []);

  const calculateTotal = () => {
    const startOfMonth = new Date(
      dateRange.start.getFullYear(),
      dateRange.start.getMonth(),
      1
    );
    const endOfMonth = new Date(
      dateRange.end.getFullYear(),
      dateRange.end.getMonth() + 1,
      0
    );
    let count = 0;
    const total = payment.reduce((sum, pay) => {
      const paymentDate = new Date(pay.dateFrom);
      if (paymentDate >= startOfMonth && paymentDate <= endOfMonth) {
        count++;
        return sum + (pay.total || 0);
      }
      return sum;
    }, 0);

    setTotalPayments(total);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-grow ">
        <Sidebar />
        <div className="flex-grow md:flex-col bg-slate-200">
          <div className="bg-white rounded-lg mr-72 border-t-4 border-red-400 my-5 m-2 p-5">
            <div className="rounded-lg bg-red-500 p-5">
              <div className="flex justify-between">
                <div className="text-4xl text-white font-bold">
                  Total de pagos: ${totalPayments}
                </div>
                {/* {showTotal && (
                  <div className="text-3xl text-white font-bold">
                    Hubo un total de {totalCount} ingresos
                  </div>
                )} */}
              </div>

              <div className="flex flex-wrap mb-2">
                <span className="mt-5 inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md">
                  <PiCalendarLight className="w-7 h-7 text-black" />
                </span>
                <input
                  className="mt-5 border-y-4 border-l-4 bg-gray-50 border border-gray-300 text-gray-900 block  min-w-0 text-sm p-2.5 "
                  type="date"
                  onChange={(e) =>
                    setDateRange({
                      ...dateRange,
                      start: new Date(e.target.value),
                    })
                  }
                />
                <span className="mt-5 inline-flex items-center px-2 text-sm text-gray-900 bg-gray-200  border-gray-300">
                  <PiCalendarLight className="w-7 h-7 text-black" />
                </span>

                <input
                  className="mt-5 rounded-e-lg bg-gray-50 border-y-4 border-r-4 border-gray-300 text-gray-900 block min-w-0 text-sm p-2.5 "
                  type="date"
                  onChange={(e) =>
                    setDateRange({
                      ...dateRange,
                      end: new Date(e.target.value),
                    })
                  }
                />

                <button onClick={calculateTotal}></button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3 mx-2">
            <div className="bg-white w-full rounded-lg border-t-4 border-red-400 p-4">
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
                <div className="bg-light w-full h-72">
                  <BarChartPayMonth
                    historyPayment={historyPaymentsMonth}
                    year={chartYear}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white w-full rounded-lg border-t-4 border-red-400 p-4">
              <div className="bg-primary-100 w-full rounded-xl text-black">
                <div className="flex flex-row items-center text-center justify-center gap-4">
                  <h1 className="text-black text-2xl font-sans">Mes Actual:</h1>
                </div>
                <div className="bg-light w-full h-72">
                  {historyPaymentsDay && historyPaymentsDay.length > 0 ? (
                    <BarChartPayDay historyPayments={historyPaymentsDay} />
                  ) : (
                    <p>No hay datos disponibles</p>
                  )}
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
