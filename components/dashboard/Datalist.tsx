import React, { useEffect, useState } from "react";
import * as api from "../../pages/api";
import { Order, Ticket } from "../../type";
import Image from "next/image";
import Link from "next/link";
interface OrderHistoryProps {
  data: Order[];
}
interface TicketProps {
  data: Ticket;
}
const Datalist: React.FC = () => {
  const [order, setOrder] = useState<OrderHistoryProps>();
  const [ticket, setTicket] = useState<TicketProps>();
  useEffect(() => {
    async function fetchData() {
      await api.GetTickets().then((resp) => {
        const body = resp.data;
        setTicket(body);
        console.log(body);

        console.log(ticket);
      });
      await api.GetOrders().then((resp) => {
        const sortedOrders = resp.data.sort(
          (a, b) => new Date(b.order_date).getTime() - new Date(a.order_date).getTime()
        );
        console.log(sortedOrders);

        setOrder(sortedOrders);
        console.log(order);
      });
    }
    fetchData();
  }, []);
  const handleDeleteOrder = async (orderId: number) => {
    try {
      await api.DeleteOrder(orderId);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="relative overflow-x-auto shadow-md ">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              number
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50 dark:bg-gray-800">
              paid Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Order Image
            </th>
            <th scope="col" className="px-6 py-3">
              Details
            </th>
            <th scope="col" className="px-6 py-3 ">
              Editing
            </th>
          </tr>
        </thead>
        <tbody>
          {order?.map((item, index) => (
            <>
              <tr className="border-b border-gray-200 dark:border-gray-700" key={index}>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800"
                >
                  <Link
                    href={`/dashboard/datalist/${item.user.id}`}
                    as={`/dashboard/datalist/${item.user.id}`}
                  >
                    {item.user.username}
                  </Link>
                </th>
                <td className="px-6 py-4 text-gray-900 text-lg">
                  {item.numbers.map((number, key) => (
                    <p key={key}>{number},</p>
                  ))}
                </td>
                <td className="px-6 py-4 bg-gray-50 dark:bg-gray-800">{item.paid_amount}</td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <a href={`${item.order_image}`} target="_blank">
                      View Photo
                    </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Link href={`/dashboard/detail/${item.id}`} as={`/dashboard/detail/${item.id}`}>
                    Detail
                  </Link>
                </td>
                <td className="px-6 py-4 bg-gray-800">
                  <a
                    href="#_"
                    className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-red-900  hover:bg-gray-800 focus:shadow-outline focus:outline-none"
                    onClick={async () => await handleDeleteOrder(item.id)}
                  >
                    Delete
                  </a>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Datalist;
