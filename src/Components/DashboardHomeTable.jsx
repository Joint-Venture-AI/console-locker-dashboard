// import  { useState } from "react";
// import { Table, Modal, Button } from "antd";
// import exlamIcon from "../assets/images/exclamation-circle.png";
// import { useAllTransactionGetQuery } from "../redux/features/transactionSlice";

// const DashboardHomeTable = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const { data:Transaction, isLoading, isError } = useAllTransactionGetQuery();
//   console.log(Transaction?.data?.transactions ,'dashboardHomeTable');


//   const showModal = (data) => {
//     setSelectedUser(data);
//     setIsModalOpen(true);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedUser(null);
//   };

//   const columns = [
//     {
//       title: "#SI",
//       dataIndex: "transIs",
//       key: "transIs",
//     },
//     {
//       title: "Name",
//       dataIndex: "name",
//       key: "name",
//     },
//     {
//       title: "Email",
//       dataIndex: "Email",
//       key: "Email",
//     },
//     {
//       title: "Address",
//       dataIndex: "Address",
//       key: "Address",
//     },
//     {
//       title: "Action",
//       key: "Action",
//       align: "center",
//       render: (_, data) => (
//         <Button
//           type="link"
//           onClick={() => showModal(data)}
//           // className="flex items-center"
//         >
//           <img
//             src={exlamIcon}
//             alt="Review"
//             className="w-5 h-5 cursor-pointer"
//           />
//         </Button>
//       ),
//     },
//   ];

//   const data = Array.from({ length: 17 }, (_, index) => ({
//     transIs: `${index + 1}`,
//     name: "Henry",
//     Email: "sharif@gmail.com",
//     Address: "Bangladesh",
//     transactionAmount: "$50",
//     date: "16 Apr 2024",
//     userId: `U-${index + 1}`,
//   }));

//   return (
//     <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
//       <h3 className="text-2xl text-black mb-4 pl-2">Transactions History</h3>
//       {/* Ant Design Table */}
//       <Table
//         columns={columns}
//         dataSource={data}
//         pagination={{ position: ["bottomCenter"] }}
//         className="rounded-lg "
//         rowKey="userId"
//       />

//       {/* Modal */}
//       <Modal
//         title={
//           <div className="flex justify-between items-center">
//             <span className="text-lg font-semibold text-center">User Details</span>
//             {/* <CloseOutlined
//               className="text-lg cursor-pointer"
//               onClick={handleCancel}
//             /> */}
//           </div>
//         }
//         open={isModalOpen}
//         onCancel={handleCancel}
//         footer={null}
//         className="custom-modal"
//       >
//         {selectedUser && (
//           <div className="flex flex-col gap-4">
//             {/* User Details */}
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">User ID:</span>
//               <span className="text-gray-800">{selectedUser.userId}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">Date:</span>
//               <span className="text-gray-800">{selectedUser.date}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">User Name:</span>
//               <span className="text-gray-800">{selectedUser.name}</span>
//             </div>
//             <div className="flex justify-between items-center">
//               <span className="text-gray-600 font-medium">
//                 Transaction Amount:
//               </span>
//               <span className="text-gray-800">
//                 {selectedUser.transactionAmount}
//               </span>
//             </div>

//             {/* Download Button */}
//             <Button
//               // type="primary"
//               className="bg-[#101010] py-6 text-white w-full hover:bg-gray-800"
//             >
//               Download
//             </Button>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// };

// export default DashboardHomeTable;



import { useState } from "react";
import { Table, Modal, Button } from "antd";
import exlamIcon from "../assets/images/exclamation-circle.png";
import { useAllTransactionGetQuery } from "../redux/features/transactionSlice";

const DashboardHomeTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  const { data, isLoading, isError } = useAllTransactionGetQuery();
  
  // Extract transactions safely from API response
  const transactions = data?.data?.transactions || [];

  const showModal = (transaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
  };

  const columns = [
    {
      title: "#SI",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
 
    {
      title: "Name",
      dataIndex: ["customer", "name"],
      key: "name",
    },
    {
      title: "Email",
      dataIndex: ["customer", "email"],
      key: "email",
    },
    {
      title: "Address",
      dataIndex: ["customer", "address", "address"],
      key: "address",
    },

    {
      title: "Action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <Button type="link" onClick={() => showModal(record)}>
          <img src={exlamIcon} alt="Review" className="w-5 h-5 cursor-pointer" />
        </Button>
      ),
    },
  ];

  return (
    <div className="rounded-lg border py-4 border-black mt-8 recent-users-table">
      <h3 className="text-2xl text-black mb-4 pl-2">Transactions History</h3>

      {isLoading ? (
        <p>Loading transactions...</p>
      ) : isError ? (
        <p>Error loading transactions.</p>
      ) : (
        <Table
          columns={columns}
          dataSource={transactions}
          pagination={{ position: ["bottomCenter"] }}
          className="rounded-lg"
          rowKey="_id"
        />
      )}

      {/* Modal */}
      <Modal
        title={
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold text-center">Transaction Details</span>
          </div>
        }
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        className="custom-modal"
      >
        {selectedTransaction && (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Transaction ID:</span>
              <span className="text-gray-800">{selectedTransaction.transaction_id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Date:</span>
              <span className="text-gray-800">{new Date(selectedTransaction.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">User Name:</span>
              <span className="text-gray-800">{selectedTransaction.customer?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Email:</span>
              <span className="text-gray-800">{selectedTransaction.customer?.email}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600 font-medium">Transaction Amount:</span>
              <span className="text-gray-800">${selectedTransaction.amount.toFixed(2)}</span>
            </div>

            {/* Download Button */}
            <Button className="bg-[#101010] py-6 text-white w-full hover:bg-gray-800">
              Download
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default DashboardHomeTable;
