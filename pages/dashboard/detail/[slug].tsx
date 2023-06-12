import Dashboard from "@/pages/dashboard";
import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import * as api from "../../api";
import { Order } from "@/type";
import { compareAsc, format } from "date-fns";
import { useReactToPrint } from "react-to-print";
interface DetailProps {
  order: Order[];
}
const DetailPage = () => {
  const [order, setOrder] = useState<Order>();
  const [date, setDate] = useState("");
  const router = useRouter();

  const { slug } = router.query;
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "emp-data",
    onAfterPrint: () => alert("Print Success"),
  });
  useEffect(() => {
    async function fetchData() {
      await api.GetOrderDetail(slug).then((resp) => {
        console.log(resp.data);
        setOrder(resp.data);
        setDate(order?.order_date);
      });
    }

    fetchData();
  }, []);

  const formattedDate = format(new Date(), "yyyy-MM-dd HH:mm b");

  return (
    <Dashboard>
      <div className="px-10 py-4 flex justify-between">
        <button
          className="relative inline-block px-4 py-2 font-medium group"
          onClick={() => router.back()}
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span className="relative text-black group-hover:text-white">Back</span>
        </button>
        <a
          href="#_"
          className="relative inline-block px-4 py-2 font-medium group"
          onClick={handlePrint}
        >
          <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-black group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
          <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black"></span>
          <span className="relative text-black group-hover:text-white">Print</span>
        </a>
      </div>
      <div ref={componentRef} className=" container p-10">
        <p className="text-4xl font-black text-gray-900 mb-5">Order Detail</p>
        <p className="tracking-wider text-gray-900 md:text-lg p-4 bg-gray-400">
          Order number {order?.id}
        </p>
        <ul className="p-4">
          <li>Order Date : {formattedDate} </li>
          <li>
            Order Numbers :{" "}
            {order?.numbers.map((number, key) => (
              <span key={key}>{number},</span>
            ))}
          </li>
          <li>Order Amount : $ {order?.paid_amount}</li>
          <li>
            Order Image :{" "}
            <a href={order?.order_image} className=" text-blue-500" target="_black">
              Photos
            </a>
          </li>
        </ul>
        <p className="tracking-wider text-gray-900 md:text-lg p-4 bg-gray-400">Buyer Information</p>
        <ul className="p-4">
          <li>Customer Name : {order?.user.username}</li>
          <li>
            Customer Email : <a href={`mailto:${order?.user.email}`}>{order?.user.email}</a>
          </li>
        </ul>
        <p className="tracking-wider text-gray-900 md:text-lg p-4 bg-gray-400">
          Payment Information
        </p>
        <ul className="p-4">
          <li>Payment Type : {order?.payment.p_Type === "WavePay to WavePay" ? "Wave" : "Kpay"}</li>
          <li>Payment Amount : {order?.payment.p_Amount}</li>
          <li>Phone : {order?.payment.p_Phone}</li>
          <li>Payment TransactionID : {order?.payment.p_TransactionID}</li>
        </ul>
      </div>
    </Dashboard>
  );
};
export default DetailPage;
