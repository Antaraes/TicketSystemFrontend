import { ReactNode } from "react";

export type TicketStatus = "A" | "P" | "C";
export type Ticket = {
  id: number;
  number: number;
  status: TicketStatus;
  user: string;
  created_at: Date;
};
export type User = {
  id: number;
  username: string;
  email: string;
};

export interface Customer {
  id: number;
  username: string;
  email: string;
}

export interface Order {
  id: number;
  user: {
    id: number;
    username: string;
    email: string;
  };
  order_image: string;
  numbers: number[];
  paid_amount: string;
  order_date: string;
  payment: {
    order: number;
    p_Name: string;
    p_Type: string;
    p_Amount: string;
    p_Phone: string;
    p_TransactionID: string;
    p_Date: string;
  };
}

export interface Tickets {
  id: number;
  number: number;
  status: string;
  user: string;
}
export type LayoutProps = {
  children: ReactNode;
};
