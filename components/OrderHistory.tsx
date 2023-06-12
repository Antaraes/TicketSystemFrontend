import React from "react";
import { Order } from "../type";
import Image from "next/image";
import Link from "next/link";
import { compareAsc, format } from "date-fns";
interface OrderHistoryProps {
  data: Order[] | undefined;
}
const OrderHistory: React.FC<OrderHistoryProps> = ({ data }) => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6"> Ticket Order History</h1>
      <div className="bg-white rounded shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>

              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tickets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                photo
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data?.map((item, key) => (
              <>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{key + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(), `yyyy-MM-dd HH:mm b`)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex">
                      {item.numbers.map((number) => (
                        <p key={key}>{number},</p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${item.paid_amount}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <a href={`http://127.0.0.1:8000/${item.order_image}`} target="_blank">
                        <Image
                          src={`http://127.0.0.1:8000/${item.order_image}`}
                          width={40}
                          height={40}
                          alt="Order Image"
                          className="w-24 h-auto"
                        />
                      </a>
                    </div>
                  </td>
                </tr>
              </>
            ))}

            {/* Add more order rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistory;
