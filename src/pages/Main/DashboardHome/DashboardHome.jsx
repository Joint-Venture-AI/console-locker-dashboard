import DashboardHomeTable from "../../../Components/DashboardHomeTable";


const DashboardHome = () => {
 
  return (
    <div className="space-y-[24px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 lg:gap-x-32  gap-y-10 ">
        <div className=" flex items-center justify-center gap-6 border border-black px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          
          <div className="text-center">
            <h3 className="text-[20px]">{"Total Earnings"}</h3>
            <h3 className="text-[30px] font-extralight">
              {`$8920 `}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 px-[24px] border border-black  py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
        
          <div  className="text-center">
            <h3 className="text-[20px]">{"Total User"}</h3>
            <h3 className="text-[30px] font-extralight">1250</h3>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 border border-black px-[24px] py-[20px] rounded-lg space-y-3 bg-white w-96 md:w-full">
          
          <div  className="text-center">
            <h3 className="text-[20px]">{"Total Driver"}</h3>
            <h3 className="text-[30px] font-extralight">740</h3>
          </div>
        </div>

        
      </div>
      <DashboardHomeTable />
    </div>
  );
};

export default DashboardHome;
