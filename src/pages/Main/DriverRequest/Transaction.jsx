// import DashboardHomeTable from "../../../Components/DashboardHomeTable";
// import BarChartComponent from "./BarChart";

import DashboardHomeTable from "../../../Components/DashboardHomeTable";
import { useAllTransactionGetQuery } from "../../../redux/features/transactionSlice";

const Transaction = () => {

  const {data} = useAllTransactionGetQuery()
  // console.log(data?.data?.meta)
  const total= data?.data?.meta || 0

  return (
    <div className="space-y-[24px]">
      <h1 className="text-2xl md:text-2xl">Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-32  gap-y-10 ">
        <div className=" flex items-center justify-center gap-6 border border-black px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[20px]">{"Total Sell"}</h3>
            <h3 className="text-[30px] font-extralight">{total?.totalSell}</h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 px-[24px] border border-black  py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[20px]">{"Total Buy"}</h3>
            <h3 className="text-[30px] font-extralight">{total?.totalBuy}</h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 border border-black px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          <div className="text-center">
            <h3 className="text-[20px]">{"Total Earnings"}</h3>
            <h3 className="text-[30px] font-extralight">{total?.totalEarnings}</h3>
          </div>
        </div>
      </div>
      {/* {/* <BarChartComponent /> */}
      <DashboardHomeTable /> 
    </div>
  );
};

export default Transaction;
