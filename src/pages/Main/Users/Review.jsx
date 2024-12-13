import { Link } from "react-router-dom";
import Swal from "sweetalert2";


export default function Review() {
    const reviews = [
        {
            name: "Akik Studio",
            date: 'oct 24,2023',
            review: "Akik Studio is a great place to work. Their design is modern and clean. Their support is always there. I would recommend this company to anyone looking for a great job.",
            rating: ' 5.0',
            report: 4
        },
        {
            name: "Akik Studio",
            date: 'oct 24,2023',
            review: "Akik Studio is a great place to work. Their design is modern and clean. Their support is always there. I would recommend this company to anyone looking for a great job.",
            rating: '5.0',
            report: '04'
        },
        {
            name: "Akik Studio",
            date: 'oct 24,2023',
            review: "Akik Studio is a great place to work. Their design is modern and clean. Their support is always there. I would recommend this company to anyone looking for a great job.",
            rating: ' 5.0',
            report: '04'
        },

    ]

    const handleBlacks = () => {
        Swal.fire({
            title: "Delete Status",
            text: " Are you sure you want to delete this Status?",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Delete"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
        });
    }

    const handleBlockUser = () => {
        Swal.fire({
            title: "Block User ",
            text: "Are you sure you want to Block this User?",
            // icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Block"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Blocked!",
                    text: "Your file has been blocked.",
                    icon: "success"
                });
            }
        });
    }

    return (
        <div>
            <div className="px-6 pb-5 flex  gap-6 items-center">
                <Link to={'/users'}>
                    <svg width="22" height="44" viewBox="0 0 22 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipPath="evenodd" d="M3.37879 20.6965L13.75 10.3254L16.3423 12.9177L7.26728 21.9927L16.3423 31.0677L13.75 33.66L3.37879 23.2889C3.03509 22.9451 2.84201 22.4788 2.84201 21.9927C2.84201 21.5066 3.03509 21.0403 3.37879 20.6965Z" fill="#052255" />
                    </svg>
                </Link>


                <h3 className="text-[32px] font text-blue-600 font-semibold">
                    Review
                </h3>
            </div>

            <div className="flex gap-8">
                <div className="w-2/3 space-y-6">
                    {
                        reviews.map((review, index) => (
                            <div key={index} className="bg-[#e8e7fe] p-6 rounded-lg">
                                <div className=" flex justify-between items-center ">
                                    <h1 className="text-2xl font-semibold">{review.name}</h1>
                                    <div onClick={() => handleBlacks()} className="bg-white p-4 rounded-lg cursor-pointer">
                                        <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M13 5V16C13 17.1046 12.1046 18 11 18H3C1.89543 18 1 17.1046 1 16V5H13ZM11 7H3V16H11V7ZM7 0C7.55228 0 8 0.447715 8 1V2H13C13.5523 2 14 2.44772 14 3C14 3.55228 13.5523 4 13 4H1C0.447715 4 0 3.55228 0 3C0 2.44772 0.447715 2 1 2H6V1C6 0.447715 6.44772 0 7 0Z" fill="#FF5252" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between space-x-2 pt-2">
                                    <hr className="border-t border-2 w-3/5 border-black" />
                                    <h1 className="text-xs font-semibold whitespace-nowrap">{review.date}</h1>
                                </div>

                                <div className="flex items-start gap-6 pt-4">
                                    <div>
                                        <h1 className="text-xl font-semibold">Quality</h1>
                                        <p className="bg-green-500 p-4 size-14 rounded-lg text-white font-semibold">{review.rating}</p>
                                    </div>
                                    <div>
                                        <p>{review.review}</p>
                                    </div>
                                </div>
                                <div className="flex items-center justify-end gap-4">
                                    <h1 className="text-xl">{review.report}</h1>
                                    <svg width="24" height="27" viewBox="0 0 24 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M22.905 2.52C22.5626 2.27327 22.1668 2.11073 21.7499 2.04557C21.3329 1.98042 20.9064 2.01448 20.505 2.145C19.4463 2.44273 18.3497 2.58422 17.25 2.565C15.6249 2.47679 14.0315 2.07971 12.555 1.395C10.7311 0.551448 8.75813 0.0773339 6.75003 0C2.41503 0 0.750026 1.5 0.450026 1.71C0.306488 1.85069 0.192688 2.01879 0.115385 2.20432C0.0380817 2.38984 -0.00114827 2.58902 2.55854e-05 2.79V25.5C2.55854e-05 25.8978 0.158061 26.2794 0.439366 26.5607C0.72067 26.842 1.1022 27 1.50003 27C1.89785 27 2.27938 26.842 2.56069 26.5607C2.84199 26.2794 3.00003 25.8978 3.00003 25.5V19.05C4.19527 18.5924 5.47123 18.3831 6.75003 18.435C8.37514 18.5232 9.96856 18.9203 11.445 19.605C13.269 20.4486 15.2419 20.9227 17.25 21C19.0583 21.0683 20.8571 20.7085 22.5 19.95C22.9428 19.742 23.3182 19.4137 23.5835 19.0026C23.8487 18.5915 23.993 18.1142 24 17.625V4.665C23.9995 4.24646 23.9 3.83398 23.7097 3.4612C23.5194 3.08843 23.2437 2.76592 22.905 2.52ZM21 17.385C19.8043 17.841 18.5287 18.0502 17.25 18C15.6229 17.9138 14.0282 17.5113 12.555 16.815C10.7276 15.9836 8.7561 15.515 6.75003 15.435C5.48627 15.4132 4.22523 15.5595 3.00003 15.87V3.63C4.19247 3.161 5.46978 2.94642 6.75003 3C8.37715 3.08622 9.97188 3.48872 11.445 4.185C13.2725 5.01637 15.2439 5.48505 17.25 5.565C18.5145 5.58367 19.7758 5.43232 21 5.115V17.385Z" fill="black" />
                                    </svg>

                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="w-1/3 space-y-4">
                    <div className="mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-gray-900">Rakibul Hasan</h1>
                        <p className="text-sm text-gray-600">hasan1234@gmail.com</p>
                        <div className="mt-4">
                            <textarea
                                className="w-full bg-white border border-gray-300 rounded-lg p-2"
                                aria-label="User details input"
                                rows="5"
                                // placeholder="He give here many fake details"
                                defaultValue="He give here many fake details"
                            ></textarea>
                        </div>
                    </div>
                    <div className="mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-gray-900">Asif Hasan </h1>
                        <p className="text-sm text-gray-600">hasan1234@gmail.com</p>
                        <div className="mt-4">
                            <textarea
                                className="w-full bg-white border border-gray-300 rounded-lg p-2"
                                aria-label="User details input"
                                rows="5"
                                placeholder="He give here many fake details"
                                defaultValue="He give here many fake details"
                            ></textarea>
                        </div>
                    </div>
                    <div className="mx-auto bg-gray-100 p-4 rounded-lg shadow-md">
                        <h1 className="text-xl font-semibold text-gray-900">Arifull</h1>
                        <p className="text-sm text-gray-600">hasan1234@gmail.com</p>
                        <div className="mt-4">
                            <textarea
                                className="w-full bg-white border border-gray-300 rounded-lg p-2"
                                aria-label="User details input"
                                rows="5"
                                placeholder="He give here many fake details"
                                defaultValue="He give here many fake details"
                            ></textarea>
                        </div>
                    </div>
                </div>

            </div>
            <div className="bg-white p-8 shadow-xl flex justify-center items-center gap-8 bg-fixed border-2 mt-8 rounded-lg">
                <Link to={'/'}>
                    <button className="bg-playground hover:bg-gray-500 px-16 font-semibold text-lg py-3 rounded-full text-white uppercase transition duration-300">
                        Back
                    </button>
                </Link>
                <button onClick={() => handleBlockUser()} className="bg-red-500 hover:bg-red-600 px-10 font-semibold text-lg py-3 rounded-full text-white uppercase transition duration-300">
                    Block User
                </button>
            </div>

        </div>
    )
}
