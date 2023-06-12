import Dashboard from "@/pages/dashboard";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as api from "../../api";
import { Ticket, User } from "@/type";
import axios from "axios";
interface TicketProps {
  data: Ticket;
}
const DataListPage = () => {
  const [ticket, setTicket] = useState<TicketProps>();
  const [customer, setCustomer] = useState<User>();
  const [id, setId] = useState();
  const router = useRouter();
  const { slug } = router.query;
  useEffect(() => {
    async function fetchData() {
      await api.GetUserList(slug).then((resp) => {
        console.log(resp.data);
        setCustomer(resp.data.customer);

        const body = resp.data.tickets;
        console.log(body);
        const ticketOrder = resp.data.tickets.sort(
          (a: any, b: any) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
        console.log(typeof resp.data.tickets[0].created_at);

        setTicket(ticketOrder);
        console.log(ticket);
      });
    }
    fetchData();
  }, []);
  // Fetch data based on the slug parameter
  // You can use the slug parameter to make an API request
  const handleUpdateStatus = async (ticketId: number, currentStatus: string) => {
    try {
      const updatedStatus = currentStatus === "P" ? "C" : "P";
      await api.UpdateTicket(ticketId, updatedStatus);
      // Handle the response or perform any necessary actions after the update
    } catch (error) {
      // Handle any errors
      console.log(error);
    }
  };
  return (
    <Dashboard>
      <div>
        <h1>Data List for {customer?.username}</h1>
        {/* Display the fetched data */}
        <h1>Tickets</h1>
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 ">
                  Editing
                </th>
              </tr>
            </thead>
            <tbody>
              {ticket?.map((item, index) => (
                <>
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.number}
                    </th>
                    <td className="px-6 py-4">{item.status == "P" ? "Pending" : "Chosen"}</td>
                    <td className="px-6 py-4">{item.created_at}</td>
                    <td className="px-6 py-4 bg-gray-800">
                      {item.status === "P" && (
                        <a
                          href="#_"
                          className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-green-900  hover:bg-gray-800 focus:shadow-outline focus:outline-none"
                          onClick={async () => await handleUpdateStatus(item.id, item.status)}
                        >
                          Admit
                        </a>
                      )}

                      <a
                        href="#_"
                        className="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 bg-red-900  hover:bg-gray-800 focus:shadow-outline focus:outline-none"
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
      </div>
    </Dashboard>
  );
};

export default DataListPage;
