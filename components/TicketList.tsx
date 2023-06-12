import React, { useState, useEffect, SyntheticEvent } from "react";
import * as api from "../pages/api";
import { useRouter } from "next/router";
import OrderCheckout from "./OrderCheckout";
import { useTicketContext } from "@/context/Ticket";
import { STATUS_CODES } from "http";
interface TicketContextType {
  selectedTickets: number;
  setSelectedTickets: React.Dispatch<React.SetStateAction<Ticket[]>>;
}
type TicketStatus = "A" | "P" | "C";
type Ticket = {
  id: number;
  number: number;
  status: TicketStatus;
};

const TicketSelection: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedTickets = [], setSelectedTickets] = useTicketContext();
  const router = useRouter();
  const [filter, setFilter] = useState<TicketStatus | "All">("All");
  const [modal, setModal] = useState<Boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("access") ? true : false);
  }, []);
  useEffect(() => {
    if (selectedTickets && selectedTickets.length > 0) {
      setModal(true);
    } else {
      setModal(false);
    }
  }, [selectedTickets]);
  useEffect(() => {
    async function fetchData() {
      await api.GetTickets().then((resp) => {
        const body = resp.data;
        console.log(resp.data);

        setTickets(body);
      });
    }
    fetchData();
  }, []);
  const handleTicketSelection = (ticketNumber: number): void => {
    try {
      if (!isLoggedIn) {
        const result = window.confirm(
          "You are not logged in. Do you want to go to the login page?"
        );
        if (result) {
          router.push("/login"); // Redirect to the login page if the user chooses 'Yes'
        }
        return;
      }
      if (isTicketSelected(ticketNumber)) {
        // Ticket is already selected, so remove it from the selectedTickets array
        setSelectedTickets(selectedTickets.filter((number: number) => number !== ticketNumber));
      } else {
        // Add the ticket to the selectedTickets array
        setSelectedTickets([...selectedTickets, ticketNumber]);
      }
    } catch {
      alert("Error login");
    }
  };
  console.log(typeof selectedTickets);

  const isTicketSelected = (ticketNumber: number): boolean => {
    return selectedTickets.includes(ticketNumber);
  };

  const getTicketColor = (status: TicketStatus): string => {
    if (status === "A") {
      return "bg-green-500";
    } else if (status === "P") {
      return "bg-yellow-500";
    } else if (status === "C") {
      return "bg-red-500";
    }
    return "black"; // Default color if status is not recognized
  };
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    for (const ticket of selectedTickets) {
      const number = JSON.stringify(ticket);
      console.log(number);

      try {
        const response = await api.PostTickets({ number });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
  };

  // fetch("http://localhost:8000/api/tickets/", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     user_id: 1,
  //     number: JSON.stringify(ticket),
  //   }),
  //   mode: "cors",
  // }).catch((error) => {
  //   console.error("Error posting data:", error);
  // });

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    const selectedFilter = event.target.value as TicketStatus | "All";
    setFilter(selectedFilter);
  };

  const filteredTickets =
    filter === "All" ? tickets : tickets.filter((ticket) => ticket.status === filter);

  return (
    <div className=" bg-gray-50">
      <h2 className="text-4xl font-black text-gray-900 text-center mb-10 ">Choose a Ticket</h2>
      <div className="grid grid-cols-5 md:grid-cols-12 gap-2">
        {Array.from({ length: 100 }, (_, index) => index + 1).map((ticketNumber, key) => {
          const ticket = filteredTickets.find((t) => t.number === ticketNumber);

          const ticketStatus = ticket ? ticket.status : "A";
          return (
            <>
              <div
                className={`flex flex-col items-center border   rounded  justify-center border-red-700 ${
                  selectedTickets?.includes(ticketNumber)
                    ? "bg-blue-600"
                    : getTicketColor(ticketStatus)
                } h-10 w-10 relative`}
              >
                <div key={ticketNumber} className=" rounded-t-lg flex justify-center">
                  <input
                    id={`selectedTickets-${key}`}
                    type="checkbox"
                    checked={isTicketSelected(ticketNumber)}
                    onChange={() => handleTicketSelection(ticketNumber)}
                    disabled={ticketStatus === "C"}
                    className="absolute top-2 left-3 w-2 h-2 invisible"
                  />
                  <label htmlFor={`selectedTickets-${key}`} className="text-2xl">
                    {ticketNumber}
                  </label>
                </div>
              </div>
            </>
          );
        })}
      </div>
      {/* <button onClick={handleSubmit}>Ticket</button> */}
      {modal && <OrderCheckout tickets={selectedTickets} />}
    </div>
  );
};

export default TicketSelection;
