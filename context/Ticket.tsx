import { createContext, useContext, useState, ReactNode } from "react";
import { Ticket } from "@/type";

type Props = {
  children: ReactNode;
};
const TicketContext = createContext<number[] | []>([]);

export const useTicketContext = () => {
  return useContext(TicketContext);
};

export const TicketContextProvider = ({ children }: Props) => {
  const [selectedtickets, setSelectedTickets] = useState<number[]>([]);

  return (
    <TicketContext.Provider value={[selectedtickets, setSelectedTickets]}>
      {children}
    </TicketContext.Provider>
  );
};
